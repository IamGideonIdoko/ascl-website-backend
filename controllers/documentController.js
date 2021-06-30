const Document = require('../models/Document');

exports.addNewDocument = (req, res) => {
    const {name, url, size, file_type, author_username} = req.body;

    //check if required fields have value
    if (!name || !url || !size || !file_type || !author_username) {
        return res
            .status(400)
            .json({message: 'Please, enter all fields.'});
    }

    //Check for existing document in that model through email
    Document
        .findOne({name})
        .then(document => {
            if (document) {
                return res
                    .status(404)
                    .json({message: 'Document with the same name already exists.'})
            } else {
                //create new document from the model
                const newDocument = new Document({
                    name,
                    url,
                    size,
                    file_type,
                    author_username,
                });

                newDocument
                    .save()
                    .then(asset => {
                        const {
                            id,
                            name,
                            url,
                            size,
                            file_type,
                            author_username,
                            created_at
                        } = asset;

                        res.json({
                            asset: {
                                id,
                                name,
                                url,
                                size,
                                file_type,
                                author_username,
                                created_at
                            }
                        })
                    });
            }
        })

}

exports.getAllDocuments = (req, res) => {
	Document.find() //get all the photos in the db
		.sort({ created_at: -1 })
		.then(assets => res.json(assets))
		.catch(err => console.log(err));
}

exports.deleteOneDocument = (req, res) => {
	//find the photo by the given name
	Document.findById(req.params.id)
		.then(asset => asset.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
}