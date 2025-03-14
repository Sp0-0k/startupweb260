const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');

console.log('Connected to MongoDB: ' + collection.dbName);


async function testLogin() {    try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
 } catch (ex) {
    console.log(`Error with ${url} because ${ex.message}`);
    process.exit(1);
    
 } }

async function main() {
    testLogin();

try{
    // const house = {
    //     name: 'Beachfront views',
    //     summary: 'From your bedroom to the beach, no shoes required',
    //     property_type: 'Condo',
    //     beds: 1,
    //   };
    
    // await collection.insertOne(house);

    //const query = { property_type: 'Condo', beds: { $lt: 2 } };
    
    // const options = {
    // sort: { score: -1 },
    // limit: 10,
    // };
    // const cursor = collection.find(query, options);
    // await cursor.forEach(doc => console.log(doc));

    await collection.deleteMany(query)
}
     
     
     
    finally {
        await client.close();
    }
}



main().then(() => {console.log('Done');});