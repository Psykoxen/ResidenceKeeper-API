import { UserHelper } from "../models/user/helpers";
import User from "../models/user/user";

export namespace UserService {
  export const getAllUsers = (): Array<User> => {
    return UserHelper.getAllUsers();
  };

  export const createUser = (user: User): void => {
    UserHelper.createUser(user);
  };

  export const getUserByEmail = (email: string, password: string): any => {
    return UserHelper.getUserByEmail(email, password);
  };
}
