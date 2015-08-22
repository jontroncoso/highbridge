'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Beers, app, auth, database) {

  //app.get('/api/beers/example/anyone', function(req, res, next) {
  //  res.send('Anyone can access this');
  //});
  //
  //app.get('/api/beers/example/auth', auth.requiresLogin, function(req, res, next) {
  //  res.send('Only authenticated users can access this');
  //});
  //
  //app.get('/api/beers/example/admin', auth.requiresAdmin, function(req, res, next) {
  //  res.send('Only users with Admin role can access this');
  //});
  //
  //app.get('/api/beers/example/render', function(req, res, next) {
  //  Beers.render('index', {
  //    package: 'beers'
  //  }, function(err, html) {
  //    //Rendering a view from the Package server/views
  //    res.send(html);
  //  });
  //});


  var beers = require('../controllers/beers')(Beers);

  // Article authorization helpers
  var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && !req.beer.user._id.equals(req.user._id)) {
      return res.status(401).send('User is not authorized');
    }
    next();
  };

  var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.beer.allowed.indexOf(permission) === -1) {
        return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
      };
    };

    next();
  };


  app.route('/api/beers')
      .get(beers.all)
      .post(auth.requiresLogin, beers.create);
  app.route('/api/beers/:beerId')
      .get(auth.isMongoId, beers.show)
      .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, beers.update)
      .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, beers.destroy);

  // Finish with setting up the beerId param
  app.param('beerId', beers.beer);

};
