import { database } from "../../config/database";
import User from "../user/user";
import Payment from "./payment";
import jsonfile from "jsonfile";
import userRepartion from "./userRepartion";

export namespace PaymentHelper {
  export const getAllPayments = (): Array<Payment> => {
    const rows_payments = database
      .prepare("SELECT * FROM payment ORDER BY date DESC")
      .all();
    const payments: Payment[] = rows_payments.map((row: any) => {
      const rows_repartition = database
        .prepare(
          `
            SELECT * FROM payment_user_repartition WHERE payment_id = @payment_id
            `
        )
        .all({ payment_id: row.id }) as userRepartion[];
      return new Payment(
        row.id,
        row.user_id,
        row.home_id,
        row.amount,
        row.date,
        row.name,
        row.category_id,
        row.expense,
        rows_repartition
      );
    });

    return payments;
  };

  export const createPayment = (payment: Payment): void => {
    database
      .prepare(
        `
        INSERT INTO payment (user_id, home_id, amount, date, name, category_id, expense) VALUES (@user_id, @home_id, @amount, @date, @name, @category_id, @expense)
        `
      )
      .run(payment);

    const idResult = database
      .prepare("SELECT last_insert_rowid() as id")
      .get() as any;
    const id = idResult.id;

    payment.repartition.forEach((repartition) => {
      database
        .prepare(
          `
             INSERT INTO payment_user_repartition (payment_id, user_id, repartition) VALUES (@payment_id, @user_id, @repartition)
             `
        )
        .run({
          payment_id: id,
          user_id: repartition.user_id,
          repartition: repartition.repartition,
        });
    });
  };

  export const deletePayment = (id: number): void => {
    database
      .prepare(
        `
        DELETE FROM payment WHERE id = @id
        `
      )
      .run({ id });
  };

  export const getPaymentByUser = (
    email: string,
    password: string
  ): Array<Payment> => {
    const user = database
      .prepare(
        `
        SELECT * FROM user WHERE email = @email AND keypass = @password
        `
      )
      .get({ email, password }) as User;
    const rows_payments = database
      .prepare(
        `
        SELECT * FROM payment WHERE user_id = @user_id ORDER BY date DESC
        `
      )
      .all({ user_id: user.id });
    const payments: Payment[] = rows_payments.map((row: any) => {
      const rows_repartition = database
        .prepare(
          `
              SELECT * FROM payment_user_repartition WHERE payment_id = @payment_id
              `
        )
        .all({ payment_id: row.id }) as userRepartion[];
      return new Payment(
        row.id,
        row.user_id,
        row.home_id,
        row.amount,
        row.date,
        row.name,
        row.category_id,
        row.expense,
        rows_repartition
      );
    });

    return payments;
  };

  export const getPaymentByHome = (homeId: number): Array<Payment> => {
    const rows_payments = database
      .prepare(
        `
        SELECT * FROM payment WHERE home_id = @homeId ORDER BY date ASC
        `
      )
      .all({ homeId });
    const payments: Payment[] = rows_payments.map((row: any) => {
      const rows_repartition = database
        .prepare(
          `
              SELECT * FROM payment_user_repartition WHERE payment_id = @payment_id
              `
        )
        .all({ payment_id: row.id }) as userRepartion[];
      return new Payment(
        row.id,
        row.user_id,
        row.home_id,
        row.amount,
        row.date,
        row.name,
        row.category_id,
        row.expense,
        rows_repartition
      );
    });
    return payments;
  };

  export const getPaymentByHomeAndUser = (
    homeId: number,
    userId: number
  ): any => {
    const rows_payments = database
      .prepare(
        `
                SELECT * FROM payment WHERE home_id = @homeId AND user_id = @userId ORDER BY date DESC
                `
      )
      .all({ homeId, userId });
    const payments: Payment[] = rows_payments.map((row: any) => {
      const rows_repartition = database
        .prepare(
          `
                SELECT * FROM payment_user_repartition WHERE payment_id = @payment_id
                `
        )
        .all({ payment_id: row.id }) as userRepartion[];
      return new Payment(
        row.id,
        row.user_id,
        row.home_id,
        row.amount,
        row.date,
        row.name,
        row.category_id,
        row.expense,
        rows_repartition
      );
    });
    return payments;
  };

  export const importPayments = (): void => {
    const data = jsonfile.readFileSync("./backup/payments.json");
    database.prepare("DELETE FROM payment_user_repartition").run();
    database.prepare("DELETE FROM payment").run();
    data.forEach((payment: Payment) => {
      database
        .prepare(
          `
          INSERT INTO payment (id,user_id,home_id,amount,date,name,category_id,expense) VALUES (@id,@user_id,@home_id,@amount,@date,@name,@category_id,@expense)
          `
        )
        .run(payment);
      const idResult = database
        .prepare("SELECT last_insert_rowid() as id")
        .get() as any;
      const id = idResult.id;
      payment.repartition.forEach((repartition) => {
        database
          .prepare(
            `
             INSERT INTO payment_user_repartition (payment_id, user_id, repartition) VALUES (@payment_id, @user_id, @repartition)
             `
          )
          .run({
            payment_id: id,
            user_id: repartition.user_id,
            repartition: repartition.repartition,
          });
      });
    });
  };

  export const exportPayments = (): void => {
    const data = getAllPayments();
    jsonfile.writeFileSync("./backup/payments.json", data);
  };
}
export default PaymentHelper;
