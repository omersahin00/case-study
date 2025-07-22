import { NextFunction, Request, Response } from "express";
import axios from "axios";

const isAuthForClient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const apiUrl = `${req.protocol}://${req.get('host')}/api/auth/check`;

        const response = await axios.get(apiUrl, {
            headers: {
                'Cookie': req.headers.cookie || ''
            },
            timeout: 5000,
            validateStatus: (status: number) => status < 500 // 500'den küçük statusları kabul et
        });

        // Oturum geçerliyse devam et
        if (response.status === 200 && response.data.status) {
            req.isAuthenticated = true;
            next();
        } else {
            // Oturum geçersizse home sayfasına yönlendir
            return res.redirect("/home");
        }

    } catch (error: any) {
        console.log("Auth check failed:", error.message);
        return res.redirect("/home");
    }
};

export default isAuthForClient;
