import * as express from "express";
import MendixController from "../../../controllers/MendixController";
import MendixDocumentationGeneratorController from "../../../controllers/MendixDocumentationGeneratorController";

const router = express.Router();

/* GET home page. */
// @ts-ignore
router.get('/projects/', function (req, res, next) {
    MendixController.renderProjectOverview(req).then((html) => {
        res.send(html)
    });
});

/* GET home page. */
// @ts-ignore
router.get('/', function (req, res, next) {
    res.render('mendix', {
        title: 'OpenPEN - App Generator',
        cachebust: ('v=' + +new Date),
        projects: MendixController.renderProjectOverview(req)
    });
});

export default router;
