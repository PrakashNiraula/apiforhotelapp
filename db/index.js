const { NotExtended } = require('http-errors')
const mysql=require('mysql')

const pool=mysql.createPool({
connectionLimit:2,
host:'localhost',
user:'root',
password:'',
database:'hotel_pokhreli',
port:3306

// connectionLimit:2,
// host:'database-1.cmn2hbmgvegk.ap-south-1.rds.amazonaws.com',
// user:'admin',
// password:'#pvug209y',
// database:'janakpur_demo',
// port:3306

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


db.inserttobill=(billid,product_id,quantity,rate)=>{
    return new Promise((resolve,reject)=>{
      
        pool.query("insert into bill_content(`bill_id`,`product_id`,`quantity`,`rate`,`total`) values(?,?,?,?,?)",[billid,product_id,quantity,rate,quantity*rate],(err,res)=>{
            pool.query("update guest_bill set total=total+?,finalRemaining=finalRemaining+? where id=?",[quantity*rate,quantity*rate,billid],(error,result)=>{
                if(err) reject(err);
                if(error) reject(error);
                return resolve(result);
                
            })
           
        })
    })

}


module.exports=db;
