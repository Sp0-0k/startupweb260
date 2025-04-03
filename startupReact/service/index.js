const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const DB = require('./database.js');
const { peerProxy } = require('./websocket.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);
const authCookieName = 'token';


async function initDatabase() {
  try {
    await DB.testLogin(); // Ensure this is called when server starts
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('name', req.body.name)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.name, req.body.password);

    setAuthCookie(res, user.token);
    res.status(200).send({ name: user.name });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  try {
    const user = await findUser('name', req.body.name);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = uuid.v4();
        
        // Update the user's token in MongoDB (add this function to your DB module)
        await DB.updateUserToken(user.uuid, token);
        
        setAuthCookie(res, token);
        res.status(200).send({ userName: user.userName });
        return;
      }
    }
    res.status(400).send({ msg: 'Invalid Username or Password' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ msg: 'Server error during login' });
  }
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/rolls/:roomCode', verifyAuth, async (req, res) => {
  const roomCode = req.params.roomCode;
  const rolls = await DB.findRolls(roomCode);
  res.send(rolls);
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

apiRouter.post('/rolls', verifyAuth, async (req, res) => {
  await DB.rollInsert(req.body);
  res.status(201).send({ msg: 'Roll inserted successfully' });
});

async function createUser(name, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: name,
    uuid: uuid.v4(),
    password: passwordHash,
  };
  await DB.addUser(user.userName, user.uuid, user.password);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if(field === "token"){
    return DB.findUserToken(value);
  }

  return DB.findUser(value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  initDatabase();
});

peerProxy(httpService);