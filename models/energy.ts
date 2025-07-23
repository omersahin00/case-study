import { sequelize } from "@/data/db";
import { DataTypes, Model } from "sequelize";

export interface EnergyCreationAttributes {
    id?: string;
    userId: string;
    value: number;
}

export interface EnergyAttributes {
    id: string;
    userId: string;
    value: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface EnergyInstance extends Model<EnergyAttributes, EnergyCreationAttributes>, EnergyAttributes {}

const Energy = sequelize.define<EnergyInstance>("energies", {
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
    value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: true });

export default Energy;
