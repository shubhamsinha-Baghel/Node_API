let express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Articles, validadata } = require('../models/articles.model');
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validadata(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let articles = await Articles.findOne({ postedby: req.body.postedby});
    if (articles) {
        return res.status(400).send('postby is already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        articles = new Articles({
            postedby: req.body.postedby,
            postdate:req.body.postdate
          
        });
        await articles.save();
        res.send(articles);
    }
});

router.get('/',async(req,res)=>{
    Articles.find({}).then(data =>{
        res.json(data)
    })
})
module.exports=router;