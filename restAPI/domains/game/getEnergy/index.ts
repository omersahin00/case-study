import { Energy, EnergyAttributes } from "@/models";
import { EndpointReturn } from "@/types/endpointReturn";
import { Request, Response } from "express";

interface GetEnergyResponse {
    message: string;
    energy: number;
}

const getEnergy = async (
    req: Request,
    res: Response<GetEnergyResponse>
): Promise<EndpointReturn<GetEnergyResponse>> => {

    const userData = req.user;

    const userEnergy = await Energy.findOne({
        where: {
            userId: userData.id
        }
    });

    let _energy: EnergyAttributes;

    if (!userEnergy) {
        _energy = await Energy.create({
            userId: userData.id,
            value: 0
        });

        if (_energy) {
            return {
                statusCode: 200,
                data: {
                    message: "Enerji değeri gönderildi.",
                    energy: _energy.value
                }
            }

        } else {
            return {
                statusCode: 500,
                error: "Bilinmeyen bir hata oluştu!"
            }
        }

    } else {
        const addedUserXp = Math.floor((Date.now() - new Date(userEnergy.updatedAt).getTime()) / (60 * 1000));

        console.log("Enerjiye eklenen değer:", addedUserXp);
        

        if (addedUserXp > 0 && userEnergy.value <= 100) {
            userEnergy.value += addedUserXp;
            if (userEnergy.value > 100) userEnergy.value = 100;

            await userEnergy.save();
        }

        return {
            statusCode: 200,
            data: {
                message: "Enerji değeri gönderildi.",
                energy: userEnergy.value
            }
        }
    }
}

export default getEnergy;
