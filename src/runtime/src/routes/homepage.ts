import * as express from "express";
import { hasJwt } from "../middlewares/hasJwt";
import HomepageController from "../controllers/HomepageController";

const router = express.Router();

/* GET home page. */
router.get('/', [hasJwt], HomepageController.show);

export default router;
