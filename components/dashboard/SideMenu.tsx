import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


export default function SideMenu() {
    const { asPath } = useRouter()
    const [pending, setPending] = useState(false)
    const logoutHandler = () => {
        setPending(prev => !prev)
        signOut()
        setPending(prev => !prev)
    }
    return (
        <section className="md:w-[200px] h-[100%] fixed bg-red-300 flex flex-col items-center justify-between py-5">
            <div className="flex flex-col items-center">
                <Link href={'/dashboard'} 
                className={`mb-5 font-semibold ${(asPath === '/dashboard' || asPath.includes('page')) ? 'text-gray-500' : 'text-black'}`}>Dashboard</Link>
                <Link href={'/dashboard/log'}
                className={`mb-5 font-semibold ${asPath === '/dashboard/log' ? 'text-gray-500' : 'text-black'}`}
                >Log</Link>
            </div>
            <button onClick={logoutHandler} className="btn btn-md bg-red-700 text-white">
                {
                    pending ? 'Loging out..' : 'Log out'
                }
            </button>
        </section>
    )
}