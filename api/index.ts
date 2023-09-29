import express from "express";
import user from "./routes/user";
import home from "./routes/home";
import payment from "./routes/payment";
import category from "./routes/category";

const router = express.Router();

router.use("/user", user);
router.use("/home", home);
router.use("/payment", payment);
router.use("/category", category);

export default router;
