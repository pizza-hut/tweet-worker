const MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://soonlung:pass1234@cluster0-mxrm6.mongodb.net/test?retryWrites=true&w=majority";
//var dbName = process.env.DB;
var dbName = "tweets_db_test";
//var collectionName = process.env.COLLECTION;
var collectionName = "tweets";

var clientConfig = {
    useNewUrlParser: true, 
    poolSize: 10,
    useUnifiedTopology: true};

const client = new MongoClient(uri, clientConfig);

var Db = {
    client: client
};




async function testConnection(){
    console.log("testing connection...");
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function query(filter){
    
    try {
        console.log(filter);
        await client.connect();
        //results = await client.db().query
        const result = await client.db(dbName).collection(collectionName).findOne(filter);
        console.log(result);
        return result;

    } catch (e) {
        console.log(e);
        return e;

    } finally {
        await client.close();
    }

}

async function insertDoc(doc){
    try {
        await client.connect();
        const result = await client.db(dbName).collection(collectionName).insertOne(doc);
        console.log(`New doc created with the following id: ${result.insertedId}`);
        return result;

    } catch (e) {
        console.log(e);
        return e;

    } finally {
        await client.close();
    };
    
}

async function listDatabases(){
    try {
        await client.connect();
        databasesList = await client.db().admin().listDatabases();
 
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

};


module.exports = {
    Db : Db,
    insertDoc : insertDoc,
    query : query,
    listDatabases : listDatabases,
    testConnection : testConnection
};
