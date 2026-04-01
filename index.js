//import the express package
const express = require('express');

//import the fs module
const fs = require('fs');

// import dummy data file
const users = require('./UserData.json');
const { default: mongoose } = require('mongoose');

//assign express to app variable
const app = express();

//assign port for server
const PORT = '8000';

//connection
mongoose.connect("mongodb://127.0.0.1:27017");

//Schema
const userSchema = new mongoose.Schema({
    first_name:{
        type : String,
        require : true
    },
    last_name:{
        type : String
    },
    email:{
        type : String,
        require : true,
        unique : true,
    }
});

const usermodal = mongoose.model("users", userSchema);

//Middlewear  - plugin
app.use(express.urlencoded({extended: false}));

//custom middlewear
app.use((req, res, next)=>{
    console.log("Hello i am meadlewear 1");
    next();
});

//GET request for displaying users
app.get("/users", async(req, res)=>{
    // return res.json(users);
    const allDbUsers = await usermodal.find({});

    const html = `
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

    return res.send(html);


});

//Get Request for displaying single user using ID
app.get("/user/:id",async (req, res)=>{
    // const id = req.params.id;
    const user = await usermodal.findById(req.params.id)
    // const user = users.find((user)=>user.id==id);
    if(!user) return res.status(404).json({error:"User Not Found"});
    return res.json(user);
});

//POST route to insert data
app.post("/api/users", async(req, res)=>{
    //request data from body
    const body = req.body;

    users.push({...body, id: users.length + 1 });
    //add data in file
    // fs.writeFile("./UserData.json", JSON.stringify(users), (err, data)=>{

    //     return res.json({status:"success", id:users.length + 1});
    // });
const result = await usermodal.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email
})
console.log(result);
res.status(201).json({msg:'success'});


});

// Edit the user
app.put("/api/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    // Find user
    const user = users.find((user) => user.id == id);

    if (!user) {
        return res.status(404).json({ status: "User not found" });
    }

    // 👉 Update user data
    // Object.assign(user, body);
    // OR you can use:
    user.first_name = body.first_name;
    // user.age = body.age;

    // 👉 Save updated data
    fs.writeFile("./UserData.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error writing file" });
        }

        return res.json({
            status: "success",
            updatedUser: user
        });
    });
});

// Delete API
app.delete("/api/user/:id", (req, res) => {
    const id = Number(req.params.id);

    // 👉 Find user index (NOT just user)
    const userIndex = users.findIndex((user) => user.id == id);

    if (userIndex === -1) {
        return res.status(404).json({ status: "User not found" });
    }

    // 👉 Remove user from array
    const deletedUser = users.splice(userIndex, 1);

    // 👉 Save updated data to file
    fs.writeFile("./UserData.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error writing file" });
        }

        return res.json({
            status: "success",
            deletedUser: deletedUser[0]
        });
    });
});

//define server
app.listen(PORT, ()=>console.log('SERVER STARTED', {PORT}));

