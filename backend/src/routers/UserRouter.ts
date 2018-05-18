import UserService from "../services/UserService";
import * as express from 'express';
import { Request, Response } from 'express';

/**
*   User Router
*   Requests from : '/'
*/

class UserRouter {
    constructor(private userService: UserService) {
        this.userService = userService;
    }

    getRouter = () => {
        const router = express.Router();
        router.post('/signin', this.handleSignIn);
        router.post('/signup', this.handleSignUp);
        router.get('/profile/:id', this.handleUserProfile);
        router.put('/image', this.handleImage);
        return router;
    }

    handleSignUp = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        try {
            const user = await this.userService.userSignUp(name, email, password);
            res.json(user);

        }
        catch (err) {
            console.log(err);
            res.json('failed to signup');
        }
    }
    handleSignIn = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await this.userService.userSignIn(email, password);
            res.json(user);
        }
        catch (err) {
            res.json(err);
        }

    }
    handleUserProfile = (req: Request, res: Response) => {
        try {

        }
        catch (err) {

        }
    }
    handleImage = (req: Request, res: Response) => {
        try {

        }
        catch (err) {

        }
    }
}
export default UserRouter;