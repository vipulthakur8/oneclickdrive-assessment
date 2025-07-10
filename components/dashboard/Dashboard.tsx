import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Dashboard() {
    const { status } = useSession();
    const { replace } = useRouter();
    useEffect(() => {
        if (status === 'unauthenticated') {
            replace('/');
        }
    }, [status, replace])
    
    return (
        <section className="pt-5 ml-[210px]">
            <h1>Hello from Dashboard Page</h1>
        </section>
    )
}