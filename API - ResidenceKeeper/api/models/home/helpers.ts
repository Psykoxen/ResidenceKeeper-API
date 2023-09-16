import { database } from "../../config/database";
import PaymentHelper from "../payment/helpers";
import Resident from "../user/user";
import Home from "./home";
import Payment from "../payment/payment";
import { UserHelper } from "../user/helpers";

export namespace HomeHelper {
  export const getAllHomes = (): Array<Home> => {
    const rows = database.prepare("SELECT * FROM home").all();
    const homes: Home[] = rows.map((row: any) => new Home(row.id, row.name));

    return homes;
  };

  export const createHome = (home: Home): void => {
    database
      .prepare(
        `
        INSERT INTO home (name) VALUES (@name)
        `
      )
      .run(home);
  };

  export const addResidentToHome = (homeId: number, userId: number): void => {
    database
      .prepare(
        `
        INSERT INTO home_user (home_id, user_id) VALUES (@homeId, @userId)
        `
      )
      .run({ homeId, userId });
  };

  export const getHomeResidents = (homeId: number): Array<Resident> => {
    const ids = database
      .prepare(
        `
        SELECT user_id FROM home_user WHERE home_id = @homeId
        `
      )
      .all({ homeId });
    const users: Resident[] = [];
    ids.forEach((id: any) => {
      const row = database
        .prepare("SELECT * FROM user WHERE id = ?")
        .get(id.user_id) as Resident;
      if (row) {
        users.push(row);
      }
    });
    return users;
  };

  export const getHomeByResidentId = (userId: number): Array<Home> => {
    const homeId = database
      .prepare(
        `
        SELECT home_id FROM home_user WHERE user_id = @userId
        `
      )
      .all({ userId });
    console.log(homeId);
    const homes: Home[] = [];
    homeId.forEach((id: any) => {
      const row = database
        .prepare("SELECT * FROM home WHERE id = ?")
        .get(id.home_id) as Home;
      if (row) {
        homes.push(row);
      }
    });
    console.log(homes);
    return homes;
  };

  export const getHomeById = (homeId: number): any => {
    const row = database
      .prepare("SELECT * FROM home WHERE id = ?")
      .get(homeId) as Home;
    if (row) {
      const residence = {
        home: new Home(row.id, row.name),
        payments: PaymentHelper.getPaymentByHome(homeId),
        balance: getHomeBalance(homeId),
      };
      return residence;
    }
    throw new Error("Home not found");
  };

  export const getHomeBalance = (homeId: number): any => {
    const payments = PaymentHelper.getPaymentByHome(homeId);
    const statement: {
      balance: number;
      users: { userId: number; balance: number }[];
    } = { balance: 0, users: [] };

    getHomeResidents(homeId).forEach((user: Resident) => {
      const userBalance: { userId: number; balance: number } = {
        userId: user.id,
        balance: 0,
      };
      userBalance.balance = UserHelper.getBalance(user.id, homeId).balance;
      statement.users.push(userBalance);
    });

    payments.forEach((payment: Payment) => {
      if (payment.expense === "true") {
        statement.balance -= payment.amount;
      } else {
        statement.balance += payment.amount;
      }
    });

    return statement;
  };
}
