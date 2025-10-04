import { NextFunction, Request, Response } from 'express';
import { AuthenticationResponse } from '../authentication/authentication.model';
import { ControllerRead } from '../common/controller/controller-read.interface';
import { ControllerWrite } from '../common/controller/controller-write.interface';
import { Page } from '../shared/types/page.interface';
import { ListBoxFilter } from '../shared/utils/filter-paginate.utils';
import { wrapToSendBackResponse } from '../shared/wrap-to-send-back-response';
import { PaginatedUser, User } from './user.model';
import { userService } from './user.service';

class UserController implements ControllerRead, ControllerWrite {
    getPaginatedList(req: Request, res: Response, next: NextFunction): void {
        const { page: pageNo, pageSize, search, ...filter } = req.query;
        const page: Page = {
            page: Number(pageNo),
            pageSize: Number(pageSize),
        };
        wrapToSendBackResponse<PaginatedUser>(
            userService.getPaginatedList(search as string, filter as ListBoxFilter, page),
            res,
            next
        );
    }

    getById(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<User | null>(userService.getById(req.params.userId), res, next);
    }

    create(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<User>(userService.create(req.body), res, next);
    }

    signUp(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<AuthenticationResponse>(userService.signUp(req.body), res, next);
    }

    delete(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<boolean>(userService.delete(req.params.userId), res, next);
    }

    update(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<User | null>(userService.update(req.params.userId, req.body), res, next);
    }

    updateProfile(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<User | null>(userService.updateProfile(req.params.userId, req.body), res, next);
    }

    checkDuplication(req: Request, res: Response, next: NextFunction): void {
        wrapToSendBackResponse<boolean>(userService.checkDuplication(req.body), res, next);
    }
}

export const userController = new UserController();
