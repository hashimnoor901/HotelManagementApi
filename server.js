// console.log('server is runnig')

// function add(a,b){
//   return(
//     a+b
//   )
// }
// const result = add(2,10)
// console.log(result)

// function callback(){
//   console.log('call back is callled')

// }

// const addnum = (a,b,callback)=>{
//     const result =  a+b
//     console.log(result)
//     callback()
// }

// addnum(1,2,callback) 


// const fs = require('fs')
// const os = require('os')
// const lodash = require('lodash') 
// console.log(os)
// const user = os.userInfo()
// console.log(user)
// console.log(user.username)

// fs.appendFile('greeting.js','hi' +user.username +'wecome ',()=>{console.log('file created succuesfully')})

// console.log(lodash)
// const notes = require('./notes.js')

// const age = notes.age
// console.log('age is ',age)


// let persons = ['hashim','gulraiz','ahmed','hashim','ahmed','hashmi']
// let uniquePersons = lodash.uniq(persons) // lodash ma kuch functions hotay hein jesay array ma sa unique numbers of data nikalana ho
// console.log(uniquePersons)
// console.log(lodash.isArray('hashim'))

// Routes in node.js

// app.get('/chicken',(req,res)=>{
//   res.send('welcome to sheff checken what toyou need')
// })
// app.get('/meal',(req,res)=>{
  
//   let data = {
//     name:'hashim',
//     age:22,
//     isMarried:false,
//     address:'islamabad'
//   }
//   res.send(data)
// })

const express = require('express')
const app = express()
const db = require('./db') // importing db.js file 
const menuItem = require('./models/menu')
const Person = require('./models/person');

const passport = require('passport') //third party middleware for authentication i.e username and password
// authentication vs authorization
// authenticaltion matlab kisi user ka name or password ha ya nhi means user exist ?
// or authorization ka matlab kis user ko kis kis cheez ki access hogi
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()
const bodyParser = require('body-parser')//npm i body-parser // ye aik middleware ha jo kisi bi tra k data ko jo user send krta ha us ko format krta ha
app.use(bodyParser.json()) // it will convert data in json which user send

passport.use(new LocalStrategy(async (UserName,password,done)=>{
  try {
    console.log(`received credential`,UserName,password)
    const user =await Person.find({username:UserName})
    if(!user)
      return done(null,false,{message:'incorrect username'}) // ye callback() func ha done 2 para leta ha error , user and info
    const isPasswordMatch =await user.comparePassword(password)
    if(isPasswordMatch){
      return done(null,user)
    }
    else{
      return done(null,false,{message:'incorrect password'})
    }
  } catch (error) {
    return done(error)
  }
}))

app.use(passport.initialize())
const localAuthMiddleWare = passport.authenticate('local',{session:false}) // ye authentication k liye ha username or password k liye
app.get('/',function(req,res){
  res.send('wolcome to hotel i can i help you')
})

// client will send data through post
// post route to add person in database
// app.post('/person',(req,res)=>{

    // const data = req.body
    
    // create new person document using the mongoose model
    // const newPerson = new Person(data) 

    // this is difficult task
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.address = data.address;

    // newPerson.save((error,savedPerson)=>{
    //   if(error){
    //     console.log('Error saving person',error)
    //     res.status(500).json({error:'internal server error'})
    //   }
    //   else{
    //     console.log('data saved succesfully')
    //     res.status(200).json(savedPerson)
    //   }
    // })
// })







// parametrised api calls
// /person/:manager sirf manager walay document send kray ga

const PORT = process.env.PORT || 3000

const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuRoutes');
app.use('/person',localAuthMiddleWare,personRoutes)
app.use('/menu',localAuthMiddleWare,menuItemsRoutes) // ye /menu route sab par apply ho ga i.e post , get
app.listen(PORT,()=>{
  console.log('listning of port 3000')
})

