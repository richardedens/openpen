import * as express from "express";
import { hasJwt } from "../middlewares/hasJwt";
import SignInController from "../controllers/SignInController";

const router = express.Router();

/* GET home page. */
router.get('/signin', SignInController.show);

export default router;
