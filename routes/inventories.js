const express = require('express')
const { inventoriesModel } = require('../models/inventories')
const inventorie = require('../models/inventories')
const inventoriesRouter = express.Router()

inventoriesRouter.get('/', async(req,res) =>{
  res.send('inventories OK')
})

inventoriesRouter.get('/all', async(req, res) =>{
  try {
    const inventories = await inventoriesModel.find({})
        res.send(inventories)
  } catch (error) {
    res.send('Error')
    console.log(error)
  }
})

inventoriesRouter.post('/create', async (req, res) => {
  const { _id, sku, description, instock } = req.body
  const inventorie = await inventoriesModel.create({ _id, sku, description, instock })
  res.send("done")
})




module.exports = { inventoriesRouter }  