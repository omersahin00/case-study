import { UpgradeItemRequest } from "@/restAPI/domains/game/upgradeItem";
import Joi from "joi";

const validate = (data: UpgradeItemRequest) => {
    const schema = Joi.object<UpgradeItemRequest>({
        itemId: Joi.string()
            .uuid({ version: "uuidv4" })
            .required()
            .messages({
                'string.guid': 'Geçerli bir UUIDv4 giriniz',
                'any.required': 'itemId alanı zorunludur'
            }),
        xp: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'Şifre sayısal olmalıdır',
                'number.integer': 'Şifre tam sayı olmalıdır',
                'any.required': 'Şifre alanı zorunludur'
            })
    });

    return schema.validate(data);
};

export default validate;