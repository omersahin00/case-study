import express from "express";
const router = express.Router();
import registerRoutes from "./services/registerRoutes";
import { ControllerGroup } from "@/types/controllerAttributes";

import { getLoginPage, postLoginPage } from "./controller/auth/login";
import { getRegisterPage, postRegisterPage } from "./controller/auth/register";
import { getWelcomePage } from "./controller/home/welcome";
import { getItemPage } from "./controller/game/items";

export const endpoints: ControllerGroup = {
    home: { 
        GET: { handler: getWelcomePage, auth: false }
    },
    auth: {
        login: { 
            GET: { handler: getLoginPage, auth: false },
            POST: { handler: postLoginPage,  auth: false }
        },
        register: { 
            GET: { handler: getRegisterPage, auth: false },
            POST: { handler: postRegisterPage, auth: false }
        }
    },
    game: {
        items: {
            GET: { handler: getItemPage, auth: true }
        }
    }
}

registerRoutes(router, endpoints);

export default router;
