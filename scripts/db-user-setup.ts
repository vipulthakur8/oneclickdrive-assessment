/*
    This script adds an admin to the database
*/

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

async function main() {
    await prisma.admin.create({
        data: {
            username: 'admin100',
            password: 'dev-assessment'
        }
    })
}

main().then(async(result) => {
    console.log("result", result)
}).catch(async(e) => {
    console.log(e)
    process.exit(1)
})