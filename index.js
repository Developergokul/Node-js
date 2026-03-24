//import the express package
const express = require('express');

//import the fs module
const fs = require('fs');

// import dummy data file
const users = require('./UserData.json');

//assign express to app variable
const app = express();

//assign port for server
const PORT = '8000';

//Middlewear  - plugin
app.use(express.urlencoded({extended: false}));

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

//POST route to insert data
app.post("/api/users", (req, res)=>{
    //request data from body
    const body = req.body;

    users.push({...body, id: users.length + 1 });
    //add data in file
    fs.writeFile("./UserData.json", JSON.stringify(users), (err, data)=>{

        return res.json({status:"success", id:users.length + 1});
    });

});

//define server
app.listen(PORT, ()=>console.log('SERVER STARTED', {PORT}));

