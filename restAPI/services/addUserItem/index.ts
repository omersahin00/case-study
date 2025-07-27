import { UserItem } from "@/models"

const addUserItem = async (userId: string, itemId: string) => {
    try {
        await UserItem.create({
            userId,
            itemId,
            xp: 0,
            level: 1
        });

        return true;
    } catch (error) {
        return false;
    }
}

export default addUserItem;
