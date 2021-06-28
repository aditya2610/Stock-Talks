 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;

 const User = require('../models/user');

//authentication using passport
 passport.use(new LocalStrategy({
     usernameField:'email',
     passReqToCallback : true
    },
    function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error', err);
            return done(err);
        }
        if (!user || user.password != password){
            req.flash('error','Invalid UserName/Password');
            return done(null,false);
        }
        return done(null,user);
        
    });
 }
 
 ));


//serializing the user to decide which keys is to be kept in cookies
 passport.serializeUser(function(user,done){
    done(null,user.id);
 });



 //deserializing the user from the keys in the cookies
 passport.deserializeUser(function(id,done){
     User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);

        }
        return done(null,user);
     });
 });



 //check authentication

 passport.checkAuthentication = function(req,res,next){
     // if user is signed in,pass on the request to the next function(controller action)
     if (req.isAuthenticated()){
         return next();
     }

     //if the user is not signed in
     return res.redirect('./sign-in');
 }


 passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        //req.user contains the current signed in user and we are sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
 }

 module.exports = passport;