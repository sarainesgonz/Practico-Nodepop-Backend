'use strict';

const express = require('express');
const path = require('path');
const router = express.Router();

// GET   images/tablet.jpg
router.get('/images/:photo', (req, res, next) => {
    try {
        const photo = req.params.photo;
        const photoPath = path.join(__filename, `../public/images/${photo}`);
        res.sendFile(photoPath)
    } catch (err) {
        next(err)
    }  
})

module.exports = router;