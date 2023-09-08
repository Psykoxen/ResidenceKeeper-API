import sha256 from "sha256";
import { database } from "../../config/database";
import User from "./user";

export namespace UserHelper {
  export const getAllUsers = (): Array<User> => {
    const rows = database.prepare("SELECT * FROM user").all();
    const users: User[] = rows.map(
      (row: any) => new User(row.id, row.username, row.email, row.password)
    );

    return users;
  };

  export const createUser = (user: User): void => {
    database
      .prepare(
        `
        INSERT INTO user (username, email, password) VALUES (@username, @email,@password)
        `
      )
      .run(user);
  };

  export const getUserByEmail = (email: string, password: string): any => {
    const user: User = database
      .prepare("SELECT * FROM user WHERE email = ? AND password = ?")
      .get(email, sha256(password)) as User;
    if (!user) {
      return null;
    } else {
      return user;
    }
  };
}
