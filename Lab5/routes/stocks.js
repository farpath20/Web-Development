const express = require('express');
const router = express.Router();
const data = require('../data');
const stocksData = data.stocks;
router.get('/:id', async (req, res) => {
    try {
      if(typeof req.params.id != "string")
      {
        throw "Error: Was not given a string somehow."
      }
      const stock = await stocksData.getStockById(req.params.id);
      res.json(stock);
    } catch (e) {
      res.status(404).json({ message: 'Stock not found' });
    }
  });
router.get('/', async (req, res) => {
    try {
        const stocksList = await stocksData.getStocks();
        res.json(stocksList);
    } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;