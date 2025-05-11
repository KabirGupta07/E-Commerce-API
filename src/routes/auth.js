const router = require("express").Router()

const dotenv = require("dotenv")

const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
dotenv.config()


//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET).toString()
        ,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
        console.log(savedUser);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


//LOGIN
router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.username });
        //USER not found
        !user && res.status(401).json("Wrong Credentials: Invalid UserName");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        //console.log(password);

        
        //WRONG PASSWORD
        OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong Credentials : Wrong Password")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        // req.body.password;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router//