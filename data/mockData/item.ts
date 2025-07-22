import { Item } from "@/models";
import { sequelize } from "../db";
import logger from "@/services/logger";
import { AxiosError } from "axios";

const items = [
    {
        id: "b7e1c2a2-3f4b-4e2a-9c1d-8a7f6e5d4c3b",
        name: "Sword"
    }
];

const addItems = async () => {
    const transaction = await sequelize.transaction();

    try {
        await Promise.all(
            items.map(async (item) => {
                const result = await Item.findOne({
                    where: { id: item.id }
                });

                if (result) {
                    if (result.name !== item.name) {
                        result.name = item.name;
                        await result.save({ transaction });
                    }
                } else {
                    await Item.create({
                        id: item.id,
                        name: item.name
                    }, { transaction });
                }
            })
        );

        await transaction.commit();

    } catch (error) {
        logger.critical(`Error occurred while writing Items mock data: ${error instanceof AxiosError ? error.message : "Unknown error!"}`, 3);

        await transaction.rollback();
    }
}

export default addItems;
