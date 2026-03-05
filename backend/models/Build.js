import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Build = sequelize.define('Build', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    buildName: {
        type: DataTypes.STRING,
        defaultValue: 'My Custom Build'
    },
    // Main Component IDs as direct fields (FKs will be associated later)
    cpuId: { type: DataTypes.UUID, allowNull: true },
    motherboardId: { type: DataTypes.UUID, allowNull: true },
    gpuId: { type: DataTypes.UUID, allowNull: true },
    ramId: { type: DataTypes.UUID, allowNull: true },
    storageId: { type: DataTypes.UUID, allowNull: true },
    psuId: { type: DataTypes.UUID, allowNull: true },
    cabinetId: { type: DataTypes.UUID, allowNull: true },
    coolerId: { type: DataTypes.UUID, allowNull: true },

    // Accessories as JSON array of IDs
    accessoryIds: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },

    // Complex objects as JSON
    compatibilityStatus: {
        type: DataTypes.JSON,
        defaultValue: { isCompatible: true, issues: [] }
    },
    worthEvaluation: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: true
});

export default Build;
