// Validations:
import loginValidate from "@validation/restAPI/auth/login";
import registerValidate from "@validation/restAPI/auth/refresh";
import refreshTokenValidate from "@validation/restAPI/auth/refresh";
import upgradeItemValidate from "@validation/restAPI/game/upgradeItem";
import levelUpValidate from "@validation/restAPI/game/levelUp";

export const validations = {
    api: {
        auth: {
            login: loginValidate,
            register: registerValidate,
            refresh: refreshTokenValidate,
        },
        game: {
            upgradeItem: upgradeItemValidate,
            levelUp: levelUpValidate,
        }
    }
};
