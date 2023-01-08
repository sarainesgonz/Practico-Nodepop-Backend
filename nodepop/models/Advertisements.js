'use strict';

const mongoose= require('mongoose');

const adsSchema = mongoose.Schema({ 
    name : String,
    forSale : Boolean,
    price : Number,
    photo : String,
    tags : [String]
});

adsSchema.statics.list = function(filter, skip, limit, fields, sort) {
    const query = Advertisements.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec()
}

adsSchema.statics.getTags = function() {
    const query = Advertisements.find({}).distinct('tags');
    return query.exec()
}


const Advertisements = mongoose.model('Advertisements', adsSchema);


module.exports = Advertisements;

