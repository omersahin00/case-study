import { sequelize } from "@/data/db";
import { DataTypes, Model } from "sequelize";

export interface UserItemAttributes {
    id?: string;
    name: string;
}

export interface UserItemInstance extends Model<UserItemAttributes>, UserItemAttributes {}

const UserItem = sequelize.define<UserItemInstance>("userItems", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });

export default UserItem;
