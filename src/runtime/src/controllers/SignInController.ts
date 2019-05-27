import { Request, Response } from "express";

class SignInController {
    static show = async (req: Request, res: Response) => {
        res.render("signin", {
            title: "OpenPEN - App Generator",
            cachebust: ("v=" + +new Date)
        });
    };
}

export default SignInController;