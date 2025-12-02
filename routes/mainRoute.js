const blogRoute=require("./blogRoute");
const authRoute=require("./authRoute");

const mainRoutes=(app)=>{
    app.use("/api/blogs",blogRoute);
    app.use("/api/auth",authRoute); 
}
module.exports=mainRoutes; 








