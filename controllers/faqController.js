const Faq = require('../models/Faq');

/*
@description 	Fetch all available faqs.
*/
exports.fetchAllFaqs = (req, res) => {
    Faq
        .find()
        .sort({created_at: -1})
        .then(faqs => res.json(faqs))
        .catch(err => console.log(err));
}

/*
@description 	Create a new faq.
*/
exports.createNewFaq = (req, res) => {
    const {
        question,
        answer
    } = req.body;

    //quick validation
    if (!question || !answer) {
        return res
            .status(400)
            .json({message: "All fields are required."});
    }

    //create a new faq from the model
    const newFaq = new Faq({
        question,
        answer
    });

    //add new faq to the db
    newFaq
        .save()
        .then(newFaq => res.json(newFaq));
}

/*
@description 	Delete a single faq with given id.
*/
exports.deleteOneFaq = (req, res) => {
    const {id} = req.params;
    Faq
        .findById(id)
        .then(faq => faq.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
}

/*
@description 	Update a single faq with given id.
*/
exports.updateOneFaq = (req, res) => {
    const {id} = req.params;
    Faq.findByIdAndUpdate(id, req.body, {
        new: true
    }, (err, data) => {
        if (err) 
            return res.status(404).json({success: false});
        res.json(data);
    })
}
