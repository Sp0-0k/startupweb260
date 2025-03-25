const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

// Update connection options
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, {
  ssl: true,
  tls: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;
let userCollection;
let rollsCollection;

async function testLogin() {
  try {
    await client.connect();
    db = client.db('diceApp');
    userCollection = db.collection('users');
    rollsCollection = db.collection('rolls');

    await db.command({ ping: 1 });
    console.log(`Connected to MongoDB: ${db.databaseName}`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function rollInsert(rollData) {
  const rollResult = {
    roomCode: rollData.roomCode,
    userName: rollData.userName,
    diceType: rollData.diceType,
    diceNumber: rollData.diceNumber,
    totalRoll: rollData.totalRoll,
    date: new Date()
  }
  await rollsCollection.insertOne(rollResult);
}

function findRolls(roomCode) {
  const query = { roomCode: roomCode };
  const options = {
    sort: { "date": 1 },
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

function findUserToken(token) {
  return userCollection.findOne({ token: token });
}

function findUser(userName) {
  return userCollection.findOne({ userName: userName });
}

async function updateUserToken(uuid, token) {
  return userCollection.updateOne(
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