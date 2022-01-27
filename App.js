const express=require('express');
const mongoose=require('mongoose');
const connectDB = require('./config/db');
const PORT=9999;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//load routes
connectDB()
const employeeRoutes=require('./routes/employeeRoutes')
app.use("/api/employee",employeeRoutes)
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})