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
  const { email, password } = req.body;
  const reponse = UserService.getUserByEmail(email, password);
  if (reponse instanceof user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

export default route;