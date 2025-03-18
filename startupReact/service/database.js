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

async function rollInsert(roomCode, userName, diceType, diceNumber, totalRoll) {
    const rollResult = {
    roomCode: roomCode,
    userName: userName,
    diceType: diceType,
    diceNumber: diceNumber,
    totalRoll: totalRoll,
    date: new Date()
    }
    await collection.insertOne(rollResult);
 }

function findRolls(roomCode) {
    const query = { roomCode: roomCode };
    const options = {
        sort: { date: -1 },
        limit: 12,
    };
    const cursor = collection.find(query, options);
    return cursor.toArray();
}

async function addUser(uuid, password) {
    const user = {
    uuid: uuid,
    password: password
    };
    await collection.insertOne(user);
 }

function findUser(uuid) {
    return collection.findOne({ uuid: uuid });
}

module.exports = {
    testLogin,
    rollInsert,
    findRolls,
    addUser,
    findUser
}