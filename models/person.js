const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // library for password encryption

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    required:false
  },
  work:{
    type:String,
    enum:['waiter','manager','chef'],
    required:true,
  },
  mobile:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  address:{
    type:String,
    required:true
  },
  salary:{
    type:Number,
    required:true
  },
  username:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  }

})
// pre is middleware function it will run we save the data
personSchema.pre('save',async function (next) {
  const person = this;
  // hash password only if it has been modified (or is new)
  if(!person.isModified('password')) return next() 
   
  try {
    // hash password generate
    const salt = await bcrypt.genSalt(10) // 10 number ka aik salt generat kray ga
    const hashedPassword  = await bcrypt.hash(person.password,salt)
    person.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})
personSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch;
  } catch (error) {
    throw error
  }
}

const Person = mongoose.model('Person',personSchema)
module.exports = Person