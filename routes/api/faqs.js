const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const faqController = require('../../controllers/faqController');


/*
@route 			GET api/faqs/fetchallfaqs (fetch all faqs)
@description 	Get all available faqs.
@access 		Public.
*/
router.get('/fetchallfaqs', faqController.fetchAllFaqs);


/*
@route 			POST api/faqs/createnewfaq (create new faq)
@description 	Create a new faq.
@access 		Private (auth needed).
*/
router.post('/createnewfaq', auth, faqController.createNewFaq);


/*
@route 			DELETE api/faqs/deleteonefaq/:id
@description 	Delete a single faq with given id.
@access 		Private (auth needed).
*/
router.delete('/deleteonefaq/:id', auth, faqController.deleteOneFaq);


/*
@route 			PUT api/faqs/updateonefaq/:id
@description 	Update a single faq with given id.
@access 		Private (auth needed).
*/
router.put('/updateonefaq/:id', auth, faqController.updateOneFaq);


module.exports = router;