const employeeSchema=require('../db/employeeSchema')
const getData=async()=>{
    await employeeSchema.find({},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    })
}
 const  postData=async(data)=>{
     let employee_name=data.employee_name;
     let employee_id=data.employee_id
     let userData=new employeeSchema({employee_name:employee_name,employee_id:employee_id})
     await userData.save((err)=>{
         if(err){
             console.log(err);
         }
         else{
             console.log('Data addded');
         }
     })
     
}
const deleteData=async(data)=>{
    let id=data;
    await employeeSchema.deleteOne({employee_id:id},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('data deleted');
        }
    })
    
}
const updateData=async(id,data)=>{
   let empid=id;
   let newData=data
   await employeeSchema.updateOne({employee_id:empid},{$set:data},(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('data updated');
    }
   })
}
module.exports={
    getData,postData,deleteData,updateData
}