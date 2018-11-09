const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [{
            id: '123',
            name: 'Ricarda',
            email: 'ricarda@fake.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Erik',
            email: 'erik@fake.com',
            password: 'wauwau',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [{
        id: '987',
        hash: '',
        email: 'ricarda@fake.com'
    }]
}

app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    let match = database.users.filter(u => u.email === req.body.email && u.password === req.body.password)[0];
    if (match) {
        res.json(match);
    } else {
        res.status(400).json("fail");
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    if (database.users.filter(u => u.email === email)[0]) {
        return res.json("fail");
    }
    let newUser = {
        id: generateNewUserId().toString(),
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    }
    database.users.push(newUser);
    return res.json(newUser);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const match = database.users.filter(u => u.id === id)[0];

    if (match) {
        return res.json(match);
    }
    return res.status(404).json("no user found");
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    const match = database.users.filter(u => u.id === id)[0];

    if (match) {
        match.entries++;
        return res.json(match.entries);
    }
    return res.status(404).json("no user found");
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

const generateNewUserId = () => {
    let newId = Math.trunc(Math.random() * 1000);
    while (database.users.filter(u => u.id === newId)[0]) {
        newId = Math.trunc(Math.random() * 1000);
    }
    return newId;
};

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/