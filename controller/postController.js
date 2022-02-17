const PostModel = require('../model/Post');

exports.newPost = async function(req, res, next) {   
    PostModel.create(req.body, (err, post) => {
        if (err) return res.redirect('/')
        if (post) {
            res.redirect('/')
        }
    })
}

exports.getPostById = async function(req, res, next) {
    PostModel.findById(req.params.id, function(error, detailPost) {
        res.render('post', { detailPost });
    })
}

exports.deletePostById = async function(req, res, next) {
    PostModel.findByIdAndDelete(req.params.id, function(error) {
        res.redirect('/');
    })
}

exports.editPostById = async function (req,res,next){
    PostModel.findById(req.params.id, function(error, detailPost) {
        res.render('create', { detailPost });
    })
}

exports.updatePostByID = async function (req,res,next) {    
    PostModel.findOneAndUpdate(req.body.idPost,req.body,(error, result)=>{
        if (error) 
            console.log(error);
        PostModel.findById(req.body.idPost, function(error, detailPost) {
            res.render('post', { detailPost });
        })
    });
}