//CRUD creat  Read Updatae and Delete

// const mongodb = require('mongodb');
// //this will let us comunicate with mongo database
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { ObjectID, MongoClient } = require('mongodb');


//by putting the IP address(127.0.0.1), the page runs faster than with localhost:
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//connecting to data base
//3 arguments: the url, specifying that the parser should be used, and then, there is a callback
//behind the scenes, there are multiple connections and this will help when making a lot of operations
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("error while connecting to database");
    }
    //this takes the name of the db you want to manipulate
    //this returns a database referenced that will be saved to the variable db
    //we will use db to manipulate database
    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({ description: 'Go to the gym' }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err);
    })

    //<------------------------- UPDATING DATA ------------------------------>
    //  db.collection('users').updateOne({ _id: new ObjectID('6061ebfd2549696b6db42228') }, {
    //         $set: {
    //             name: "Asdrubal"
    //         }
    //     }).then((status) => {
    //         console.log(status);
    //     }).catch(err => {
    //         console.log(err);
    //     })

    // db.collection('tasks').updateMany(
    //     { completed: false },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }).then(status => {
    //         console.log(status);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // db.collection('users').findOne({ _id: new ObjectID("60613bc6af4e896975c56569") }, (error, user) => {
    //     if (error)
    //         return console.log("unable to read docs");

    //     console.log(user);
    // })

    //<------------------- READING DATABASE --------------------->
    // db.collection('tasks').findOne({ _id: new ObjectID("6061eca9ed70e26ba6141d00") }, (error, user) => {
    //     if (error) return console.log("couldn't read");
    //     console.log(user);
    // })
    db.collection('users').find({ name: "juanf" }).toArray((error, tasks) => {
        if (error) return console.log("couldn't read");
        console.log(tasks);
    })

    //<------------------- CREATING DOCUMENTS TO DATABASE --------------------->
    // db.collection('users').insertMany([{
    //     "name": " daniel",
    //     "age": 13
    // },
    // {
    //     "name": " juanf",
    //     "age": 57
    // },
    // {
    //     "name": " anam",
    //     "age": 54
    // },
    // ], (error, result) => {
    //     if (error) return console.log("couldn't upload documents to the database");

    //     console.log(result.ops);
    // });
    // db.collection('tasks').insertMany([
    //     {
    //         "description": "Buy milk",
    //         "completed": true
    //     },
    //     {
    //         "description": "Visit my parents",
    //         "completed": false
    //     },
    //     {
    //         "description": "Go to the gym",
    //         "completed": false
    //     },

    // ], (error, result) => {
    //     if (error) return console.log("couldn't upload");
    //     console.log(result.ops);
    // })

})