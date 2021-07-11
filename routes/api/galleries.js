const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const galleryController = require('../../controllers/galleryController');


/*
@route 			GET api/galleries/fetchallgalleries (fetch all galleries)
@description 	Get all available galleries.
@access 		Public.
*/
router.get('/fetchallgalleries', galleryController.fetchAllGalleries);


/*
@route 			POST api/galleries/createnewgallery (create new gallery)
@description 	Create a new gallery.
@access 		Private (auth needed).
*/
router.post('/createnewgallery', auth, galleryController.createNewGallery);


/*
@route 			DELETE api/galleries/deleteonegallery/:id
@description 	Delete a single gallery with given id.
@access 		Private (auth needed).
*/
router.delete('/deleteonegallery/:id', auth, galleryController.deleteOneGallery);


/*
@route 			PUT api/galleries/updateonegallery/:id
@description 	Update a single gallery with given id.
@access 		Private (auth needed).
*/
router.put('/updateonegallery/:id', auth, galleryController.updateOneGallery);


module.exports = router;