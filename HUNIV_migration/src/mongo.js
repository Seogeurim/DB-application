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

        db.collection('student').remove();
        db.collection('instructor').remove();
        db.collection('section').remove();
        db.collection('course').remove();
        db.collection('takes').remove();

        /* INSERT DATA INTO COLLECTION */
        exports.insertData = (collectionName, document) => {
            db.collection(collectionName).insertOne(document, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
        }
});