const jwt = require('../modules/jwt.module');
const mySql = require("../modules/MySQL.module");

const tokenValidator = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    console.log("TOKEN", token);
    try {
        const data = await jwt.verify(token);
        mySql.readUserById(data.userId)
        .then(user => {
        if(user){
            req.user = user;
            next();
        }else{
            next({ message: "couldn't find user related to this token", status: "404" }) 
        }
        });
    } catch (err) {
        return next({ message: "token is invalid or expired", status: "401" });
    }
}

module.exports = tokenValidator;