const Gallery = require('../models/Gallery');

/*
@description 	Fetch all available galleries.
*/
exports.fetchAllGalleries = (req, res) => {
    Gallery
        .find()
        .sort({created_at: -1})
        .then(galleries => res.json(galleries))
        .catch(err => console.log(err));
}

/*
@description 	Create a new gallery.
*/
exports.createNewGallery = (req, res) => {
    const {
        caption,
        cover_img
    } = req.body;

    //quick validation
    if (!caption || !cover_img) {
        return res
            .status(400)
            .json({message: "All fields are required."});
    }

    //create a new gallery from the model
    const newGallery = new Gallery({
        caption,
        cover_img
    });

    //add new gallery to the db
    newGallery
        .save()
        .then(newGallery => res.json(newGallery));
}

/*
@description 	Delete a single gallery with given id.
*/
exports.deleteOneGallery = (req, res) => {
    const {id} = req.params;
    Gallery
        .findById(id)
        .then(gallery => gallery.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
}

/*
@description 	Update a single gallery with given id.
*/
exports.updateOneGallery = (req, res) => {
    const {id} = req.params;
    Gallery.findByIdAndUpdate(id, req.body, {
        new: true
    }, (err, data) => {
        if (err) 
            return res.status(404).json({success: false});
        res.json(data);
    })
}
