const MgmtProfile = require('../models/MgmtProfile');
const {strToSlug} = require('../helper');

/*
@description 	Fetch all available mgmtprofiles.
*/
exports.fetchAllMgmtProfiles = (req, res) => {
    MgmtProfile
        .find()
        .sort({created_at: -1})
        .then(mgmtprofiles => res.json(mgmtprofiles))
        .catch(err => console.log(err));
}

/*
@description 	Create a new mgmtprofile.
*/
exports.createNewMgmtProfile = (req, res) => {
    const {
        position,
        name,
        slug,
        photo,
        about,
        position_level
    } = req.body;

    //quick validation
    if (!position || !name || !slug || !photo || !about || !position_level) {
        return res
            .status(400)
            .json({message: "All fields are required."});
    }

    MgmtProfile
        .findOne({position})
        .then(mgmtprofile => {
            if (mgmtprofile) {
                return res
                    .status(400)
                    .json({message: "mgmtprofile with the same position already exists and positions must be unique.", errorType: "TITLE_ALREADY_EXISTS"});
            } else {

                //create a new mgmtprofile from the model
                const newMgmtProfile = new MgmtProfile({
                    position,
                    name,
                    slug: strToSlug(slug),
                    photo,
                    about,
                    position_level
                });

                //add new mgmtprofile to the db
                newMgmtProfile
                    .save()
                    .then(newMgmtProfile => res.json(newMgmtProfile));
            }
        });
}

/*
@description 	Delete a single mgmtprofile with given id.
*/
exports.deleteOneMgmtProfile = (req, res) => {
    const {id} = req.params;
    MgmtProfile
        .findById(id)
        .then(mgmtprofile => mgmtprofile.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
}

/*
@description 	Update a single mgmtprofile with given id.
*/
exports.updateOneMgmtProfile = (req, res) => {
    const {id} = req.params;
    MgmtProfile.findByIdAndUpdate(id, req.body, {
        new: true
    }, (err, data) => {
        if (err) 
            return res.status(404).json({success: false});
        res.json(data);
    })
}
