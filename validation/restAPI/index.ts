// Validations:
import loginValidate from "@validation/restAPI/auth/login";
import registerValidate from "@validation/restAPI/auth/register";
import refreshTokenValidate from "@validation/restAPI/auth/refresh";

export const validations = {
    api: {
        auth: {
            login: loginValidate,
            register: registerValidate,
            refresh: refreshTokenValidate,
        },
    }
};
