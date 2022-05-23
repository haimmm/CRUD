const bcrypt = require("../modules/bcrypt.module");
const mySql = require("../modules/MySQL.module");

const create = (req, res, next) => {
    const newUser = req.body;
    newUser.password = bcrypt.encrypt(newUser.password)

    mySql.createUser(newUser);

    console.log("created new user");

    res.send({
        success: true
    });
}

//UPDATE user properties
const update = (req, res, next) => {
    const id = req.params.id;
    const updatedProps = req.body;
    if ("password" in updatedProps)
        updatedProps.password = bcrypt.encrypt(updatedProps.password);

    mySql.updateUser(id, updatedProps)

    console.log("updated user:", id);

    res.send({
        id
    });
}

const getUserById = (req, res, next) => {
    const id = req.params.id;
    mySql.readUserById(id)
        .then(user => {
            console.log("user: ", user)
            delete user.password;
            res.send(user);
        });
}



const getAll = (req, res, next) => {
    console.log("get all function");
    mySql.readUsers()
        .then(users => {
            users.forEach(u => {
                delete u.password;
            })
            console.log("returned all users");
            res.send(users);
        })
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;
    mySql.deleteUser(id);

    console.log("deleted user ", id);
    res.send({ id });
}



module.exports = {
    create,
    update,
    getAll,
    getUserById,
    deleteUser
}