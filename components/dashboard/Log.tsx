import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Log({trail}: {trail: Array<Record<string, string | number | Date>>}) {
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
                <h1 className="font-semibold">
                    Audit Trail
                </h1>
                <hr className="my-3" />
                {
                    trail.map((item) => {
                        return (
                            <h3 key={Number(item.id)}
                            className="p-2 bg-green-200 w-fit rounded-lg mb-3"
                            >{String(item.operation)}</h3>
                        )
                    })
                }
            </section>
        </>
    )
}