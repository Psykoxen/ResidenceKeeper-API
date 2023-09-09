import express from "express";
import user from "./routes/user";
import home from "./routes/home";

const router = express.Router();

router.use("/user", user);
router.use("/home", home);

export default router;
