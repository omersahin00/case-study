import { UserItem } from "@/models";
import Item, { ItemAttributes } from "@/models/item";
import { EndpointReturn } from "@/types/endpointReturn";
import { Request, Response } from "express";

interface GetItemQuery {
    itemId: string;
}

interface GetItemResponse {
    message: string;
    item?: ItemAttributes
}

const getItem = async (
    req: Request<{}, any, {}, GetItemQuery>,
    res: Response<GetItemResponse>
): Promise<EndpointReturn<GetItemResponse>> => {

    const userData = req.user;
    const itemId = req.query.itemId;

    const item = await Item.findOne({
        where: {
            id: itemId
        },
        raw: true
    });

    const itemXp = await UserItem.findOne({
        where: {
            userId: userData.id,
            itemId: itemId
        },
        raw: true
    });

    if (!item || !itemXp) {
        return {
            statusCode: 500,
            data: {
                message: "Item bulunamadı!",
                item: undefined
            }
        }
    }

    item.level = Math.ceil(itemXp.xp / item.levelPeriod);
    item.xp = itemXp.xp % item.levelPeriod;

    if (itemXp.xp === item.levelPeriod * item.maxLevel) {
        item.isMaxLevel = true;
        item.xp = item.levelPeriod;
    } else {
        item.isMaxLevel = false;
    }

    return {
        statusCode: item ? 200 : 500,
        data: {
            message: item ? "Item gönderildi" : "Item bulunamadı!",
            item: item || undefined
        }
    }
}

export default getItem;
