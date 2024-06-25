import User from "../models/user";
import userModel from "../models/user";
import { IUser } from "../types/user";

class UserRepo {
    private static instance: UserRepo;
    private constructor() {}

    public static getInstance() {
        if (!UserRepo.instance) {
            UserRepo.instance = new UserRepo();
        }

        return UserRepo.instance;
    }

    public async create(user: IUser): Promise<User> {
        return userModel.create(user);
    }
}

export default UserRepo.getInstance();
