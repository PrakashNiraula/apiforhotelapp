const { NotExtended } = require('http-errors')
const mysql=require('mysql')

const pool=mysql.createPool({
connectionLimit:2,
host:'localhost',
user:'root',
password:'',
database:'hotel_pokhreli',
port:3306

})

let db={}


db.allbills=()=>{
return new Promise((resolve,reject)=>{
    pool.query("select * from guest_bill where status='Ongoing'",(err,results)=>{
       if(err){
           return reject(err);
       } 
       return resolve(results);
    }) 
})

}


db.getbillbyid=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("select * from guest_bill where id="+id,(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


db.getmyproducts=()=>{
    return new Promise((resolve,reject)=>{
        pool.query("select * from myproducts",(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    }) 
}


module.exports=db;
