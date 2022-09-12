// use Router() from express module
const router = require('express').Router();
// import User, Post and Comment models
const { User, Post, Comment } = require('../../models');

// GET all users FindAll from User model
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    // save to json
    .then(userDataDB => res.json(userDataDB))
    // catch error 500
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET user by ID FindOne from User model
router.get('/', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'comment_text', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }]
    })
    // save to json
    .then(userDataDB => {
        if (!userDataDB) {
            res.status(404).json({
                message: 'Error: User ID not found'
            });
            return;
        }
        res.json(userDataDB);
    })
    // catch error 500
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST Create new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userDataDB => {
        req.session.save(() =>{
            req.session.user_id = userDataDB.id;
            req.session.username = userDataDB.username;
            req.session.loggedIn = true;

            res.json(userDataDB);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })

// POST route Session Log In 
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(userDataDB => {
        if(!userDataDB) {
            res.status(400).json({
                message: 'Error: User Id not found'
            });
            return;
        }
        req.session.user_id = userDataDB.id;
        req.session.username = userDataDB.username;
        req.session.loggedIn = true;

        res.json({
            user: userDataDB,
            message: 'Success: Logged In as a User'
        });
    });

    // Validate password
    const validatePwd = userDataDB.checkPassword(req.body.password);

    if(!validatePwd) {
        res.status(400).json({
            message: 'Error: Password is incorrect. Please try again with valid password'
        });
        return;
    }

    req.session.save(() => {
        req.session.user_id = userDataDB.id;
        req.session.username = userDataDB.username;
        req.session.loggedIn = true;

        res.json({
            user: userDataDB,
            message: 'Success: Logged In as a User'
            });
        });
    });
});

// POST route Session Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

// export module as router
module.exports = router;



