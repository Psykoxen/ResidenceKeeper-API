import { Request, Response } from "express";
import { PaymentService } from "../services/payment";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const payments = PaymentService.getAllPayments();
  res.send(payments);
});

route.post("/create", (req: Request, res: Response) => {
  const payment = req.body;
  PaymentService.createPayment(payment);
  res.sendStatus(200);
});

route.post("/user", (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send(PaymentService.getPaymentByUser(email, password));
});

route.delete("/delete", (req: Request, res: Response) => {
  const { id } = req.body;
  PaymentService.deletePayment(id);
  res.sendStatus(200);
});

route.get("/import", (req: Request, res: Response) => {
  PaymentService.importPayments();
  res.sendStatus(200);
});

route.get("/export", (req: Request, res: Response) => {
  PaymentService.exportPayments();
  res.sendStatus(200);
});
export default route;
