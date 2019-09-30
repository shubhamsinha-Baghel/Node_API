const Joi = require('joi');
const express = require('express');
const { User, validate } = require('../models/user.model');


const router = express.Router();


router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role:req.body.role

        });
        await user.save();
        res.send(user);
    }
});
//GET call for users 
router.get('/getusers',async(req,res)=>{
// User.find({},{email:true}).then(eachone =>{
//     res.json(eachone)
// })
User.find({},{email:true,role:true}).then(eachone =>{
    res.json(eachone)
})
})
 
module.exports = router;