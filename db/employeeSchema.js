const mongoose=require('mongoose')
const employeeSchema=new mongoose.Schema({
    employee_name:{
        type:String,
        required:true
    },
    employee_id:{
        type:Number,
        required:true
    }
    
})
module.exports=mongoose.model("employee",employeeSchema)