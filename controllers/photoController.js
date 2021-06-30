const Photo = require('../models/Photos');

exports.addNewPhoto = (req, res) => {
    const {name, url, size, file_type, author_username} = req.body;

    //check if required fields have value
    if (!name || !url || !size || !file_type || !author_username) {
        return res
            .status(400)
            .json({message: 'Please, enter all fields.'});
    }

    //Check for existing user in that model through email
    Photo
        .findOne({name})
        .then(photo => {
            if (photo) {
                return res
                    .status(404)
                    .json({message: 'Photo with the same name already exists.'})
            } else {
                //create new photo from the model
                const newPhoto = new Photo({
                    name,
                    url,
                    size,
                    file_type,
                    author_username,
                });

                newPhoto
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

exports.getAllPhotos = (req, res) => {
	Photo.find() //get all the photos in the db
		.sort({ created_at: -1 })
		.then(assets => res.json(assets))
		.catch(err => console.log(err));
}

exports.deleteOnePhoto = (req, res) => {
	//find the photo by the given name
	Photo.findById(req.params.id)
		.then(asset => asset.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
}