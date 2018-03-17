var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // make it use Promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

// creating a Mongoose Model
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// let todoItem = new Todo({
//     text: '   Edit this video   '
// });

// todoItem.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Error: could not save todo');
// });

// User model 
// email - require it, trim it and type should be string with min length 1
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

let newUser = new User({
    email: 'victor2142@gmail.com'
});

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to save user', e);
});


