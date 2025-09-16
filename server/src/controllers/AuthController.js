    const User = require("../Model/User");
    const bcrypt = require("bcrypt");
    const jwt = require('jsonwebtoken');
    
    const handleLogin = async(req, res)=>{
        const {email, pwd} = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Authentication failed' });

        const checkpassword = await bcrypt.compare(pwd, user.password);
        if(!checkpassword) return res.status(400).json({'failed': 'Password don\'t match'});

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ accessToken });
    }

    const getLoggedInUser = async (req, res) => {
        const { _id, email } = await User.findById(req.user.id);
        res.status(200).json({
            id: _id,
            email,
        });
    };
    
    module.exports = { handleLogin, getLoggedInUser };