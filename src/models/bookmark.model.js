const mongoose = require('mongoose');
const express = require('express');
const Joi = require('@hapi/joi');
const Bookmark = mongoose.model('Bookmark', new mongoose.Schema({
    bookmark: {
        type: Number,
        required: true,
           },
          
}));
function validatePost(post) {
    const schema = {
        bookmark: Joi.number().positive().required()
        
    };
    return Joi.validate(post, schema);
}
exports.Bookmark=Bookmark;
exports.validadata=validatePost;
