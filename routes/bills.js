const express=require('express')
const db=require('../db')
const router=express.Router();


router.route('/')
.get(async(req,res,next)=>{
    try {
        res.json(await db.allbills())  
    } catch (error) {
        console.log(error);
        next(error); 
    }
});

router.route('/:id')
.get(async(req,res,next)=>{
    try {
        res.json(await db.getbillbyid(req.params.id))  
    } catch (error) {
        console.log(error);
        next(error); 
    }
});


module.exports=router;