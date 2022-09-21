// use Router() from express module
const router = require('express').Router();
// import User, Post and Comment models
const { User, Post, Comment } = require('../../models');
// require sequelize from config
const sequelize = require('../../config/connection');
// import userAuthentication from utils
const userAuth = require('../../utils/userAuth');

// GET all Posts FindAll from Post model using userAuth
router.get('/', userAuth, (req, res) => {
    Post.findAll({
        attributes: [ 'id', 'postText', 'title', 'created_at'],
        include: [{
            model: Comment,
            attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    // save to json
    .then(postDataDB => res.json(postDataDB))
    // catch error 500
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET Post by ID FindOne from Post model
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [ 'id', 'postText', 'title', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'post_id', 'user_id', 'comment_text', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    // save to json
    .then(postDataDB => {
        if (!postDataDB) {
            res.status(404).json({
                message: 'Error: Post ID not found'
            });
            return;
        }
        res.json(postDataDB);
    })
    // catch error 500
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST Create new Post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        postText: req.body.postText,
        user_id: req.session.user_id
    })
    .then(userDataDB => {
        res.json(userDataDB);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT route to updated Post with /:id
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            postText: req.body.postText,
        },
    )
})

// export module as router
module.exports = router;



