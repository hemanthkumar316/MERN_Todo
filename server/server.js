const express =require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
 const cors=require('cors')
const todorouter=require('./routes/routes')
const app=express();
const bodyParser = require("body-parser")

dotenv.config({path:'./config/.env'})
const  port=process.env.PORT
const mongo= process.env.MONGO_URL
app.use(cors());

app.use(bodyParser.json());
app.use(express.json())
mongoose.connect(mongo,{
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(console.log('Mongodb connection is successfully'))
.catch((err)=>console.log(err))

app.use('/task',todorouter)
app.listen(port,(err)=>{
 if(err) throw err
 console.log(`server is running on PORT Number ${port}`)

})