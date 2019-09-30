let express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Post, validadata } = require('../models/post.model');

//http://localhost:3000/api/post/
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validadata(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let post = await Post.findOne({ postdescription: req.body.postdescription});
    if (post) {
        return res.status(400).send('Post is already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        post = new Post({
            postdescription: req.body.postdescription,
            title:req.body.title,
            group:req.body.group

        });
        await post.save();
        res.send(post);
    }
});

//GET call for requesting Post List data
//http://localhost:3000/api/post/getdata 
router.get('/getdata', (req, res) => {
    Post.find({}).then(eachone =>{
        res.json(eachone)
    })
 })

module.exports = router;