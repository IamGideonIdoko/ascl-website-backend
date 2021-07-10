const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const pageController = require('../../controllers/pageController');


/*
@route 			GET api/pages/fetchallpages (fetch all pages)
@description 	Get all available pages.
@access 		Public.
*/
router.get('/fetchallpages', pageController.fetchAllPages);


/*
@route 			POST api/pages/createnewpage (create new page)
@description 	Create a new page.
@access 		Private (auth needed).
*/
router.post('/createnewpage', auth, pageController.createNewPage);


/*
@route 			DELETE api/pages/deleteonepage/:id
@description 	Delete a single page with given id.
@access 		Private (auth needed).
*/
router.delete('/deleteonepage/:id', auth, pageController.deleteOnePage);


/*
@route 			PUT api/pages/updateonepage/:id
@description 	Update a single page with given id.
@access 		Private (auth needed).
*/
router.put('/updateonepage/:id', auth, pageController.updateOnePage);


module.exports = router;