import { Request, Response } from "express";

class HomepageController {
    static show = async (req: Request, res: Response) => {
        res.render("homepage", {
            title: "OpenPEN - App Generator",
            cachebust: ("v=" + +new Date)
        });
    };
}

export default HomepageController;