const usermodal = require('../Models/user');

async function getAllusers(req, res){
    // return res.json(users);
    const allDbUsers = await usermodal.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    return res.send(html);
}

async function getUserById(req, res){
    // const id = req.params.id;
    const user = await usermodal.findById(req.params.id)
    // const user = users.find((user)=>user.id==id);
    if(!user) return res.status(404).json({error:"User Not Found"});
    return res.json(user);
}

async function addUser(req, res){
    //request data from body
    const body = req.body;
    users.push({...body, id: users.length + 1 });

    const result = await usermodal.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email
    })

    console.log(result);
    res.status(201).json({msg:'success'});
}

async function editUser(req, res) {
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
}

async function deleteUser(req, res){
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
}


module.exports = {
    getAllusers,
    getUserById,
    addUser,
    editUser,
    deleteUser,
}