let ProductModel = require('../models/product.model')
let express = require('express')
let router = express.Router();


router.post('/product', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }



    let model = new ProductModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/product', (req, res) => {
    
    res.status(200).send('Get Request hit...').json();
    // console.log('product list');
})

module.exports = router