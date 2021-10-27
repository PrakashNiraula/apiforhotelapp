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
        pool.query("select * from myproducts where visible='1'",(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    }) 
}


db.inserttobill=(billid,productid,quantity,rate)=>{
    return new Promise((resolve,reject)=>{
        pool.query("insert into bill_content values(Null,?,?,?,?,?)",billid,productid,quantity,rate,quantity*rate,(err,res)=>{
            if(err) reject(err);
            return resolve(res);
        })
    })

}


module.exports=db;
