import * as express from "express";
const router = express.Router();

/* GET home page. */
// @ts-ignore
router.get('/', function (req, res, next) {
    res.render('app', {
        title: 'OpenPEN - App Generator',
        cachebust: ('v=' + +new Date)
    });
});

export default router;
