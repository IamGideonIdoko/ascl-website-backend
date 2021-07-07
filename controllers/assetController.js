const Asset = require('../models/Asset');

exports.addNewAsset = (req, res) => {
    const {name, url, size, file_type, author_username, category} = req.body;

    //check if required fields have value
    if (!name || !url || !size || !file_type || !author_username || !category) {
        return res
            .status(400)
            .json({message: 'Please, enter all fields.'});
    }

    if (category !== "photo" && category !== "video" && category !== "document") {
        return res.status(400).json({message: 'File category not accepted'});
    } 

    //Check for existing user in that model through email
    Asset
        .findOne({name})
        .then(asset => {
            if (asset) {
                return res
                    .status(404)
                    .json({message: 'Asset with the same name already exists.'})
            } else {
                //create new asset from the model
                const newAsset = new Asset({
                    name,
                    url,
                    size,
                    file_type,
                    author_username,
                    category
                });

                newAsset
                    .save()
                    .then(asset => res.json(asset));
            }
        })

}

exports.getAllAssets = (req, res) => {
	Asset.find() //get all the assets in the db
		.sort({ created_at: -1 })
		.then(assets => res.json(assets))
		.catch(err => console.log(err));
}

exports.deleteOneAsset = (req, res) => {
	//find the asset by the given id
	Asset.findById(req.params.id)
		.then(asset => asset.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
}