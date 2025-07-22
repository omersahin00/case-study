import { sequelize } from "@/data/db";
import { DataTypes, Model } from "sequelize";

export interface ItemCreationAttributes {
    id?: string;
    name: string;
}

export interface ItemAttributes {
    id: string;
    name: string;
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
    }
}, { timestamps: false });

export default Item;
