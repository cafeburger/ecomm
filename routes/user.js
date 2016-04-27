var router = require("express").Router();
var User = require("../models/user");


router.get('/signup', function(req, res, next) {
  //console.log('signup errors=');

  res.render('accounts/signup', {
    errors: req.flash('errors'),
    test: "1234"
  });


});

router.post('/signup', function(req, res, next) {
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({
    email: req.body.email
  }, function(err, existingUser) {
    if (existingUser) {
      req.flash('errors', 'Account with that email address alreay exists!');
      console.log(req.body.email + " is already exist");
      return res.redirect('/signup');
    }
    else {
      user.save(function(err) {
        if (err) return next(err);
        //  res.json('New user has been created!');
        return res.redirect('/');
      });
    }
  });
});

module.exports = router;