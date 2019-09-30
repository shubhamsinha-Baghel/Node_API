const mongoose = require('mongoose');
const express = require('express');
const Joi = require('@hapi/joi');

//const { User, validate } = require('../models/post.model');
const Post = mongoose.model('Post', new mongoose.Schema({
    postdescription: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    title:{
        type: String,
        required:true,
        minlength: 5,
        maxlength: 20
    },
    group:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    }
    
  
}));
function validatePost(post) {
    const schema = {
        postdescription: Joi.string().min(5).max(50).required(),
        title: Joi.string().min(5).max(20).required(),
        group: Joi.string().min(5).max(15).required(),
    };
    return Joi.validate(post, schema);
}
exports.Post=Post;
exports.validadata=validatePost;
