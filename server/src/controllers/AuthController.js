    const User = require("../Model/User");
    const bcrypt = require("bcrypt");

    const handleNewUser = async(req, res)=>{
        const {email, pwd} = req.body;
        if(!email || !pwd) return res.status(400).json({"message": "email and password are required"});

        const duplicate = await User.findOne({email: email}).exec();
        if(duplicate) return res.sendStatus(409);

        try{
            const hashedPwd = await bcrypt.hash(pwd, 10);
            const newUser = await User.create({
                "email" : email,
                "password" : hashedPwd,
            })

            res.status(201).json({ 'success' : 'New user ${user} created'});
        } catch (err){
            res.status(500).json({ 'message' : err.message});
        }   
    }

    module.exports = {handleNewUser};