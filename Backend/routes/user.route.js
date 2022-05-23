//express
const express = require('express');
const router = express.Router();

//permissions
const permissions = require("../modules/permissions.module");

const tokenValidator = require('../middlewares/tokenValidator');
const permissionValidator = require("../middlewares/permissionsValidator")
const userController = require("../controllers/user.controller");


//create
router.post('/create', tokenValidator, userController.create);

//read all users
router.get('/', tokenValidator, userController.getAll);

//read user by id
router.get('/:id', tokenValidator, userController.getUserById);

//UPDATE user
router.put('/update/:id', tokenValidator, userController.update);

//delete user
router.put('/delete/:id', tokenValidator, userController.deleteUser);

module.exports = router;

