const mongoose =require("mongoose");

const dbConnection=async()=>{
    mongoose.connect(process.env.DB_URL)
    .then((conn)=>{
        console.log(conn.connection.host);
       })
    
}

module.exports=dbConnection;