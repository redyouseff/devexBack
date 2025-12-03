const { json } = require("express");



class apiFeatures {
    constructor(queryStringObject,mongooseQuery){
        this.queryStringObject=queryStringObject;
        this.mongooseQuery=mongooseQuery;
    }

    filter(){
        let queryString={...this.queryStringObject};
        let excludesFields=["padge","limit","sort","fields","keyword"];
        excludesFields.forEach((field)=>{
            delete queryString[field]
        })

         queryString=JSON.stringify(queryString);
         queryString=queryString.replace(/\b(gte|gt|lt|lte)\b/g,(match)=>`$${match}`)
          
         this.mongooseQuery=this.mongooseQuery.find(JSON.parse(queryString))
      
         return this
    }

    sort(){
        if(this.queryStringObject.sort){
            let sort =this.queryStringObject.sort.split(",").join(" ")
            this.mongooseQuery=this.mongooseQuery.sort(sort)
        
        }
        return this;
    }

    limiteFields(){
        if(this.queryStringObject.fields){
            const fields=this.queryStringObject.fields.split(",").join(" ");
            this.mongooseQuery=this.mongooseQuery.select(fields);
        }
        return this
    }

    search(modelName){
       if(this.queryStringObject.keyword){
         if(modelName=="blogs"){
            this.mongooseQuery=this.mongooseQuery.find({$text:{$search:this.queryStringObject.keyword}},{$score:{$meta:"textScore"}})
             .sort({ score: { $meta: "textScore" } });
            
          
            
        }
        else{
              query= { name: { $regex: this.queryStringObject.keyword, $options: 'i' } }
        }
       }

       return this ;
        

    }

        paginate(countDocuments){
            const page=this.queryStringObject.page*1|1;
            const limit=this.queryStringObject.limit*1|5;
            const skip=(page-1)*limit;
            const endIndex=page*limit;
            let pagination={}
            pagination.currentPage=page;
            pagination.limit=limit;
            pagination.numberOfPage=(Math.ceil(countDocuments/limit));
            if(endIndex<countDocuments){
                pagination.next=(page+1);
            }
            if(endIndex>0){
                pagination.prev=(page-1);
            };
            this.paginationResult=pagination;
            
            this.mongooseQuery=this.mongooseQuery.skip(skip).limit(limit);

            return this;

        }    




}

module.exports =apiFeatures