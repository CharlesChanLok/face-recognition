import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

/**
*   User Service
*   Database queries 
*   Tables : users | logins
*/

class UserService {
    constructor(private db: Knex) {
        this.db = db;
    }

    private saltRounds = 10;

    private findUser = (criteria: string) => {
        return this.db('users')
            .select('*')
            .where(criteria);
    }

    userSignUp = (name: string, email: string, password: string) => {
        if (name && email && password) {
            return this.db.transaction(async (trx) => {
                try {
                    const hash = await bcrypt.hash(password, this.saltRounds);
                    const user = await trx.insert({
                        name: name,
                        email: email
                    })
                        .into('users')
                        .returning('*');
                    const login = await trx('logins').insert({
                        hash: hash,
                        user_id: user[0].id
                    });
                    return user;
                }
                catch (err) {
                    console.log('err');
                    return err;
                }
            })
                .catch((err) => {
                    console.log('err');
                    return err;
                });

        } else {
            return new Error('Error occured when getting user, email, or password');
        }
    }

    userSignIn = async (email: string, password: string) => {
        try {
            const userHash = await this.db('users').join('logins', 'users.id', '=', 'logins.user_id')
                .select('users.id', 'hash')
                .where('users.email', '=', email);
            const isValidPassword = await bcrypt.compare(password, userHash[0].hash);
            if (isValidPassword) {
                try {
                    const user = await this.db('users')
                        .select('*')
                        .where('id', '=', userHash[0].id);
                    return user[0];
                }
                catch (err) {
                    return new Error('Error occured when getting an user');
                }
            } else {
                return new Error('Failed to sign in, please provide a valid credentials');
            }
        }
        catch (err) {
            return err;
        }
    }








}

export default UserService;