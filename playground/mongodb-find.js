// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb'); // Object destructuring, new in ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database server');
    }

    console.log('Connected to MongoDB server');

    // find() returns a MongoDB cursor (pointer), toArray() returns a promise
    // db.collection('Todos').find({ 
    //     _id: new ObjectID('5aa08355cc72773f59b4ce04')
    // }).toArray().then( (docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });  

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });
    
    db.collection('Users').find({name: 'Victor'}).toArray().then((docs) => {
        console.log('Users whose first name is Victor');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch user', err);
    });


    // db.close();
});