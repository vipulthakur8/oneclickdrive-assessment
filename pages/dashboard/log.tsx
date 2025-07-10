import Log from "@/components/dashboard/Log"
import SideMenu from "@/components/dashboard/SideMenu"
import { SessionProvider } from "next-auth/react"
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export default function LogPage({trail}: {trail: Array<Record<string, string | number | Date>>}) {
    return (
        <SessionProvider>
            <SideMenu />
            <Log trail={trail} />
        </SessionProvider>
    )
}


export async function getServerSideProps() {
  try {
      const result = await prisma.auditTrail.findMany({orderBy: {createdAt: 'desc'}})
      const serializedResult = result.map(item => ({
        ...item,
        createdAt: item.createdAt.toISOString()
      }))
      return {
        props: {
          trail: serializedResult,
        }
      }
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        trail: [],
      }
    }
  }

}