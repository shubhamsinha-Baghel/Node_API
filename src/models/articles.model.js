const mongoose = require('mongoose');
const express = require('express');
const Joi = require('@hapi/joi');
const Articles = mongoose.model('Articles', new mongoose.Schema({
    postedby: {
        type: String,
        required: true,
        maxlength:10
           },
    postdate:{
        type:Date,
        default:Date.now,
  
    }
          
}));
function validatePost(post) {
    const schema = {
        postedby: Joi.string().max(10).required(),
        postdate:Joi.date().max('now').required()
        
    };
    return Joi.validate(post, schema);
}
exports.Articles=Articles;
exports.validadata=validatePost;
