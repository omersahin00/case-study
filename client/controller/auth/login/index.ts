import { Request, Response } from "express";
import axios from "axios";

const getLoginPage = async (
    req: Request,
    res: Response
) => {
    return res.render("auth/login", {
        error: null,
        success: null,
        formData: {}
    });
}

const postLoginPage = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password, remember } = req.body;

        const apiUrl = `${req.protocol}://${req.get('host')}/api/auth/login`;

        const response = await axios.post(apiUrl, {
            email,
            password
        }, {
            timeout: 10000, // 10 saniye timeout
            validateStatus: (status: number) => status < 500 // 500'den küçük statusları kabul et
        });

        // Başarılı giriş
        if (response.status === 200) {
            // Token'ı cookie'ye kaydet
            if (response.data.token) {
                const cookieOptions = {
                    httpOnly: true,
                    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
                    maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 7 gün veya 1 gün
                };

                res.cookie("token", response.data.token, cookieOptions);
            }

            // Ana sayfaya yönlendir
            return res.redirect("/game/items");
        }

        // API'den gelen hata mesajı
        return res.render("auth/login", {
            error: response.data.message || "Giriş başarısız oldu.",
            formData: { email }
        });

    } catch (error: any) {
        console.error('Login API Error:', error);

        let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin.";

        // Axios hata kontrolü
        if (error.response) {
            // API'den dönen hata mesajını direkt kullan
            errorMessage = error.response.data?.message || `Sunucu hatası: ${error.response.status}`;
        } else if (error.request) {
            // Network hatası
            errorMessage = "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.";
        } else if (error.code === 'ECONNABORTED') {
            // Timeout hatası
            errorMessage = "İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.";
        }

        return res.render("auth/login", {
            error: errorMessage,
            formData: { email: req.body.email }
        });
    }
}

export { getLoginPage, postLoginPage };
export default { getLoginPage, postLoginPage };
