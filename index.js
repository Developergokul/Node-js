const express = require('express');
//import the fs module
const fs = require('fs');
//assign express to app variable
const app = express();
//assign port for server
const PORT = '8000';

//connection
const {connectionMongoDb} = require('./connection.js');

//connection
connectionMongoDb("mongodb://127.0.0.1:27017");

const userRouter = require('./routes/user.js');






//Middlewear  - plugin
app.use(express.urlencoded({extended: false}));

//custom middlewear
app.use((req, res, next)=>{
    console.log("Hello i am meadlewear 1");
    next();
});

//Routes
app.use("/", userRouter);

//define server
app.listen(PORT, ()=>console.log('SERVER STARTED', {PORT}));

