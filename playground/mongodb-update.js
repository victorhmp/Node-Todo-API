// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb'); // Object destructuring, new in ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5aad63a61d84466699a9d749")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate( {name: 'Jen'}, 
        {
            $set: {
                name: 'Victor'
            },
            $inc: {
                age: +1
            }
        },
    {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    // db.close();
});