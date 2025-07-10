import Log from "@/components/dashboard/Log"
import SideMenu from "@/components/dashboard/SideMenu"
import { SessionProvider } from "next-auth/react"

export default function LogPage() {
    return (
        <SessionProvider>
            <SideMenu />
            <Log />
        </SessionProvider>
    )
}