// import User model
const User = require('./user');
// import Post model
const Post = require('./post');
// import Comment model
const Comment = require('./comment');

// User hasMany Post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// User hasMany Comment
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Post belongsTo User
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// Post hasMany Comment
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment belongsTo Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// export module as User, Post and Comment
module.exports = { User, Post, Comment };