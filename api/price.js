const { currentPrice } = require('./_db');
module.exports = async (req, res) => res.json(await currentPrice());
