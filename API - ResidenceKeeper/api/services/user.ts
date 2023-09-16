import { UserHelper } from "../models/user/helpers";
import User from "../models/user/user";

export namespace UserService {
  export const getAllUsers = (): Array<User> => {
    return UserHelper.getAllUsers();
  };

  export const createUser = (user: User): void => {
    UserHelper.createUser(user);
  };

  export const getUserByEmail = (email: string, keypass: string): any => {
    return UserHelper.getUserByEmail(email, keypass);
  };

  export const importUsers = (): void => {
    UserHelper.importUsers();
  };

  export const exportUsers = (): void => {
    UserHelper.exportUsers();
  };
}
