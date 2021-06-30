const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const photoController = require('../../controllers/photoController');


/*
@route          POST api/photos/addnewphoto (add new photo)
@description    Add a new photo.
@access         Private
*/
router.post('/addnewphoto', auth, photoController.addNewPhoto);

/*
@route          GET api/photos/getallphotos (get all photos)
@description    Get all photos.
@access         Public
*/
router.get('/getallphotos', photoController.getAllPhotos);

/*
@route          POST api/photos/deleteonephoto/:id (delete one photo)
@description    Delete a photo.
@access         Private
*/
router.delete('/deleteonephoto/:id', auth, photoController.deleteOnePhoto);


module.exports = router;
