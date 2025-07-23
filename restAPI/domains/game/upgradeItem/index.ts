import { sequelize } from "@/data/db";
import { Energy, UserItem } from "@/models";
import { EndpointReturn } from "@/types/endpointReturn";
import { Request, Response } from "express";

export interface UpgradeItemRequest {
    itemId: string;
    xp: number;
}

const upgradeItem = async (
    req: Request<{}, any, UpgradeItemRequest>,
    res: Response
): Promise<EndpointReturn> => {

    const userData = req.user;
    const itemId = req.body.itemId;
    const xp = req.body.xp;

    const item = await UserItem.findOne({
        where: {
            userId: userData.id,
            itemId: itemId
        }
    });

    const userEnergy = await Energy.findOne({
        where: {
            userId: userData.id
        }
    });

    if (!item || !userEnergy) {
        return {
            statusCode: 500,
            error: "Item bulunamadı!"
        }
    }

    const addedUserXp = Date.now() - new Date(userEnergy.updatedAt).getTime() / (60 * 1000);

    const transaction = await sequelize.transaction();

    try {
        if (addedUserXp > 0 && userEnergy.value <= 100) {
            userEnergy.value += addedUserXp;
            if (userEnergy.value > 100) userEnergy.value = 100;

            userEnergy.value -= xp;

            await userEnergy.save({ transaction });
        }

        item.xp += xp;
        await item.save({ transaction });

        await transaction.commit();

        return {
            statusCode: 204
        }

    } catch (error) {
        await transaction.rollback();

        return {
            statusCode: 500,
            error: "Item yükseltilemedi!"
        }
    }
}

export default upgradeItem;
