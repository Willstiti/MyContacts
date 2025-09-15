    const User = require("../Model/User");
    const bcrypt = require("bcrypt");
     
    // https://www.youtube.com/watch?v=jZ-dzj6ut54 : Vidéo tuto pour le MVC de base
    
    const handleNewUser = async(req, res)=>{
        const {email, pwd} = req.body;
        if(!email || !pwd) return res.status(400).json({"message": "email and password are required"});

        const duplicate = await User.findOne({email: email}).exec();
        if(duplicate) return res.status(400).json({'failed': 'User already exists'});

        try{
            const hashedPwd = await bcrypt.hash(pwd, 10);
            const newUser = await User.create({
                "email" : email,
                "password" : hashedPwd,
            })

            res.status(201).json({ 'success' : 'New user has been created'});
        } catch (err){
            res.status(500).json({ 'Error message' : err.message});
        }   
    }

    module.exports = {handleNewUser};