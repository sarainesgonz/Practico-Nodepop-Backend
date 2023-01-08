'use strict';

const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Advertisements = require('../../models/Advertisements');

// CRUD 
// GET api/advertisements
router.get('/', async (req, res, next) => {
    try { 
        const name = req.query.name;
        const sort = req.query.sort;
        const forSale = req.query.forSale;
        const tags = req.query.tags;
        const price = req.query.price;
        const fields = req.query.fields || { __v: 0}; 
        const skip = req.query.skip;  
        const limit = req.query.limit;

        const filter = {}
        if (name) {
            filter.name = new RegExp('^' + req.query.name, "i");  //api/advertisements?name=t
        }

        if (forSale === "true") {   //api/advertisements?forSale=false
            filter.forSale = true;
        } else if (forSale === "false"){
            filter.forSale = false;
        }

        if(tags) { //api/advertisements?tags=motor
            filter.tags = { $in: [tags]}
        }

        if (price) { //api/advertisements?price=300&price=1000
            filter.price = { $gte: req.query.price[0], $lte: req.query.price[1] }
        } 

    
        const adsResults = await Advertisements.list(filter,skip, limit, fields, sort);
        res.json({ results : adsResults });

    } catch(err) {
        next(err)
    }  
})



//GET api/advertisements/tags
router.get('/tags', async (req, res, next) => {
    try {
        const tags = await Advertisements.getTags();
        res.json({results: tags}) 
    } catch(err) {
        next(err)
    }
})

// POST api/advertisements
router.post('/',async (req, res,next) => {
    try {
        const adInfo = req.body;
        const newAd = new Advertisements(adInfo);
        const savedAd = await newAd.save()

        res.json( { result : savedAd })
    } catch (err) {
        next(err)
    }
})

// PUT api/advertisements/63ba964ff5fa31c96b2b3608
router.put('/:id', async (req, res, next) => {
    try {
    const id = req.params.id;
    const adInfo = req.body;
    const adUpdate = await Advertisements.findOneAndUpdate({ _id: id}, adInfo, { new:true});

    res.json({result: adUpdate});

    } catch (err) {
        next(err);
    }
})

//DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const ad = await Advertisements.findById(id);

        if(!ad) { 
            next(createError(404));
            return
        }
  
        await Advertisements.deleteOne({ _id : id});

        res.json();
    } catch (err) {
        next(err);
    }
})


module.exports = router;