    const User = require("../Model/User");
    const AuthService = require("../services/authService")
    
    
    const handleLogin = async(req, res)=>{
        const {email, password} = req.body;
        try{
            await AuthService.logUser(email, password);
            res.status(201).json({ 'success' : 'Logged in Successfully'});
        }catch(err){
            res.status(500).json({ 'Error message' : err.message});
        }
    }

    const getLoggedInUser = async (req, res) => {
        const { _id, email } = await User.findById(req.user.id);
        res.status(200).json({
            id: _id,
            email,
        });
    };
    
    module.exports = { handleLogin, getLoggedInUser };