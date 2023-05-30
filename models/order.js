const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
  _id: Number,
  item: String,
  price: Number,
  quantity: Number
})

const ordersModel = mongoose.model('orders', ordersSchema)

module.exports = { ordersModel }