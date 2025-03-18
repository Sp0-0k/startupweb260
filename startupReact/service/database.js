const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('diceApp');
const userCollection = db.collection('users');
const rollsCollection = db.collection('rolls');

console.log('Connected to MongoDB: ' + db.databaseName);

async function testLogin() {    
    try {
        await db.command({ ping: 1 });
        console.log(`DB connected to ${config.hostname}`);
    } catch (ex) {
        console.log(`Error with ${url} because ${ex.message}`);
        process.exit(1);
    } 
}

async function rollInsert(roomCode, userName, diceType, diceNumber, totalRoll) {
    const rollResult = {
        roomCode: roomCode,
        userName: userName,
        diceType: diceType,
        diceNumber: diceNumber,
        totalRoll: totalRoll,
        date: new Date()
    }
    await rollsCollection.insertOne(rollResult);
}

function findRolls(roomCode) {
    const query = { roomCode: roomCode };
    const options = {
        sort: { date: -1 },
        limit: 12,
    };
    const cursor = rollsCollection.find(query, options);
    return cursor.toArray();
}

async function addUser(userName, uuid, password) {
    const user = {
        userName: userName,
        uuid: uuid,
        password: password
    };
    await userCollection.insertOne(user);
}

function findUserToken(uuid) {
    return userCollection.findOne({ uuid: uuid });
}

function findUser(userName) {
    return userCollection.findOne({ userName: userName });
}

async function updateUserToken(uuid, token) {
    return collection.updateOne(
      { uuid: uuid },
      { $set: { token: token } }
    );
  }

module.exports = {
    testLogin,
    rollInsert,
    findRolls,
    addUser,
    findUserToken,
    findUser,
    updateUserToken
}