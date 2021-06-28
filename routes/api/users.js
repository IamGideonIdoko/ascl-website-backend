const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

/*
@route          POST api/users/reguser (reg user)
@description    Register a new user.
@access         Public (but access_name and access_key are needed)
*/
router.post('/reguser', userController.registerNewUser);


module.exports = router;
