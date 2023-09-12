import sha256 from "sha256";
import { database } from "../../config/database";
import User from "./user";

export namespace UserHelper {
  export const getAllUsers = (): Array<User> => {
    const rows = database.prepare("SELECT * FROM user").all();
    const users: User[] = rows.map(
      (row: any) => new User(row.id, row.username, row.email, row.keypass)
    );

    return users;
  };

  export const createUser = (user: User): void => {
    database
      .prepare(
        `
        INSERT INTO user (username, email, keypass) VALUES (@username, @email,@keypass)
        `
      )
      .run(user);
  };

  export const getUserByEmail = (
    email: string,
    keypass: string
  ): User | null => {
    try {
      const user = database
        .prepare("SELECT * FROM user WHERE email = ? AND keypass = ?")
        .get(email, keypass) as User;
      return user;
    } catch (error) {
      return null;
    }
  };
}
