import { PrismaClient } from "@/generated/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
const prisma = new PrismaClient()

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === 'POST') {
        try {
            const data = await req.body;

            // update database
            await prisma.vehicles.update({
                where: {
                    id: data.id
                },
                data: {
                   status: data.status
                }
            })

            // update audit log
            await prisma.auditTrail.create({
                data: {
                    operation: `${session.user.name} ${data.status} the vehicle with id ${data.id}`
                }
            })

            res.status(200).json({ message: `Vehicle ${data.status}`});
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
