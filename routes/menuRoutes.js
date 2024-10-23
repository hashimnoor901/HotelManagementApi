const express = require('express')
const router = express.Router()
const menuItem = require('../models/menu')
const { find } = require('lodash')
router.post('/',async (req,res)=>{
  try {
    const data = req.body
    const newMenuItem = new menuItem(data)
    const response = await newMenuItem.save()
    console.log('data sended succesfully')
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.get('/',async(req,res)=>{
  try {
    const data = await menuItem.find()
    console.log('menu fetched success')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.get('/:taste',async(req,res)=>{

  try {
    const Requiredtaste = req.params.taste
  const updatedTaste = req.body

  if(Requiredtaste =='soar' || Requiredtaste=='sweet' || Requiredtaste=='spicy'){
    const response =await menuItem.find({taste:Requiredtaste})
    console.log(' required  taste founded')
    res.status(200).json(response)
  }
  else{
    res.status(404).json({error:'taste not matched'})
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'internal server error'})
  }
  
  

})

module.exports = router