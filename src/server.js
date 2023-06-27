require("dotenv").config();
import  express from "express";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";
import bodyParser from "body-parser";

let app = express();

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
viewEngine(app);

// init all web routes
webRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log(`App is running at the port ${port}`);
});