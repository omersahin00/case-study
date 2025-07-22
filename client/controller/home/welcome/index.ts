import { Request, Response } from "express";
import axios from "axios";

const getWelcomePage = async (
    req: Request,
    res: Response
) => {
    // Kullanıcının oturum durumunu kontrol et
    let isLoggedIn = false;
    let user = null;
    let userEmail = "";

    try {
        const apiUrl = `${req.protocol}://${req.get('host')}/api/auth/check`;

        const response = await axios.get(apiUrl, {
            headers: {
                'Cookie': req.headers.cookie || ''
            },
            timeout: 5000,
            validateStatus: (status: number) => status < 500 // 500'den küçük statusları kabul et
        });

        if (response.status === 200 && response.data.status) {
            isLoggedIn = true;
            // Kullanıcı bilgilerini almak için token'dan email'i çıkarmaya çalışalım
            // Veya req.user varsa onu kullan
            if (req.user && req.user.email) {
                userEmail = req.user.email;
            }
        }
    } catch (error: any) {
        // Kullanıcı oturumu açık değil doğrudan login'e yönlendirilecek:
        return res.render("home/welcome");
    }
}

export { getWelcomePage };
export default { getWelcomePage };
