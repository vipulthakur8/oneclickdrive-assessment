import Dashboard from "@/components/dashboard/Dashboard"
import SideMenu from "@/components/dashboard/SideMenu"
import { SessionProvider } from "next-auth/react"

import { PrismaClient } from "@/generated/prisma";
import { GetServerSidePropsContext } from "next";
const prisma = new PrismaClient();

export default function DashboardPage({
  data, total, currentPage, totalPages}: 
  {total: number, currentPage: number, totalPages: number, data: Array<Record<string, string | number>>

  }) {

    return (
        <SessionProvider>
          <SideMenu />
          <Dashboard vehicleData={data} totalVehicles={total} currentPage={currentPage} totalPages={totalPages}/>
        </SessionProvider>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
      const page = context.query.page ? parseInt(context.query.page as string) : 1;
      const result = await prisma.vehicles.findMany({skip: (page-1)*15, take: 15, orderBy: {id: 'asc'}})
      const total = await prisma.vehicles.count()
      return {
        props: {
          data: result,
          total: total,
          currentPage: page,
          totalPages: Math.ceil(total / 15)
        }
      }
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        data: [],
        total: 0,
        currentPage: 1,
        totalPage: 1
      }
    }
  }

}