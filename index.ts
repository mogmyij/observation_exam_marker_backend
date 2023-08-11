const http = require("http");
require("dotenv").config();
const express = require("express");
const app=express();

const databasePassword=process.env.DATABASE_PASSWORD
const databaseUrl=`mongodb+srv://mogmyij:${databasePassword}@observationlevel1.5kkcv9y.mongodb.net/?retryWrites=true&w=majority`

//responds with the app when root of website is visited
app.use(express.static("build"))

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`backend server running on port ${PORT}`);
})