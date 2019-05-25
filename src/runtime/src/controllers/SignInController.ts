import { Request, Response } from "express";

class SignInController {
    static show = async (req: Request, res: Response) => {
        res.render("signin", {
            title: "CED - Process Manager",
            cachebust: ("v=" + +new Date)
        });
    };
}

export default SignInController;