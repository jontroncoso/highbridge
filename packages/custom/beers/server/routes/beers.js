'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Beers, app, auth, database) {

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


  // Facebook
  app.get('/auth/facebook',
      passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/login', scope: ['email'] }), beers.facebook);

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
