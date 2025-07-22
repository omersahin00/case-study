import { Request, Response } from "express";

const getItemPage = async (
    req: Request,
    res: Response
) => {
    return res.render("game/items", {
        level: 2,
        experience: 2,
        nextLevelXP: 2,
        itemId: "abc"
    });
}

export { getItemPage };
export default { getItemPage };
