const Products = require('./products')
const autoCatch = require('./lib/auto-catch');

const listProducts = async (req, res) => {
  const { offset = 0, limit = 25, tag } = req.query;

  const products = (await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }));

  res.json(products);
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) return next();

  res.json(product);
};

const createProduct = (req, res, next) => {
  console.log('request body: ', req.body);
  res.json(req.body);
};

const editProduct = async (req, res, next) => {
  res.json(req.body);
};

const deleteProduct = async (req, res, next) => {
  res.json({ success: true });
};

module.exports = autoCatch({
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
});
