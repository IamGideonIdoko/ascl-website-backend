const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authController = require('../../controllers/authController');


/*
@route 			POST /api/auth/authenticateuser (authenticate user)
@description 	authenticate the user.
@access 		Public
*/
router.post('/authenticateuser', authController.authenticateUser);


/*
@route 			GET api/auth/fetchauthenticateduser (fetch authenticated user)
@description 	Get authenticated user data.
@access 		Private
*/
router.get('/fetchauthenticateduser', auth, authController.fetchAuthenticatedUser)


//export router
module.exports = router;
