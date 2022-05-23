const bcrypt = require("../modules/bcrypt.module"); //encrypt password
const jwt = require("../modules/jwt.module"); // token
const mySql = require("../modules/MySQL.module");


const login = (req, res, next) => {
  const { email, password } = req.body;

  mySql.readUserByEail(email)
    .then(user => {
      console.log("data ", user);
      if (!user || !bcrypt.compare(password, user.password)) {
        return next({ message: 'Wrong email or password.', status: "401" });
      }
      delete user.password;
      const access_token = jwt.createNewToken({ userId: user.id }, parseInt(process.env.ACCESS_TOKEN_MAX_AGE));
      res.send({
        ...user,
        access_token
      });
    })



}


module.exports = {
  login
};