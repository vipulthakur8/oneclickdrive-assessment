/*
    This script adds an admin to the database
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
                owner: 'Mario',
                pricePerKm: 21,
                status: 'pending'
            },
            
            {
                model: 'Honda city',
                owner: 'Luigi',
                pricePerKm: 21,
                status: 'pending'
            },
            {
                model: 'Hyundai Verna',
                owner: 'Donkey Kong',
                pricePerKm: 21,
                status: 'pending'
            },
            {
                model: 'Phantom',
                owner: 'Elon Musk',
                pricePerKm: 21,
                status: 'rejected'
            },
            {
                model: 'Mustang',
                owner: 'Dominic Torreto',
                pricePerKm: 21,
                status: 'pending'
            },
            {
                model: 'Aston Martin',
                owner: 'James Bond',
                pricePerKm: 21,
                status: 'approved'
            },
             {
                model: 'Bentley',
                owner: 'Han Solo',
                pricePerKm: 21,
                status: 'approved'
            },
             {
                model: 'Ferrari',
                owner: 'Luke Skywalker',
                pricePerKm: 21,
                status: 'approved'
            },
             {
                model: 'Ghost',
                owner: 'Darth Vader',
                pricePerKm: 21,
                status: 'approved'
            },
             {
                model: 'Range Rover',
                owner: 'Amrendra Bahubali',
                pricePerKm: 21,
                status: 'approved'
            }
        ]
    })
}


addVehicles().then((res) => {
    console.log("result in addVehicles operation", res);
    process.exit(1)
}).catch(err => {
    console.log("error in addVehicles operation", err);
    process.exit(1)
})



