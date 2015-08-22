'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Beers = new Module('beers');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Beers.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Beers.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  //Beers.menus.add({
  //  title: 'beers example page',
  //  link: 'beers example page',
  //  roles: ['authenticated'],
  //  menu: 'main'
  //});
  
  Beers.aggregateAsset('css', 'beers.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Beers.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Beers.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Beers.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Beers;
});
