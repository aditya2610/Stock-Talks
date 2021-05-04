const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = function(req,res) {
    Post.find({}).populate('user').exec(function(err,post){
        return res.render('home',{
            post:post,
            title:'Codeial | home'
        });
    });
    
};