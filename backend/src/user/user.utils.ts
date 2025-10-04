import { User } from './user.model';

export namespace UserUtils {
    export const getFullName = (user: Pick<User, 'firstName' | 'lastName'>): string => `${user.lastName} ${user.firstName}`;
}
