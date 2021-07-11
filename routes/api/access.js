const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/accessController');
const auth = require('../../middleware/auth');


/*
@route          POST api/access/fetchallaccesses (create new access)
@description    Get all available accesses
@access         Private
*/
router.get('/fetchallaccesses', auth, accessController.fetchAllAccesses);


/*
@route          POST api/access/createnewaccess(create new access)
@description    Create a new access for users to register with.
@access         Private
*/
router.post('/createnewaccess', auth, accessController.createNewAccess);


/*
@route 			DELETE api/access/deleteoneaccess/:id
@description 	Delete a single page with given id.
@access 		Private (auth needed).
*/
router.delete('/deleteoneaccess/:id', auth, accessController.deleteOneAccess);



module.exports = router;
