const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {userRouter} = require('./routes/user')
const {inventoriesRouter} = require('./routes/inventories')
const { ordersRouter } = require('./routes/order');
const {userModel} = require('./models/user');

// const userRouter = express.Router
// const inventoriesRouter = express.Router

const app = express();

mongoose.connect('mongodb+srv://nggiang141:Agera141@cluster0.inysgaa.mongodb.net/mindx')

app.use(express.json())
app.use(cors())

const authenticationCheck = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, '123@lol');
  const { username } = decoded
  const user = await userModel.findOne({ username: username }).populate('songs')
  if (user) {
      req.user = user
      next()
  } else {
      res.send('User khong ton tai')
  }
}

app.use('/users', authenticationCheck, userRouter)
app.use('/inventories', inventoriesRouter)
app.use('/orders', ordersRouter)





app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (user && bcrypt.compareSync(password, user.password)) {
      const accesstoken = jwt.sign({ username: username }, '123@lol')
      res.send({ token: accesstoken })
  } else {
      res.send('khong tim thay')
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  const existringUser = await userModel.findOne({ username })
  if (existringUser) {
      res.send('user ton tại')
  } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt)
      const user = await userModel.create({ username, password: hashPassword, role: ['user'] })
      res.send(user)
  }
})



app.listen(3000, () => {
  console.log("App is running at 3000");
});


module.exports = app;