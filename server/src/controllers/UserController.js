    const User = require("../Model/User");
    const UserService = require("../services/UserService")
     
    // https://www.youtube.com/watch?v=jZ-dzj6ut54 : Vidéo tuto pour le MVC de base
    
    const handleNewUser = async(req, res)=>{
        const {email, password} = req.body;

        try{
            await UserService.createUser(email, password);
            res.status(201).json({ 'success' : 'New user has been created'});
        } catch (err){
            res.status(500).json({ 'Error message' : err.message});
        }   
    }

    module.exports = {handleNewUser};