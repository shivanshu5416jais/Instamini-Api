const express=require('express');
const app=express();
const morgan=require("morgan");
const dotenv=require('dotenv')
const expressValidator=require('express-validator')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const fs= require("fs")
const cookieParser=require('cookie-parser')
const cors=require("cors")
dotenv.config()
const path=require('path')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>console.log('DB Connected'))

mongoose.connection.on('error',err=>{
    console.log(`DB connection error: ${err.message}`);
    
})

const postRoutes=require('./routes/post')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')

//apiDocs
app.get('/',(req,res)=>{
    fs.readFile("docs/apiDocs.json",(err,data)=>{
        if(err){
            res.status(400).json({
                error:err
            })
        }
        const docs=JSON.parse(data)
        res.json(docs)
    })
})

//midleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors())
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function (err,req,res,next){
    if(err.name==='UnauthorizedError'){
        res.status(401).json({error:"Unauthorised"});
    }
    
});

if(process.env.NODE_ENV==='production'){
    app.use(express.static('../react-front/build'));
    app.get('*',(req,res)=>{
        res.sendFile();
    });
}

const port=process.env.PORT || 8080;


app.listen(port,()=>{console.log(`ANODE JS API IS LISTENING ON PORT: ${port}`);
});