const Access = require('../models/Access');
const User = require('../models/User');
const config = require('../config/keys');
const bcrypt = require('bcryptjs');


/*
@description 	Fetch all available accesses.
*/
exports.fetchAllAccesses = (req, res) => {
    Access
        .find()
        .select('-access_key')
        .sort({created_at: -1})
        .then(accesses => res.json(accesses))
        .catch(err => console.log(err));
}


exports.createNewAccess = (req, res) => {

    const {access_name, access_key, created_by} = req.body;

    //check if all input fields have value
    if (!access_name || !access_key || !created_by) {
        return res
            .status(400)
            .json({message: 'Please, enter all fields.'});
    }

    // check if the creator of the key is really a user
    User
        .findOne({username: created_by})
        .then(user => {
            if (user) {
                //Check for existing access using the access_name provided
                Access
                    .findOne({access_name})
                    .then(gottenAccess => {
                        if (gottenAccess) {
                            return res
                                .status(404)
                                .json({message: 'Access already exists.'})
                        } else {
                            //create new Access from the model
                            const newAccess = new Access({access_name, access_key, created_by});

                            //hash access_key using bcrypt
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newAccess.access_key, salt, (err, hash) => {
                                    if (err) 
                                        throw err;
                                    
                                    //reassign the access_key to its hashed version
                                    newAccess.access_key = hash;

                                    //add new Access to the db
                                    newAccess
                                        .save()
                                        .then(access => {
                                            const {id, access_name, created_by, is_valid, created_at} = access;
                                            res.json({
                                                id,
                                                access_name,
                                                created_by,
                                                is_valid,
                                                created_at
                                            });
                                        });
                                })
                            })
                        }
                    })

            } else {
                return res
                    .status(404)
                    .json({message: 'Creator does not exists.'})
            }
        });

}


/*
@description 	Delete a single access with given id.
*/
exports.deleteOneAccess = (req, res) => {
    const {id} = req.params;
    Access
        .findById(id)
        .then(page => page.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
}
