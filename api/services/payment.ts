import { PaymentHelper } from "../models/payment/helpers";
import Payment from "../models/payment/payment";

export namespace PaymentService {
  export const getAllPayments = (): Array<Payment> => {
    return PaymentHelper.getAllPayments();
  };

  export const createPayment = (payment: Payment): void => {
    PaymentHelper.createPayment(payment);
  };

  export const deletePayment = (id: number): void => {
    PaymentHelper.deletePayment(id);
  };

  export const getPaymentByUser = (email: string, password: string): any => {
    return PaymentHelper.getPaymentByUser(email, password);
  };

  export const getPaymentByHome = (id: number): any => {
    return PaymentHelper.getPaymentByHome(id);
  };

  export const importPayments = (): void => {
    PaymentHelper.importPayments();
  };

  export const exportPayments = (): void => {
    PaymentHelper.exportPayments();
  };
}
