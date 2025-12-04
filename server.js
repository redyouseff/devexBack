const express = require("express");
const dotenv=require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const globleError=require("./middleware/globleError");
const compression = require('compression')
const  cors = require('cors')

const morgan=require("morgan")
const bodyParser = require('body-parser');
const path = require("path");
const dbConnection=require("./config/dbConnection");
const mainRoutes = require("./routes/mainRoute");
const apiError=require("./utilts/apiError");

const app =express();
app.use(express.json())   
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))   
app.use(express.static(path.join(__dirname, "./uploads")));

dbConnection();


if(process.env.NODE_ENV=="development"){
    app.use(morgan("dev"));
    console.log(`mode is ${process.env.NODE_ENV}`)

}

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});


mainRoutes(app);

app.use(/.*/, (req, res, next) => {
    next(new apiError(`Can't find the URL ${req.originalUrl}`, 400));
  });



app.use(globleError);