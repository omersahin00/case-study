import { sequelize } from "@/data/db";
import { DataTypes, Model } from "sequelize";

export interface ItemCreationAttributes {
    id?: string;
    name: string;
    levelPeriod: number;
}

export interface ItemAttributes {
    id: string;
    name: string;
    levelPeriod: number;
    maxLevel: number;
    xp?: number;
    level?: number;
    isMaxLevel?: boolean;
    maxXp?: number;
}

export interface ItemInstance extends Model<ItemAttributes, ItemCreationAttributes>, ItemAttributes {}

const Item = sequelize.define<ItemInstance>("items", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    levelPeriod: {
        type: DataTypes.INTEGER,
        defaultValue: 50,
        allowNull: false
    },
    maxLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        allowNull: false
    }
}, { timestamps: false });

export default Item;
