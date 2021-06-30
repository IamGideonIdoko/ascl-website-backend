const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const documentController = require('../../controllers/documentController');


/*
@route          POST api/documents/addnewdocument (add new document)
@description    Add a new document.
@access         Private
*/
router.post('/addnewdocument', auth, documentController.addNewDocument);

/*
@route          GET api/documents/getalldocuments (get all documents)
@description    Get all documents.
@access         Public
*/
router.get('/getalldocuments', documentController.getAllDocuments);

/*
@route          POST api/documents/deleteonedocument/:id (delete one document)
@description    Delete a document.
@access         Private
*/
router.delete('/deleteonedocument/:id', auth, documentController.deleteOneDocument);


module.exports = router;
