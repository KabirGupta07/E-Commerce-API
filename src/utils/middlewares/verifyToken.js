const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // console.log(token);
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid Token!");
            }
            req.user = user;
            next();
        });
    }
    else {
        return res.status(403).json("Not Authenticated!");
    }
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that");
        }

    })

}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        //console.log(req.user);
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not Admin -not allowed");
        }

    })

}
module.exports =
{
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};
