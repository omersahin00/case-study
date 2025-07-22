import { Request, Response } from "express";
import axios from "axios";

const getRegisterPage = async (
    req: Request,
    res: Response
) => {
    return res.render("auth/register", {
        error: null,
        success: null,
        formData: {}
    });
}

const postRegisterPage = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password, confirmPassword, terms } = req.body;

        // Kendi API'mize istek gönder - validasyon API tarafında yapılacak
        const apiUrl = `${req.protocol}://${req.get('host')}/api/auth/register`;
        
        const response = await axios.post(apiUrl, {
            email,
            password,
            confirmPassword
        }, {
            timeout: 10000, // 10 saniye timeout
            validateStatus: (status: number) => status < 500 // 500'den küçük statusları kabul et
        });

        // Başarılı kayıt
        if (response.status === 200 || response.status === 201) {
            if (response.data.success) {
                // Başarılı mesajla login sayfasına yönlendir
                return res.render("auth/login", {
                    success: "Kayıt başarılı! Şimdi giriş yapabilirsiniz.",
                    formData: { email }
                });
            }
        }

        // API'den gelen hata mesajı
        return res.render("auth/register", {
            error: response.data.message || "Kayıt başarısız oldu.",
            formData: { email }
        });

    } catch (error: any) {
        console.error('Register API Error:', error);

        let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin.";

        // Axios hata kontrolü
        if (error.response) {
            errorMessage = error.response.data?.message || `Sunucu hatası: ${error.response.status}`;
        } else if (error.request) {
            // Network hatası
            errorMessage = "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.";
        } else if (error.code === 'ECONNABORTED') {
            // Timeout hatası
            errorMessage = "İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.";
        }

        return res.render("auth/register", {
            error: errorMessage,
            formData: { email: req.body.email }
        });
    }
}

export { getRegisterPage, postRegisterPage };
export default { getRegisterPage, postRegisterPage };
