import { PrismaClient } from "@/generated/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

    if (req.method === 'POST') {
        try {
            const data = await req.body;
            console.log("data in edit-vehicle route", data);

            // update database
            await prisma.vehicles.update({
                where: {
                    id: data.id
                },
                data: {
                    owner: data.owner,
                    model: data.model,
                    pricePerKm: Number(data.pricePerKm)
                }
            })

            // update audit log

            res.status(200).json({ message: "Vehicle details updated" });
        } catch (error) {
            let message = 'An error occurred';
            if (typeof error === 'object' && error !== null) {
                if ('message' in error && typeof error.message === 'string') {
                    message = error.message
                }
            }
            res.status(500).json({message})
        }
        
    }
}
