// Import types
import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as bcrypt from 'bcrypt';
import * as knex from 'knex';

// import * as Knexfile from '../knexfile';
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;

const knexfile = require('../knexfile')[NODE_ENV];
const pg = knex(knexfile);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req: Request, res: Response) => {
//     res.send(database.users);
// })

// app.post('/signin', (req: Request, res: Response) => {
//     console.log('/POST Signin', req.body);
//     if (req.body.email === database.users[0].email &&
//         req.body.password === database.users[0].password) {
//         res.json(database.users[0]);
//     }
//     else {
//         res.status(400).json('email or password does not match');
//     }
// })

app.get('/profile/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await pg.select('*').from('users').where({ id: id });
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('User not found');
        }
    }
    catch (err) {
        res.status(400).json('Encounter an err when getting an user');
    }
})

const saltRounds = 10;
app.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                
            });
        });
        const user = await pg('users')
            .returning('*')
            .insert({
                name: name,
                email: email
            });
        console.log('/POST Signup user', user[0]);
        res.json(user[0]);
    }

    catch (err) {
        res.status(400).json('Sign up failed')
    }
})

app.put('/image', async (req, res) => {
    const { id } = req.body;
    try {
        const entries = await pg('users')
            .where('id', '=', id)
            .increment('entries', 1)
            .returning('entries');
        if (entries.length) {
            res.json(entries[0]);
        } else {
            res.status(400).json('User not found');
        }

    }
    catch (err) {
        res.status(400).json('Encounter an err when getting an entries')
    }

})

app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
});

