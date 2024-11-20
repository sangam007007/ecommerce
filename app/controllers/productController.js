const { Product } = require('../models');
const { Op } = require('sequelize');

// Helper function to apply filters dynamically based on the request body
const buildFilterQuery = (filters, search) => {
  let query = {};

  if (filters.campaignName) query.campaignName = filters.campaignName;
  if (filters.adGroupId) query.adGroupId = filters.adGroupId;
  if (filters.fsnId) query.fsnId = filters.fsnId;
  if (filters.productName) query.productName = filters.productName;

  // If a search term is provided, apply it across all text-based fields
  if (search) {
    query = {
      ...query,
      [Op.or]: [
        { campaignName: { [Op.like]: `%${search}%` } },
        { adGroupId: { [Op.like]: `%${search}%` } },
        { fsnId: { [Op.like]: `%${search}%` } },
        { productName: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  return query;
};

// General function to handle any product report (filtered by various params)
const getProductReport = async (req, res) => {
  try {
    const { filters, search, page = 1, limit = 10 } = req.body;

    // Build query dynamically with filters and search
    const query = buildFilterQuery(filters, search);
    console.log("QUERY:",query)
    // Pagination calculations
    const offset = (page - 1) * limit;
    const { count, rows: products } = await Product.findAndCountAll({
      where: query,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
    console.log("PRODUCT:",products)
    // Process data to calculate metrics
    const stats = products.map((product) => {
      const adSpend = product.adSpend;
      const views = product.views;
      const clicks = product.clicks;
      const directRevenue = product.directRevenue;
      const indirectRevenue = product.indirectRevenue;
      const directUnits = product.directUnits;
      const indirectUnits = product.indirectUnits;

      const ctr = views ? (clicks / views) * 100 : 0;
      const totalRevenue = directRevenue + indirectRevenue;
      const totalOrders = directUnits + indirectUnits;
      const roas = adSpend ? totalRevenue / adSpend : 0;

      return {
        campaignName: product.campaignName,
        adSpend,
        views,
        clicks,
        ctr,
        totalRevenue,
        totalOrders,
        roas,
      };
    });

    // Response with pagination info
    res.json({data:stats,"status":200});
  } catch (error) {
    console.log("PRODUCT ERROR:",error)
    res.status(500).json({ message: 'Error fetching product report', error });
  }
};

// Basic report fetching with pagination and search for debugging


const getReport = async (req, res) => {
    const { filterKey, filterValue } = req.body;

    try {
        // Build query based on input
        const filters = {};
        if (filterKey && filterValue) {
            filters[filterKey] = filterValue;
        }

        console.log("FILTERS:", filters);

        // Fetch data with the constructed filters
        const data = await Product.findAll({ where: filters });
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data", error });
    }
};




module.exports = {
  getProductReport,
  getReport,
};
