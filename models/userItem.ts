import { sequelize } from "@/data/db";
import { DataTypes, Model, STRING } from "sequelize";

export interface UserItemAttributes {
    id?: string;
    userId: string;
    itemId: string;
    xp: number;
    level: number;
}

export interface UserItemInstance extends Model<UserItemAttributes>, UserItemAttributes {}

const UserItem = sequelize.define<UserItemInstance>("userItems", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["userId", "itemId"]
        }
    ]
});

export default UserItem;
