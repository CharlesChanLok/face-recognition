import * as bcrypt from 'bcrypt';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express'; // Import express types
import * as express from 'express';
import * as knex from 'knex';
import UserRouter from './routers/UserRouter';
import UserService from './services/UserService';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;

const knexfile = require('../knexfile')[NODE_ENV];
const pg = knex(knexfile);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const userService = new UserService(pg);

const userRouter = new UserRouter(userService);

app.use('/', userRouter.getRouter());

app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
});

