const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({query}) removes multiple entries
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({}) remove the first match and returns object
// Todo.findByIdAndRemove(id) remove the note matching the id and returns it

Todo.findOneAndRemove({_id: "5ac142b4fe694f6221eb891d"}).then((todo) => {
    // callback
});

Todo.findByIdAndRemove('5ac142b4fe694f6221eb891d').then((todo) => {
    console.log(todo);
});