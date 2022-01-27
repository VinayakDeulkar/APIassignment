const express=require('express')
const router=express.Router();
const {check,validationResult}=require('express-validator')
const {getData,postData,deleteData,updateData}=require('../controller/empcontroller')

const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
function autenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
      res.json("Token not Found");
    } else {
      jwt.verify(token, jwtSecret, (err, data) => {
        if (err) {
          res.json("Token Not Matched");
        } else {
          console.log("Token Match ");
          next();
        }
      });
    }
  }
  let payload = {
    uid: "Vinayak",
  };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 30});
  console.log(token);
router.get('/getData',autenticateToken,(req,res)=>{
        
        res.send(getData())
})
router.post('/postData',[autenticateToken,
    check('employee_id','id must be number')
    .exists()
    .isNumeric(),
    check('employee_name','Name must be 3+ characters and alphabates')
    .exists()
    .isAlpha()
    .isLength({min:3})
    .isString()
],(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        let alert=errors.array()
        res.send(alert)
    }
    else{
        postData(req.body)
        res.send('Data Added')
    } 
})
router.delete('/deleteData/:id',autenticateToken,(req,res)=>{
    let id=req.params.id
        deleteData(id)
        res.send('Data Deleted')
})
router.put('/updateData/:id',autenticateToken,(req,res)=>{
    let id=req.params.id
    updateData(id,req.body)
    res.send('Data Updated')
})
module.exports=router;