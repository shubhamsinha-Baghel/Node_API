const mongoose = require('mongoose');
const express = require('express');
const Joi = require('@hapi/joi');

//const { User, validate } = require('../models/post.model');
const Favourite = mongoose.model('Favourite', new mongoose.Schema({
    likes: {
        type: Number,
        required: true,
       
         } 
}));
function validadata(post) {
    const schema = {
        likes: Joi.number().positive().required()
     
       
    };
    return Joi.validate(post, schema);
}
exports.Favourite=Favourite;
exports.validadata=validadata;
