import sha256 from "sha256";
import { database } from "../../config/database";
import User from "./user";
import Payment from "../payment/payment";
import jsonfile from "jsonfile";

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

  export const getBalance = (userId: number, homeId: number): any => {
    try {
      const rows = database
        .prepare(
          `
          SELECT * FROM payment WHERE user_id = @userId AND home_id = @homeId
          `
        )
        .all({ userId, homeId });

      const payments: Payment[] = rows.map(
        (row: any) =>
          new Payment(
            row.id,
            row.user_id,
            row.home_id,
            row.amount,
            row.date,
            row.name,
            row.category_id,
            row.expense
          )
      );

      let balance = 0;

      payments.forEach((payment) => {
        if (payment.expense === "true") {
          balance -= payment.amount;
        } else {
          balance += payment.amount;
        }
      });

      return { balance: balance };
    } catch (error) {
      return null;
    }
  };

  export const importUsers = (): void => {
    const data = jsonfile.readFileSync("./backup/users.json");
    database.prepare("DELETE FROM user").run();
    data.forEach((user: User) => {
      database
        .prepare(
          `
          INSERT INTO user (id,username,email,keypass) VALUES (@id,@username,@email, @keypass)
          `
        )
        .run(user);
    });
  };

  export const exportUsers = (): void => {
    const data = getAllUsers();
    jsonfile.writeFileSync("./backup/users.json", data);
  };
}
