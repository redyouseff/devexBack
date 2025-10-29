
const apiError=require("../utilts/apiError");

const globleError=(err,req,res,next)=>{
    console.log(err.message);
    err.statusCode=err.statusCode|| 500;
    err.status=err.status|| "failed"

    if(process.env.NODE_ENV=="development"){
        sendErrorForDev(err,res);

    }

    else{
        if(err.name=="JsonWebTokenError") err=handleInvalidSignature();
        if(err.name=="TokenExpiredError") err=new apiError("Token expired",401);

        sendErrorForProd(err,res);


    }



}

const handleInvalidSignature=()=>new apiError("invalid token",401);

const sendErrorForProd=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    })
}

const sendErrorForDev=(err,res)=>{

    res.status(err.statusCode).json({
        statusCode:err.statusCode,
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}

module.exports=globleError;




