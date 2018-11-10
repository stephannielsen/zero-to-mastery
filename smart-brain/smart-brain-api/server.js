const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(db.select('*').from('users'));
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    return db
        .select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(login => {
            const isValid = bcrypt.compareSync(password, login[0].hash);
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json(err));
            } else {
                throw "fail.";
            }
        })
        .catch(err => res.status(400).json('Wrong credentials.'));
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
            trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return db('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {
                            return res.json(user[0]);
                        });
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })
        .catch(err => res.status(400).json(err));
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db('users')
        .select('*')
        .where({ id: id })
        .then(user => {
            if (user.length) {
                return res.json(user[0]);
            } else {
                res.status(400).json('Not found.');
            }
        })
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json(err));
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
});