const mongoose = require('mongoose')

const inventoriesSchema = new mongoose.Schema({
  _id: Number,
  sku: String,
  description: String,
  instock: Number
})

const inventoriesModel = mongoose.model('inventories', inventoriesSchema)

module.exports = { inventoriesModel }