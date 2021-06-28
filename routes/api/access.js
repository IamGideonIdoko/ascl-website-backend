const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/accessController');
const auth = require('../../middleware/auth');

/*
@route          POST api/access/createnewaccess(create new access)
@description    Create a new access for users to register with.
@access         Private
*/
router.post('/createnewaccess', auth, accessController.createNewAccess);


module.exports = router;
