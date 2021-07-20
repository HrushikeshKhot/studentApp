const path=require('path');
require('dotenv').config();

const PORT=process.env.PORT;
const helmet=require('helmet');
const cors = require('cors');
const bodrParser=require('body-parser');
const express=require('express');
const app=express();

app.use(helmet.hidePoweredBy());
app.use(cors());

app.use(bodrParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodrParser.json({limit:'50mb',extended:true}));

let a =(req,res,next)=>{
    console.log("hiii");
    console.log(req.method);
    console.log(req.url)
    next();
}
app.use('/',a)

app.use('/',require('./routes/global'));

app.listen(PORT,'localhost',()=>{
    console.log("server running on port "+PORT);
});