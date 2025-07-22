import { Request, Response } from "express";

const getItemPage = async (
    req: Request,
    res: Response
) => {
    return res.render("game/items", {
        level: 1,
        experience: 2,
        nextLevelXP: 2,
        itemId: "abc"
    });
}

const postItemPage = async (
    req: Request,
    res: Response
) => {
    
}

export { getItemPage, postItemPage };
export default { getItemPage, postItemPage };
