import User from "../models/user";
import userRepo from "../repository/user";
import { IUser } from "../types/user";

class UserService {
    private static instace: UserService;

    private constructor() {}

    public static getInstance() {
        if (!UserService.instace) {
            UserService.instace = new UserService();
        }

        return UserService.instace;
    }

    public async createUser(user: IUser): Promise<User> {
        return userRepo.create({
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}

export default UserService.getInstance();
