import * as express from "express";
const router = express.Router();

/* GET home page. */
// @ts-ignore
router.get('/', function (req, res, next) {
    res.render('dashboard', {
        title: 'CED - Process Manager',
        cachebust: ('v=' + +new Date)
    });
});

export default router;
