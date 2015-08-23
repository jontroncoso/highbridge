'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Beer Schema
 */
var BeerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    bar: {
        type: String,
        required: true,
        trim: true
    },
    beerType: {
        type: String,
        required: true,
        trim: true
    },
    abv: {
        type: Number, // stored in 1/100 percent. so 5% = 500
        requires: false,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    drinks: {
        type: Array
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
}, {

    toObject: {
        virtuals: true
    }
    ,toJSON: {
        virtuals: true
    }
});

/**
 * Validations
 */
BeerSchema.path('name').validate(function(name) {
    return !!name;
}, 'Title cannot be blank');

BeerSchema.path('bar').validate(function(bar) {
    return !!bar;
}, 'Brewery/Bar cannot be blank');

BeerSchema.path('beerType').validate(function(type) {
    return !!type;
}, 'Brewery/Bar cannot be blank');

/**
 * Statics
 */
BeerSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};
BeerSchema.virtual('alcohol').get(function () {
    return this.abv/100;
}).set(function(abv){
    this.set('abv', abv*100);
});
mongoose.model('Beer', BeerSchema);
