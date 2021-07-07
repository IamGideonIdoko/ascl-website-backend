const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { route } = require('./blogposts');
const pageController = require('../../controllers/pageController');


/*
@route 			GET api/pages/fetchallpages (fetch all pages)
@description 	Get all available pages.
@access 		Public.
*/
router.get('/fetchallpages', pageController.fetchAllPages);


/*
@route 			POST api/pages/addnewpage (add new page)
@description 	Create a new page.
@access 		Private (auth needed).
*/
router.post('/addnewpage', auth, pageController.createBlogPost);


/*
@route 			DELETE api/deleteonepage/:id
@description 	Delete a single page with given id.
@access 		Private (auth needed).
*/
router.delete('/deleteonepage/:id', auth, pageController.deleteOnePost);



/*
@route 			PUT api/blogposts/updateonepage/:id
@description 	update a single page with given id.
@access 		Private (auth needed).
*/
router.put('/updateonepage/:id', auth, pageController.updateOnePost);


module.exports = router;