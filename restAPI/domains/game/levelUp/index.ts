import { Item, UserItem } from "@/models";
import { EndpointReturn } from "@/types/endpointReturn";
import { Request, Response } from "express";

export interface LevelUpRequest {
    itemId: string;
}

const levelUp = async (
    req: Request<{}, any, LevelUpRequest>,
    res: Response
): Promise<EndpointReturn> => {

    const itemId = req.body.itemId;

    const item = await UserItem.findOne({
        where: {
            itemId: itemId
        }
    });

    const itemData = await Item.findOne({
        where: {
            id: itemId
        }
    })

    if (!item || !itemData) {
        return {
            statusCode: 500,
            error: "Item bulunamadı!"
        }
    }

    item.level++;
    item.xp = 0;

    try {
        await item.save();
    } catch (error) {
        return {
            statusCode: 500,
            error: "Unknown server error."
        }
    }

    return {
        statusCode: 204
    }
}

export default levelUp;
