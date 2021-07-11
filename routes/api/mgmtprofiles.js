const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mgmtProfileController = require('../../controllers/mgmtProfileController');


/*
@route 			GET api/mgmtprofiles/fetchallmgmtprofiles (fetch all mgmtprofiles)
@description 	Get all available mgmtprofiles.
@access 		Public.
*/
router.get('/fetchallmgmtprofiles', mgmtProfileController.fetchAllMgmtProfiles);


/*
@route 			POST api/mgmtprofiles/createnewmgmtprofile (create new mgmtprofile)
@description 	Create a new mgmtprofile.
@access 		Private (auth needed).
*/
router.post('/createnewmgmtprofile', auth, mgmtProfileController.createNewMgmtProfile);


/*
@route 			DELETE api/mgmtprofiles/deleteonemgmtprofile/:id
@description 	Delete a single mgmtprofile with given id.
@access 		Private (auth needed).
*/
router.delete('/deleteonemgmtprofile/:id', auth, mgmtProfileController.deleteOneMgmtProfile);


/*
@route 			PUT api/mgmtprofiles/updateonemgmtprofile/:id
@description 	Update a single mgmtprofile with given id.
@access 		Private (auth needed).
*/
router.put('/updateonemgmtprofile/:id', auth, mgmtProfileController.updateOneMgmtProfile);


module.exports = router;