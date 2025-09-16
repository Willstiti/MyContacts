const User = require("../Model/User");
const bcrypt = require("bcrypt");

async function createUser(email, password) {
    if(!email || !password) throw new Error("Email and Password are required");
    
    const duplicate = await User.findOne({email: email}).exec();
    if(duplicate) throw new Error('User already exists');
    
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        "email" : email,
        "password" : hashedPwd,
    })

    return newUser;
}

module.exports = { createUser };