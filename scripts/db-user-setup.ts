/*
    This script adds an admin and dummy verhicle data to the database
*/

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

// async function main() {
//     await prisma.admin.create({
//         data: {
//             username: 'admin100',
//             password: 'dev-assessment'
//         }
//     })
// }

// main().then(async(result) => {
//     console.log("result", result)
// }).catch(async(e) => {
//     console.log(e)
//     process.exit(1)
// })

async function addVehicles() {
    await prisma.vehicles.createMany({
        data: [
            {
                model: 'Honda civic',
                owner: 'Ash',
                pricePerKm: 21,
                status: 'pending'
            },
            
            {
                model: 'Honda city',
                owner: 'Dawn',
                pricePerKm: 21,
                status: 'pending'
            },
            {
                model: 'Hyundai Verna',
                owner: 'Micky Mouse',
                pricePerKm: 21,
                status: 'pending'
            },
            {
                model: 'Phantom',
                owner: 'Donald Duck',
                pricePerKm: 21,
                status: 'pending'
            },
            {
                model: 'Mustang',
                owner: 'Red',
                pricePerKm: 21,
                status: 'pending'
            },
            {
                model: 'Aston Martin',
                owner: 'Misty',
                pricePerKm: 21,
                status: 'pending'
            },
             {
                model: 'Bentley',
                owner: 'Hilbert',
                pricePerKm: 21,
                status: 'pending'
            },
             {
                model: 'Ferrari',
                owner: 'Serena',
                pricePerKm: 21,
                status: 'pending'
            },
             {
                model: 'Ghost',
                owner: 'Iris',
                pricePerKm: 21,
                status: 'pending'
            },
             {
                model: 'Range Rover',
                owner: 'Professor',
                pricePerKm: 21,
                status: 'pending'
            }
        ]
    })

    // await prisma.vehicles.delete({
    //     where: {
    //         id: 30
    //     }
    // })
}


addVehicles().then((res) => {
    console.log("result in addVehicles operation", res);
    process.exit(1)
}).catch(err => {
    console.log("error in addVehicles operation", err);
    process.exit(1)
})



