const { default: mongoose } = require("mongoose");
const bcrypt =require("bcrypt")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
    },
    slug:{
        type:String,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,"email is required "],
        unique:true,
        lowercase:true
    },
    phone:String,
    profileImage:String,
    password:{
        type:String,
        required:[true,"password is reqired"],
        minlenght:[6,"password is to short"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    active:{
        type:Boolean,
        default:true

    },
    passwordChangedAt:{
        type:Date
    },
    passwordResetCode:String,
    passwordResetExpires:Date,
    passwordResetVerified:Boolean,

        
    addresses:[{
        id:{type:mongoose.Schema.Types.ObjectId},
        alias:String,
        details:String,
        phone:String,
        city:String,
        postalCode:String
    }]


    


},{timestamps:true})

 

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next();

    }    
    const salt=await bcrypt.genSalt(12)
     this.password=await bcrypt.hash(this.password,salt);
     next();
   



})

const userModel=new mongoose.model("user",userSchema);



module.exports=  userModel; 



