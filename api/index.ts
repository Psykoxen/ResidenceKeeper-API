import express from "express";
import user from "./routes/user";

const router = express.Router();

router.use("/user", user);

export default router;
