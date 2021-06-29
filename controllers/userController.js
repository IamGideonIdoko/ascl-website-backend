const User = require('../models/User');
const Access = require('../models/Access');
const config = require('../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerNewUser = (req, res) => {
	
	const { username, password, retype_password, access_name, access_key } = req.body;

	//check if all input fields have value
	if(!username || !password || !retype_password || !access_name || !access_key) {
		return res.status(400).json({ message: 'Please, enter all fields.' });
	}

	if(password !== retype_password) {
		return res.status(400).json({ message: 'Passwords must be same.'});
	}

	// validate to see if the access name and key is original

	// check for existing user with username
	Access.findOne({ access_name })
		.then(access => {
			if(!access) {
				// the access does not exist
				return res.status(404).json({ message: 'You do not have access.'})
			} else {
				// the access name exists

				// validate the access name provided
				bcrypt.compare(access_key, access.access_key)
					.then(isMatch => {
						// if the access_key doesn't match
						if(!isMatch) return res.status(400).json({ message: 'Invalid Access credentials.' });
						// get the is_valid property
						const { is_valid } = access;
						
						//access key matches

						//check if the access is still valid (as access can only be used once)

						if (!is_valid) {
							return res.status(400).json({ message: 'This access is no longer valid' });
						} else {

							//Check for existing user in that model through password
							User.findOne({ username })
								.then(user => {
									if(user) {
										return res.status(404).json({ message: 'User already exists.'})
									} else {
										//create new user from the model
										const newUser = new User({
											username,
											password
										});

										//hash password using bcrypt
										bcrypt.genSalt(10, (err, salt) => {
											bcrypt.hash(newUser.password, salt, (err, hash) => {
												if(err) throw err;
												newUser.password = hash;

												Access.updateOne({ access_name }, { is_valid: false })
													.then(updatedAccess => {
														if (updatedAccess) {
															//add new user to the db
															newUser.save()
															.then(user => {
															const { id, username, created_at } = user;
															jwt.sign(
																{ id }, //signs the user id as payload
																config.jwtSecret, //jwt secret
																{ expiresIn: 21600 }, //token to expire in 5 or 6hrs
																(err, token) => { //callback
																	if (err) throw err;
																	res.json({
																		token,
																		user: {
																			id,
																			username,
																			created_at
																		}
																	})
																}
																)
															});
													}
													});
											})
										})
									}
								})

						}
					});
			}
		});
}
