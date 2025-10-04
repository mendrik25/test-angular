import { Router } from 'express';
import * as passport from 'passport';
import { userController } from './user.controller';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.router
            .route('/check-duplication')
            .post(passport.authenticate('jwt', { session: false }), userController.checkDuplication.bind(userController));
        this.router
            .route('/profile/:userId')
            .put(passport.authenticate('jwt', { session: false }), userController.updateProfile.bind(userController));

        this.router.route('/signup').post(userController.signUp.bind(userController));

        this.router
            .route('/')
            .get(passport.authenticate('jwt', { session: false }), userController.getPaginatedList.bind(userController))
            .post(userController.create.bind(userController));
        this.router
            .route('/:userId')
            .get(passport.authenticate('jwt', { session: false }), userController.getById.bind(userController))
            .put(userController.update.bind(userController))
            .delete(passport.authenticate('jwt', { session: false }), userController.delete.bind(userController));
    }
}

const userRouter = new UserRouter();

export const userRoutes = userRouter.router;
