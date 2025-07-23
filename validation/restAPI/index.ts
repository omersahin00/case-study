// Validations:
import loginValidate from "@validation/restAPI/auth/login";
import registerValidate from "@validation/restAPI/auth/register";
import refreshTokenValidate from "@validation/restAPI/auth/refresh";
import upgradeItemValidate from "@validation/restAPI/game/upgradeItem";

export const validations = {
    api: {
        auth: {
            login: loginValidate,
            register: registerValidate,
            refresh: refreshTokenValidate,
        },
        game: {
            upgradeItem: upgradeItemValidate,
        }
    }
};
