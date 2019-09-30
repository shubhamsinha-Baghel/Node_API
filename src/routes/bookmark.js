let express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Bookmark, validadata } = require('../models/bookmark.model');
//POST call http://localhost:3000/api/bookmark/
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validadata(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let bookmark = await Bookmark.findOne({ bookmark: req.body.bookmark});
    if (bookmark) {
        return res.status(400).send('Likes is already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        bookmark = new Bookmark({
            bookmark: req.body.bookmark,
          
        });
        await bookmark.save();
        res.send(bookmark);
    }
});

//GET call http://localhost:3000/api/bookmark/
router.get('/',async(req,res)=>{
    Bookmark.find({}).then(eachone =>{
        res.json(eachone)
    })
})

module.exports = router;