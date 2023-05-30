const express = require('express')
const { ordersModel } = require('../models/order')
const order = require('../models/order')

const ordersRouter = express.Router()

ordersRouter.get('/', async(req,res) =>{
  res.send('orders OK')
})

ordersRouter.post('/create', async (req, res) => {
  const { _id, item, price, quantity } = req.body
  const order = await ordersModel.create({ _id, item, price, quantity })
  res.send("done")
})


module.exports = { ordersRouter }  