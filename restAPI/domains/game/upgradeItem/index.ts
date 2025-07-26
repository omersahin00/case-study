import { sequelize } from "@/data/db";
import { Energy, Item, UserItem } from "@/models";
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
    let xp = req.body.xp;

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

    const itemData = await Item.findOne({
        where: {
            id: item?.itemId
        }
    });

    if (!item || !userEnergy || !itemData) {
        return {
            statusCode: 500,
            error: "Item bulunamadı!"
        }
    }

    itemData.maxLevel--;

    const addedUserXp = Math.floor((Date.now() - new Date(userEnergy.updatedAt).getTime()) / (60 * 1000));

    const transaction = await sequelize.transaction();

    try {
        if (addedUserXp > 0 && userEnergy.value <= 100) {
            userEnergy.value += addedUserXp;
            if (userEnergy.value > 100) userEnergy.value = 100;
        }

        if (xp > userEnergy.value) {
            xp = userEnergy.value;
        }

        userEnergy.value -= xp;

        await userEnergy.save({ transaction });

        item.xp += xp;

        if (item.xp > itemData.maxLevel * itemData.levelPeriod) {
            item.xp = itemData.maxLevel * itemData.levelPeriod;
        }

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
