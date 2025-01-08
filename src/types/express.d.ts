import { User } from '../models/user.model'; // Adjust the import path as needed

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
