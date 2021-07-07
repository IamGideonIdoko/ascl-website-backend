const Page = require('../models/Page');
const User = require('../models/User');
const {strToSlug} = require('../helper');

/*
@description 	Fetch all available pages.
*/
exports.fetchAllPages = (req, res) => {
    Page
        .find()
        .sort({created_at: -1})
        .then(pages => res.json(pages))
        .catch(err => console.log(err));
}

/*
@description 	Create a new page.
*/
exports.createNewPage = (req, res) => {
    const {title, slug, cover_img, author_username, body, category} = req.body;

    //quick validation
    if (!title || !slug || !cover_img || !author_username || !body || !category) {
        return res
            .status(400)
            .json({message: "All fields are required."});
    }

    if (category !== "news" && category !== "press-release") {
        return res.status(400).json({message: 'Page category not accepted'});
    } 

    Page
        .findOne({title})
        .then(page => {
            if (page) {
                return res
                    .status(400)
                    .json({message: "page with the same title already exists and titles must be unique.", errorType: "TITLE_ALREADY_EXISTS"});
            } else {

                User
                    .findOne({username: author_username})
                    .then(user => {
                        if (!user) {
                            return res
                                .status(400)
                                .json({message: "User does not exist or is not an admin."})
                        }

                        //create a new page from the model
                        const newPage = new Page({title, slug: strToSlug(slug), cover_img, author_username: user.username, body, category});

                        //add new page to the db
                        newPage
                            .save()
                            .then(newPage => res.json(newPage));
                    })
            }
        });
}

/*
@description 	Delete a single page with given id.
*/
exports.deleteOnePage = (req, res) => {
    const {id} = req.params;
    Page
        .findById(id)
        .then(page => post.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
}

/*
@description 	Update a single page with given id.
*/
exports.updateOnePage = (req, res) => {
    const {id} = req.params;
    Page.findByIdAndUpdate(id, req.body, {
        new: true
    }, (err, data) => {
        if (err) 
            return res.status(404).json({success: false});
        res.json(data);
    })
}
