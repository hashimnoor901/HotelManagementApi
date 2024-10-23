const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true,
  },
  taste:{
    type:String,
    enum:['spicy','sweet','sour'],
    required:true
  },
  is_Drink:{
    type:Boolean,
    default:false
  },
  ingredients:{
    type:[String], // array 
    default:[]
  },
  numOfSales:{
    type:Number,
    default:0,
  }

})

const menuItem = mongoose.model('menuItem',menuSchema)

module.exports = menuItem