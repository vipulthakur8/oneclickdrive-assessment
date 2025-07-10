import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function LoginForm() {
    const { status } = useSession();
    const router = useRouter()

    const [creds, setCreds] = useState<{username: string, password: string}>({username: '', password: ''})

    const [pending, setPending] = useState<boolean>(false)
    const [err, setErr] = useState<string>('');

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/dashboard')
        }
    }, [status, router])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCreds(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const submitHandler = async () => {
        if (err) {
            setErr('')
        }
       
        try {
             setPending(prev => !prev)
            const result = await signIn('credentials', {
                redirect: false,
                username: creds.username,
                password: creds.password
            })
            setPending(prev => !prev)

            if (!result?.ok && typeof result?.error === 'string') {
                setErr(result?.error);
            }

            router.replace('/dashboard');
        } catch (error) {
            let message = 'Internal error occurred';
            if (typeof error === 'object' && error !== null) {
                if ('message' in error && typeof error.message === 'string') {
                    message = error.message
                }
            }

            setErr(message)
        }

       
    }

    return (
        <div className="w-[90%] md:w-1/2 lg:w-1/4 lg mx-auto bg-white p-2 rounded-lg">
            <h1 className="text-center text-xl md:text-2xl m-3 font-bold">Log in</h1>
            <label htmlFor="username" className="flex flex-col gap-1 mb-2 w-full">
                <span>
                    Username
                </span>
                <input id="username" value={creds.username} name="username" 
                type="text" placeholder="Enter username" 
                className="input w-full" 
                onChange={changeHandler}
                />
            </label>

            <label htmlFor="password" className="flex flex-col gap-1 mb-2">
                <span>
                    Password
                </span>
                <input id="password" value={creds.password} name="password" 
                type="password" placeholder="Enter password" className="input w-full" 
                onChange={changeHandler}
                />
            </label>

            {
                err && <p className="mb-2 ml-2 text-md text-red-800">* {err}</p>
            }

            <button 
            onClick={submitHandler}
            className="btn block mb-2 mx-auto bg-red-700 text-white hover:bg-red-500">
                {
                    !pending ? 'Login' :
                    <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-lg"></span>
                        <span>Loging in</span>
                    </span>
                }
            </button>
        </div>
    )
}