import { LevelUpRequest } from "@/restAPI/domains/game/levelUp";
import Joi from "joi";

const validate = (data: LevelUpRequest) => {
    const schema = Joi.object<LevelUpRequest>({
        itemId: Joi.string()
            .uuid({ version: "uuidv4" })
            .required()
            .messages({
                'string.guid': 'Geçerli bir UUIDv4 giriniz',
                'any.required': 'itemId alanı zorunludur'
            })
    });

    return schema.validate(data);
};

export default validate;
