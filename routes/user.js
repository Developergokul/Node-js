//import the express package
const express = require('express');

const router = express.Router();

const {getAllusers,getUserById,addUser,editUser,deleteUser} = require('../Controllers/user');

//GET request for displaying users
router.get("/users", getAllusers);

//Get Request for displaying single user using ID
router.get("/user/:id",getUserById);

//POST route to insert data
router.post("/api/users", addUser);

// Edit the user
router.put("/api/user/:id", editUser);

// Delete API
router.delete("/api/user/:id", deleteUser);

module.exports = router;