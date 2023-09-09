import express from "express";
import user from "./routes/user";
import home from "./routes/home";
import payment from "./routes/payment";

const router = express.Router();

router.use("/user", user);
router.use("/home", home);
router.use("/payment", payment);

export default router;
