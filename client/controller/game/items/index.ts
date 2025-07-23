import axios from "axios";
import { Request, Response } from "express";

const getItemPage = async (
    req: Request,
    res: Response
) => {

    const apiUrlEnergy = `${req.protocol}://${req.get('host')}/api/game/getEnergy`;

    const enegyRespEnergy = await axios.get(apiUrlEnergy, {
        headers: {
            'Cookie': req.headers.cookie || ''
        },
        timeout: 10000,
        validateStatus: (status: number) => status < 500
    });

    const apiUrlItem = `${req.protocol}://${req.get('host')}/api/game/getItem?itemId=b7e1c2a2-3f4b-4e2a-9c1d-8a7f6e5d4c3b`;

    const enegyRespItem = await axios.get(apiUrlItem, {
        headers: {
            'Cookie': req.headers.cookie || ''
        },
        timeout: 10000,
        validateStatus: (status: number) => status < 500
    });

    let maxEnergy: number = 100;

    if (enegyRespEnergy.status !== 200 || enegyRespItem.status !== 200) {
        return res.redirect("/home")
    }

    return res.render("game/items", {
        level: 1,
        experience: enegyRespItem.data.item.xp,
        nextLevelXP: 50,
        itemId: enegyRespItem.data.id,
        energy: enegyRespEnergy.data.energy,
        maxEnergy
    });
}

const postItemPage = async (
    req: Request,
    res: Response
) => {
    
}

export { getItemPage, postItemPage };
export default { getItemPage, postItemPage };
