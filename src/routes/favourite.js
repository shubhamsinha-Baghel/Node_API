let express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Favourite, validadata } = require('../models/favourite.model');
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validadata(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let favourite = await Favourite.findOne({ likes: req.body.likes});
    if (favourite) {
        return res.status(400).send('Likes is already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        favourite = new Favourite({
            likes: req.body.likes,
          
        });
        await favourite.save();
        res.send(favourite);
    }
});

//GET call for likes http://localhost:3000/api/favourite/getfav
router.get('/getfav',async (req,res) =>{
    Favourite.find({}).then(eachone =>{
        res.json(eachone)
    })
})
module.exports = router;