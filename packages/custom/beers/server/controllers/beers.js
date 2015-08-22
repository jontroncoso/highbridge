'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Beer = mongoose.model('Beer'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Beers) {

    return {
        /**
         * Find beer by id
         */
        beer: function(req, res, next, id) {
            Beer.load(id, function(err, beer) {
                if (err) return next(err);
                if (!beer) return next(new Error('Failed to load beer ' + id));
                req.beer = beer;
                next();
            });
        },
        /**
         * Create a beer
         */
        create: function(req, res) {
            console.log('Hey Fuck Face!'.green);
            var beer = new Beer(req.body);
            beer.user = req.user;
            console.log(beer);


            beer.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Cannot save the beer'
                    });
                }

                Beers.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/beers/' + beer._id,
                    name: beer.title
                });

                res.json(beer);
            });
        },
        /**
         * Update an beer
         */
        update: function(req, res) {
            var beer = req.beer;
            console.log('BEER!');
            console.log(beer);
            beer = _.extend(beer, req.body);
            //console.log('beer: %o', beer);


            beer.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the beer'
                    });
                }

                Beers.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: beer.title,
                    url: config.hostname + '/beers/' + beer._id
                });

                res.json(beer);
            });
        },
        /**
         * Delete an beer
         */
        destroy: function(req, res) {
            var beer = req.beer;


            beer.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the beer'
                    });
                }

                Beers.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: beer.title
                });

                res.json(beer);
            });
        },
        /**
         * Show an beer
         */
        show: function(req, res) {

            Beers.events.publish({
                action: 'view',
                user: {
                    name: req.user.name
                },
                name: req.beer.title,
                url: config.hostname + '/beers/' + req.beer._id
            });

            res.json(req.beer);
        },
        /**
         * List of Beers
         */
        all: function(req, res) {
            //var query = req.acl.query('Beer');

            Beer.find({'user': req.user}).sort('-created').populate('user', 'name username').exec(function(err, beers) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the beers'
                    });
                }

                console.log('beers: %o', beers);
                console.log(JSON.stringify(beers));

                res.json(beers)
            });

        }
    };
}