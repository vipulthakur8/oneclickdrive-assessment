import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Log() {

    const { status } = useSession();
    const { replace } = useRouter();
    useEffect(() => {
        if (status === 'unauthenticated') {
            replace('/');
        }
    }, [status, replace])

    return (
        <>
            <section className="ml-[210px] pt-5">
                <h1>
                    Hello from LogPage
                </h1>
            </section>
           
        </>
    )
}