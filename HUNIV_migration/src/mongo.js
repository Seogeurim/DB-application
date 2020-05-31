require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DATABASE;

MongoClient.connect(
    url,
    {useUnifiedTopology:true},
    function (err, database) {
        if (err) {
            console.error('MongoDB Connect ERROR', err);
            return;
        }

        const db = database.db(dbName);

        db.collection('student').drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Student Collection deleted");
        });

        db.collection('instructor').drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Instructor Collection deleted");
        });

        db.collection('section').drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Section Collection deleted");
        });

        db.collection('course').drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Course Collection deleted");
        });

        db.collection('takes').drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Takes Collection deleted");
        });

        db.createCollection('student', function(err, res) {
            if (err) throw err;
            console.log("Collection [student] created!");
        });

        db.createCollection('instructor', function(err, res) {
            if (err) throw err;
            console.log("Collection [instructor] created!");
        });

        db.createCollection('section', function(err, res) {
            if (err) throw err;
            console.log("Collection [section] created!");
        });

        db.createCollection('course', function(err, res) {
            if (err) throw err;
            console.log("Collection [course] created!");
        });

        db.createCollection('takes', function(err, res) {
            if (err) throw err;
            console.log("Collection [takes] created!");
        });

        /* INSERT DATA INTO COLLECTION */
        exports.insertData = (collectionName, document) => {
            db.collection(collectionName).insertOne(document, function(err, res) {
                if (err) throw err;
                // console.log("1 document inserted");
            });
        }
});