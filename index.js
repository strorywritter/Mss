import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js";
import multer from "multer"
import cloudinary from "cloudinary"
// import middleware from './middleware/auth.js'

const app = express()
const PORT = 4000

app.use(cors())

// app.use(middleware.decodeToken)

await connectDB();

cloudinary.config({
  cloud_name: "dt0jpeqrs",
  api_key: "423843764313348",
  api_secret: "wRF-zPuA2dhuZ9VpYxbnYkR6XW8",
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

// work functions
// import signup from './functions/user/signup.js'
import addWork from './functions/works/addWork.js'
import getWorks from './functions/works/getAllWorks.js'
import getWorksByAssignedTo from './functions/works/getWorksByAssignedTo.js'
import getWorksByDepartment from './functions/works/getWorksByDepartment.js'
import updateWorkToInProgress from './functions/works/updateWorkToInProgress.js'
import updateWorkToCompleted from './functions/works/updateWorkToCompleted.js'

// user functions
import addUser from './functions/register/addUser.js'
import loginUser from './functions/register/loginUser.js'


app.use(bodyParser.json())

// app.use('/user',upload.single("file"),addTodo)
app.use('/work',addWork)

app.use('/work',getWorks)

app.use('/work',getWorksByAssignedTo)

app.use('/work',getWorksByDepartment)

app.use('/work',updateWorkToInProgress)

app.use('/work',updateWorkToCompleted)

////////////////////////////////////////////////////////////////

app.use('/user',addUser)

app.use('/user',loginUser)



app.get('/users',(req,res)=>{
    console.log("main page")
    res.send('main page')
})
app.listen(PORT, ()=> console.log(`Server running on port: http://localhost ${PORT}`))