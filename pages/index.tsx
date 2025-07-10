
import LoginForm from "@/components/auth/LoginForm";
import { SessionProvider } from "next-auth/react";

export default function Home() {
    return (
        <SessionProvider>
            <main className="h-[100vh] w-[100vw] bg-red-400 flex items-center justify-center">
                <LoginForm />
            </main>
        </SessionProvider>
        
    )
}

