const csv = require('csv-parser');
const fs = require('fs');
const { Product } = require('../models');

const uploadCSV = async (req, res) => {
    const results = [];

    // Define a mapping for the keys
    const keyMapping = {
        'Campaign Name': 'campaignName',
        'Ad Group ID': 'adGroupId',
        'FSN ID': 'fsnId',
        'Product Name': 'productName',
        'Ad Spend': 'adSpend',
        Views: 'views',
        Clicks: 'clicks',
        'Direct Units': 'directUnits',
        'Indirect Units': 'indirectUnits',
        'Direct Revenue': 'directRevenue',
        'Indirect Revenue': 'indirectRevenue',
    };

    // Read and process the CSV file
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                // Transform each object in the results array
                const transformedResults = results.map((row) => {
                    const transformedRow = {};
                    for (const [key, value] of Object.entries(row)) {
                        const newKey = keyMapping[key] || key; // Map key, or use original if not found
                        transformedRow[newKey] = isNaN(value) ? value : Number(value); // Convert numeric strings to numbers
                    }
                    return transformedRow;
                });

                console.log('Transformed Results:', transformedResults);

                // Save to the database
                await Product.bulkCreate(transformedResults);

                res.json({ message: 'Data uploaded successfully', data: transformedResults });
            } catch (error) {
                console.error('Error uploading data:', error);
                res.status(500).json({ error: 'Failed to upload data' });
            }
        });
}

module.exports = { uploadCSV };
