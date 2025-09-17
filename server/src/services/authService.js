const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function createUser(email, password) {
    if(!email || !password) throw new Error("Email and Password are required");
    
    const duplicate = await User.findOne({email: email});
    if(duplicate) throw new Error('User already exists');
    
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        "email" : email,
        "password" : hashedPwd,
    })

    return newUser;
}

async function logUser(email, password){
    const user = await User.findOne({ email });
    if (!user) throw new Error('Authentication failed');
    
    const checkpassword = await bcrypt.compare(password, user.password);
    if(!checkpassword) throw new Error('Password don\'t match');
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
    
    return accessToken;
}

module.exports = { createUser, logUser };