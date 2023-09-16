import { Request, Response } from "express";
import { UserService } from "../services/user";
import user from "../models/user/user";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const users = UserService.getAllUsers();
  res.send(users);
});

route.post("/create", (req: Request, res: Response) => {
  const user = req.body;
  UserService.createUser(user);
  res.sendStatus(200);
  console.log(user);
});

route.post("/login", (req: Request, res: Response) => {
  const { email, keypass } = req.body;
  const reponse = UserService.getUserByEmail(email, keypass);
  if (reponse) {
    res.send(reponse);
  } else {
    res.sendStatus(400);
  }
});

export default route;
