import { database } from "../../config/database";
import Payment from "./payment";

export namespace PaymentHelper {
  export const getAllPayments = (): Array<Payment> => {
    const rows = database.prepare("SELECT * FROM payment").all();
    const payments: Payment[] = rows.map(
      (row: any) =>
        new Payment(
          row.id,
          row.user_id,
          row.home_id,
          row.amount,
          row.date,
          row.name,
          row.category_id
        )
    );

    return payments;
  };

  export const createPayment = (payment: Payment): void => {
    database
      .prepare(
        `
        INSERT INTO payment (user_id, home_id, amount, date, name, category_id) VALUES (@user_id, @home_id, @amount, @date, @name, @category_id)
        `
      )
      .run(payment);
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
    const rows = database
      .prepare(
        `
        SELECT * FROM payment WHERE user_id = @user_id
        `
      )
      .all({ email, password });
    const payments: Payment[] = rows.map(
      (row: any) =>
        new Payment(
          row.id,
          row.user_id,
          row.home_id,
          row.amount,
          row.date,
          row.name,
          row.category_id
        )
    );

    return payments;
  };

  export const getPaymentByHome = (homeId: number): Array<Payment> => {
    const rows = database
      .prepare(
        `
        SELECT * FROM payment WHERE home_id = @home_id
        `
      )
      .all({ homeId });
    const payments: Payment[] = rows.map(
      (row: any) =>
        new Payment(
          row.id,
          row.user_id,
          row.home_id,
          row.amount,
          row.date,
          row.name,
          row.category_id
        )
    );

    return payments;
  };

  export const getPaymentByHomeAndUser = (
    homeId: number,
    userId: number,
    password: string
  ): any => {
    const user = database
      .prepare(
        `
            SELECT id FROM user WHERE id = @userId AND password = @password
            `
      )
      .get({ userId, password });
    if (user) {
      const rows = database
        .prepare(
          `
                SELECT * FROM payment WHERE home_id = @homeId AND user_id = @userId
                `
        )
        .all({ homeId, userId });
      const payments: Array<Payment> = rows.map(
        (row: any) =>
          new Payment(
            row.id,
            row.user_id,
            row.home_id,
            row.amount,
            row.date,
            row.name,
            row.category_id
          )
      );

      return payments;
    }
  };
}
export default PaymentHelper;
