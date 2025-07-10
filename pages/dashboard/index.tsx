import Dashboard from "@/components/dashboard/Dashboard"
import SideMenu from "@/components/dashboard/SideMenu"
import { SessionProvider } from "next-auth/react"

import { PrismaClient } from "@/generated/prisma";


export default function DashboardPage({data, total}: {total: number, data: Array<Record<string, string | number>>}) {

    return (
        <SessionProvider>
          <SideMenu />
          <Dashboard vehicleData={data} totalVehicles={total} />
        </SessionProvider>
    )
}


export async function getServerSideProps() {
  // console.log("context", context)
  const prisma = new PrismaClient()
  const result = await prisma.vehicles.findMany({skip: 0, take: 15})
  const total = await prisma.vehicles.count()
  return {
    props: {
      data: result,
      total: total
    }
  }
}