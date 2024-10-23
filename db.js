// database connection file
const mongoose  = require('mongoose')
require('dotenv').config()
// const mongoUrl = process.env.DB_URL
const mongoUrl = 'mongodb+srv://hashimn901:H@shimnoor311@cluster1.k68bunp.mongodb.net/'
mongoose.connect(mongoUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

const db = mongoose.connection;


//Event Listenr 'connected' , 'error', 'disconnected'
db.on('connected',()=>{
  console.log('connected to mongodb server')
})
// ye aik event listener ha jo btay ga db connect ho gae ha

db.on('error',(err)=>{
  console.log('mongodb connecttion error',err)
})

db.on('disconnected',()=>{
  console.log('disconnected to mongodb server')
})

module.exports = db