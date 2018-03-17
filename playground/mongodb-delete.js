// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb'); // Object destructuring, new in ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database server');
    }

    console.log('Connected to MongoDB server');

    // methods to be used: 
    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({name: 'Victor'}).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5aad5999754f2278dcda71cb')}).then((result) => {
        console.log(result);
    });



    // db.close();
});