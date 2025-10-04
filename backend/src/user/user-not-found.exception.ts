import { HttpStatusCode } from '../shared/constants/http-status-codes.constant';
import { HttpException } from '../shared/types/http-exception.interface';

export class UserNotFoundException extends HttpException {
    constructor(userId: string) {
        super(HttpStatusCode.NOT_FOUND, `User not found ${userId}`);
    }
}
