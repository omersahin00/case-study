import express from "express";
const router = express.Router();
import registerRoutes from "./services/registerRoutes";
import { EndpointGroup } from "@/types/endpointAttributes";

// Middlewares:
import { validator } from "@/validation";
router.use(validator);

// Endpoints:
// GET:
import serverCheck from "./domains/home/serverCheck";
import logout from "./domains/auth/logout";
import loginCheck from "./domains/auth/check";
// POST:
import login from "./domains/auth/login";
import register from "./domains/auth/register";
import refreshToken from "./domains/auth/refreshtoken";

export const endpoints: EndpointGroup = {
    api: {
        auth: {
            login: { handler: login, method: "POST", auth: false },
            register: { handler: register, method: "POST", auth: false },
            refresh: { handler: refreshToken, method: "POST", auth: false },
            logout: { handler: logout, method: "GET", auth: false },
            check: { handler: loginCheck, method: "GET", auth: true },
        },
        home: {
            check: { handler: serverCheck, method: "GET", auth: false },
        }
    }
};

registerRoutes(router, endpoints);

export default router;
