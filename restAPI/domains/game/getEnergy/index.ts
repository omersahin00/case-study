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

    const energy = await Energy.findOne({
        where: {
            userId: userData.id
        },
        raw: true
    });

    let _energy: EnergyAttributes;

    if (!energy) {
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
        return {
            statusCode: 200,
            data: {
                message: "Enerji değeri gönderildi.",
                energy: energy.value
            }
        }
    }
}

export default getEnergy;
