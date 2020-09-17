const cuid = require('cuid');

const db = require('./db');

const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: String,
  imgThumb: String,
  img: String,
  link: String,
  userId: String,
  userName: String,
  userLink: String,
  tags: { type: [String], index: true },
});

const list = async (opts = {}) => {
  const { offset = 0, limit = 25, tag } = opts;

  const data = await fs.readFile(productsFile);
  return JSON.parse(data)
    .filter((product) => !tag || product.tags.indexOf(tag) >= 0)
    .slice(offset, offset + limit);
};

const get = async (id) => {
  const products = JSON.parse(await fs.readFile(productsFile));

  for (let i = 0; i < products.length; ++i) {
    if (products[i]._id === id) return products[i];
  }

  return null;
};

const create = async (fields) => {
  const product = await new Product(fields).save();
  
  return product;
};

module.exports = {
  list,
  get,
  create,
};
