import { Request, Response } from "express";
import { HomeService } from "../services/home";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const homes = HomeService.getAllHomes();
  res.send(homes);
});

route.post("/create", (req: Request, res: Response) => {
  const home = req.body;
  HomeService.createHome(home);
  res.sendStatus(200);
});

route.post("/addresidents", (req: Request, res: Response) => {
  const { homeId, userId } = req.body;
  HomeService.addResidentToHome(homeId, userId);
  res.sendStatus(200);
});

route.get("/getresidents", (req: Request, res: Response) => {
  const { homeId } = req.body;
  res.send(HomeService.getHomeResidents(homeId));
});

route.get("/gethomesresident", (req: Request, res: Response) => {
  const { userId } = req.body;
  res.send(HomeService.getHomeByResidentId(userId));
});

export default route;
