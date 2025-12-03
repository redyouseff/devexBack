
const asyncHandler = require('express-async-handler'); 
const apiError = require('../utilts/apiError');
const { model } = require('mongoose');
const apiFeatures = require('../utilts/apiFeature');
const { Result } = require('express-validator');

 const deleteOne=(model)=>{
    return  asyncHandler(async(req,res,next)=>{
        const id =req.params.id;
        const blog =await model.findByIdAndDelete(id);
        if(!blog){
            return next(new apiError(`there is no document for this is ${id}`));
        }
        res.status(200).json("document deleted");
    })
 }



 const updateOne=(model)=>{
    return asyncHandler(async(req,res,next)=>{
        try{

            const document=await model.findByIdAndUpdate(req.params.id,req.body,
                {new:true},)

                document.save();
                res.status(200).json({
                    data:document
                })

        }
        catch{
            return next(new apiError(`not found document with this id ${req.params.id}`));

        }
    })
 }

 const createOne=(model)=>{
    return asyncHandler(async(req,res,next)=>{
        const document=await model.create(req.body);
        res.status(200).json({data:document})
    })
 }

 const getOne=(model,populatetionOptions)=>{
    return asyncHandler(async(req,res,next)=>{
        const document =await  model.findById(req.params.id);
        if(!document){
            return next (new apiError(`there is no document for this id ${req.params.id}`))
        };

        if(populatetionOptions){
            document=document.populate(populatetionOptions)
        }
     
        if(!document){
            return next(new apiError(`error on finding this id ${req.params.id}`))
        }

        res.status(200).json({
            data:document
        })

        

    })
 }

 const getAll=(model)=>{
    return asyncHandler(async(req,res,next)=>{
        let filter={};
        if(req.filterObj){
            filter=req.filterObj;
        }
        let documents=await model.countDocuments();
        const queryStringObject={...req.query};
        let Features=new apiFeatures(queryStringObject,model.find(filter))
        .filter()
        .sort()
        .search("blogs")
        .limiteFields()
        .paginate(documents)
        
  

        const {paginationResult,mongooseQuery}=Features
       

        const result =await mongooseQuery;
        res.status(200).json({
            pagination:paginationResult,
            length:result.length,
            data:result
        })



    })
 }






 module.exports={deleteOne,updateOne,createOne,getOne,getAll}