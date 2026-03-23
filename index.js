//import the express package
const express = require('express');

// import dummy data file
const users = require('./UserData.json');

//assign express to app variable
const app = express();

//assign port for server
const PORT = '8000';

//GET request for displaying users
app.get("/users",(req, res)=>{
    return res.json(users);
});

//Get Request for displaying single user using ID
app.get("/user/:id",(req, res)=>{
    const id = req.params.id;
    const user = users.find((user)=>user.id==id);
    return res.json(user);
});

//define server
app.listen(PORT, ()=>console.log('SERVER STARTED', {PORT}));

