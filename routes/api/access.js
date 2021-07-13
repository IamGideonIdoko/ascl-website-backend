const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/accessController');
const auth = require('../../middleware/auth');


/*
@route          POST api/accesses/fetchallaccesses (create new access)
@description    Get all available accesses
@access         Private
*/
router.get('/fetchallaccesses', accessController.fetchAllAccesses);


/*
@route          POST api/accesses/createnewaccess(create new access)
@description    Create a new access for users to register with.
@access         Private
*/
router.post('/createnewaccess', auth, accessController.createNewAccess);


/*
@route 			DELETE api/accesses/deleteoneaccess/:id
@description 	Delete a single page with given id.
@access 		Private (auth needed).
*/
router.delete('/deleteoneaccess/:id', auth, accessController.deleteOneAccess);



module.exports = router;
