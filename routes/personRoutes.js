const express = require('express')
const router = express.Router()
const Person = require('./../models/person')

router.post('/signup', async (req,res)=>{

  try {
    const data = req.body
    const newPerson = new Person(data)

    const response = await newPerson.save()
    console.log('data saved')
    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'internal server error'})

  }
})

router.get('/',async (req,res)=>{
  try {
    const data = await Person.find()
    console.log('data fetched')
    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    res.status(500).json({error:'internal server error'})
  }

 
})

router.get('/:workType',async (req,res)=>{
  try {
    let workType = req.params.workType
    if(workType == 'waiter' || workType== 'chef' || workType== 'manager'){
      const response =await Person.find({work:workType})
      console.log('person work fetched')
      res.status(200).json(response)
    }
    else{
      res.status(404).json({error:'invalid work '})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json('internal server error')
  }
})

router.put('/:id',async (req,res)=>{
  try {
    const personid = req.params.id // Extract id from url parameter
    const updatedPerson = req.body //update data for person
  
    const response =await Person.findByIdAndUpdate(personid,updatedPerson,{
      new:true, // return the updated document
      runValidators:true // run mongoose validations
    })
    if(!response){
     return res.status(404).json({error:'person id not found in document'})
    }
    console.log('person updated')
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'internal server error'})
  }
 
})
// delete person from its id

router.delete('/:id', async (req,res)=>{
  try {
    const id = req.params.id
    const response  = await Person.findByIdAndDelete(id)

    if(!response){
      res.status(404).json({error:'person id not found'})
    }
    console.log('person deleted succesfully')
    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    res.status(500).json({error:'internal server error'})
  }
})

module.exports = router

