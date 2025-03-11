const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);


// Authentication HTTP Requests:

app.post('/api/auth', async (req, res) => {
    if (await getUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);
      setAuthCookie(res, user);
  
      res.send({ email: user.email });
    }
  });
  
app.put('/api/auth', async (req, res) => {
    const user = await getUser('email', req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        setAuthCookie(res, user);
  
        res.send({ email: user.email });
    }
    else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});
  
app.delete('/api/auth', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    if (user) {
        clearAuthCookie(res, user);
    }
  
    res.send({});
});
  
app.get('/api/user/me', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    if (user) {
        res.send({ email: user.email });
    }
    else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

  const users = [];

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
  };

  users.push(user);

  return user;
}

function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie('token', user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}


// Scores posting and grabbing

let rolls = [];

// POST endpoint to save a new roll event
apiRouter.post('/roll', (req, res) => {
  const { diceSides, diceNum, diceTotal, userName, type, roomCode } = req.body;
  
  // Validate the required fields
  if (!diceSides || !diceNum || !diceTotal || !userName || !type) {
    return res.status(400).send({ msg: 'Missing required roll data' });
  }
  
  // Create a new roll event with timestamp
  const roll = {
    diceSides,
    diceNum,
    diceTotal,
    userName,
    type,
    roomCode, // Optional, to filter rolls by room
    timestamp: Date.now()
  };
  
  // Add to beginning of array to keep most recent first
  rolls.unshift(roll);
  
  // Limit array size to prevent memory issues (keep last 100 rolls)
  if (rolls.length > 100) {
    rolls = rolls.slice(0, 100);
  }
  
  res.status(201).send({ msg: 'Roll saved', roll });
});

// GET endpoint to retrieve recent rolls
apiRouter.get('/rolls', (req, res) => {
  const { roomCode, limit = 10 } = req.query;
  
  let filteredRolls = rolls;
  
  // Filter by room code if provided
  if (roomCode) {
    filteredRolls = rolls.filter(roll => roll.roomCode === roomCode);
  }
  
  // Return only the requested number of recent rolls
  const recentRolls = filteredRolls.slice(0, Math.min(parseInt(limit), 50));
  
  res.send({ rolls: recentRolls });
});

// GET endpoint to retrieve a specific roll by ID (if needed later)
apiRouter.get('/roll/:id', (req, res) => {
  const roll = rolls.find(r => r.id === req.params.id);
  
  if (!roll) {
    return res.status(404).send({ msg: 'Roll not found' });
  }
  
  res.send({ roll });
});

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
