const blogRoute=require("./blogRoute");

const mainRoutes=(app)=>{
    app.use("/api/blogs",blogRoute);
}
module.exports=mainRoutes;
