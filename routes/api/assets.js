const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const assetController = require('../../controllers/assetController');


/*
@route          POST api/assets/addnewasset (add new asset)
@description    Add a new asset.
@access         Private
*/
router.post('/addnewasset', auth, assetController.addNewAsset);

/*
@route          GET api/assets/getallassets (get all assets)
@description    Get all assets.
@access         Public
*/
router.get('/getallassets', assetController.getAllAssets);

/*
@route          POST api/assets/deleteoneasset/:id (delete one asset)
@description    Delete a asset.
@access         Private
*/
router.delete('/deleteoneasset/:id', auth, assetController.deleteOneAsset);


module.exports = router;
