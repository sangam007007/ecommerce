const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Product = sequelize.define('Product', {
    campaignName: { type: DataTypes.STRING, field: 'Campaign Name' },
    adGroupId: { type: DataTypes.STRING, field: 'Ad Group ID' },
    fsnId: { type: DataTypes.STRING, field: 'FSN ID' },
    productName: { type: DataTypes.STRING, field: 'Product Name' },
    adSpend: { type: DataTypes.FLOAT, field: 'Ad Spend' },
    views: { type: DataTypes.INTEGER, field: 'Views' },
    clicks: { type: DataTypes.INTEGER, field: 'Clicks' },
    directUnits: { type: DataTypes.INTEGER, field: 'Direct Units' },
    indirectUnits: { type: DataTypes.INTEGER, field: 'Indirect Units' },
    directRevenue: { type: DataTypes.FLOAT, field: 'Direct Revenue' },
    indirectRevenue: { type: DataTypes.FLOAT, field: 'Indirect Revenue' },
});

module.exports = Product;
