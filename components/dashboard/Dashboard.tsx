import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import EditVehicleForm from "./EditVehicleForm";

export default function Dashboard(
    {vehicleData, totalVehicles, currentPage, totalPages}:
    {totalVehicles: number, vehicleData: Array<Record<string, string | number>>, currentPage: number, totalPages: number}
) {
    const { status } = useSession();
    const router = useRouter();

    const [data, setData] = useState<Array<Record<string, string | number>>>([])
    const [filter, setFilter] = useState<string>('')

    console.log("totalVehicles", totalVehicles);

    const [editItem, setEditItem] = useState<boolean>(false)
    const [editElement, setEditElement] = useState<Record<string, string | number>>({})

    // notification and progress indicator
    const [notification, setNotification] = useState<{type: 'success' | 'error' | 'pending' | null, message: string}>({
        type: null,
        message: ''
    })

    useEffect(() => {
        setData(vehicleData)
    }, [vehicleData])

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/');
        }
        if (notification.type) {
            const id = setTimeout(() => {
                setNotification({type: null, message: ''})
            }, 3000)

            return () => clearTimeout(id)
        }
    }, [status, router, notification])

    // console.log("editElement", editElement);

    // Change handler in editVehicleForm
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditElement((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Edit vehicle details
    const editElementSubmitHandler = async(e: FormEvent) => {
        e.preventDefault();
        console.log("InsideElementSubmitHandler")
        try {
            if (!notification.type) {
                setNotification({type: null, message: ''})
            }
            
            setNotification({type: 'pending', message: ''})
            const response = await fetch('/api/edit-vehicle', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...editElement
                })
            })         
            setNotification({type: null, message: ''})

            if (!response.ok) {
                setNotification({
                type: 'error',
                message: 'Operation failed'
            })
            }

            const result = await response.json();
            console.log("result in editElementSubmitHandler", result);

            // set the update the data on the client side
            const updatedData = data.map(item => {
                if (item.id !== editElement.id) {
                    return item;
                }
                item.owner = editElement.owner;
                item.model = editElement.model;
                item.pricePerKm = editElement.pricePerKm;
                item.status = editElement.status;
                return item;
            })
            setData(updatedData);

            // close the editElement
            setEditItem(prev => !prev);

            // set the notification: this must be closed after few seconds on the main dashboard
            setNotification({
                type: 'success',
                message: result.message
            })

        } catch (error) {
            let message = 'An error occurred';
            if (typeof error === 'object' && error !== null) {
                if ('message' in error && typeof error.message === 'string') {
                    message = error.message
                }
            }
            setNotification({
                type: 'error',
                message
            })
        }
    }


    const vehicleStatusUpdateHandler = async(id: number, status: string) => {
         try {
            const response = await fetch('/api/vehicle-status-update', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    status
                })
            })         

            if (!response.ok) {
                setNotification({
                type: 'error',
                message: 'Operation failed'
            })
            }

            const result = await response.json();
            console.log("result in editElementSubmitHandler", result);

            // set the update the data on the client side
            const updatedData = data.map(item => {
                if (item.id !== id) {
                    return item;
                }
                item.status = status;
                return item;
            })
            setData(updatedData);

            // set the notification: this must be closed after few seconds on the main dashboard
            setNotification({
                type: 'success',
                message: result.message
            })

        } catch (error) {
            let message = 'An error occurred';
            if (typeof error === 'object' && error !== null) {
                if ('message' in error && typeof error.message === 'string') {
                    message = error.message
                }
            }
            setNotification({
                type: 'error',
                message
            })
        }
    }


    return (
        <>
            {
                editItem && 
                <div className="fixed w-[100%] h-[100%] bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
                    <EditVehicleForm item={editElement} 
                    changeHandler={changeHandler} 
                    closeForm={() => setEditItem(false)}
                    editElementSubmitHandler={editElementSubmitHandler}
                    notification={notification}
                    />
                </div>
            }
            {
                (notification.type === 'error' || notification.type === 'success') &&
                <section 
                className={`fixed w-fit bottom-4 right-4 rounded-md p-5 text-white ${notification.type === 'success' ? 'bg-green-700' : 'bg-red-900'}`}
                >
                    <h1 className="text-center">{notification.message}...</h1>
                </section>
            }
            <section className="pt-5 ml-[200px]">
                <section className="flex items-center justify-between">
                    <h1 className="text-md font-semibold ml-2">Listings</h1>
                    <label className="mr-5">
                        <span>Filter</span>
                        <select value={filter} className="border p-1 ml-2" onChange={(e) => setFilter(e.target.value)}>
                            <option value={''} className="text-center border">All</option>
                            <option value={'approved'} className="text-center border">Approved</option>
                            <option value={'rejected'} className="text-center border">Rejected</option>
                            <option value={'pending'} className="text-center border">Pending</option>
                        </select>
                    </label>
                
                </section>
                <hr className="my-2"/>

                <table className="border w-[95%] mx-auto mb-5">
                    <thead>
                        <tr>
                            <th className="border p-2">No.</th>
                            <th className="border p-2">Model</th>
                            <th className="border p-2">Owner</th>
                            <th className="border p-2">Price per km (Rs)</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filter ?
                            data.filter(item => item.status === filter).map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td className="text-center border p-2">
                                            {index+1}
                                        </td>
                                        <td className="text-center border p-2">
                                            {item.model}
                                        </td>
                                        <td className="text-center border p-2">
                                            {item.owner}
                                        </td>
                                        <td className="text-center border p-2">
                                            {item.pricePerKm}
                                        </td>
                                        <td className="text-center border p-2 capitalize">
                                            {item.status}
                                        </td>
                                        <td className="border p-2 flex gap-3">
                                            <button className="btn btn-xs bg-green-500 text-white" 
                                            disabled={item.status === 'approved' || item.status === 'rejected'}
                                            onClick={() => vehicleStatusUpdateHandler(Number(item.id), 'approved')}
                                            >Approve</button>

                                            <button className="btn btn-xs bg-red-800 text-white" 
                                            disabled={item.status === 'approved' || item.status === 'rejected'}
                                            onClick={() => vehicleStatusUpdateHandler(Number(item.id), 'rejected')}
                                            >Reject</button>

                                            <button className="btn btn-xs bg-black text-white" 
                                            disabled={item.status === 'rejected'}
                                            onClick={() => {
                                                setEditItem(prev => !prev)
                                                setEditElement((prev) => {
                                                    return {
                                                        ...prev,
                                                        ...item
                                                    }
                                                })
                                            }}
                                            >Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            data.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td className="text-center border p-2">
                                            {index+1}
                                        </td>
                                        <td className="text-center border p-2">
                                            {item.model}
                                        </td>
                                        <td className="text-center border p-2">
                                            {item.owner}
                                        </td>
                                        <td className="text-center border p-2">
                                            {item.pricePerKm}
                                        </td>
                                        <td className="text-center border p-2 capitalize">
                                            {item.status}
                                        </td>
                                        <td className="border p-2 flex gap-3">
                                            <button className="btn btn-xs bg-green-500 text-white" 
                                            disabled={item.status === 'approved' || item.status === 'rejected'}
                                            onClick={() => vehicleStatusUpdateHandler(Number(item.id), 'approved')}
                                            >
                                                Approve
                                            </button>

                                            <button className="btn btn-xs bg-red-800 text-white" 
                                            disabled={item.status === 'approved' || item.status === 'rejected'}
                                            onClick={() => vehicleStatusUpdateHandler(Number(item.id), 'rejected')}
                                            >
                                                Reject
                                            </button>

                                            <button className="btn btn-xs bg-black text-white" 
                                            disabled={item.status === 'rejected'}
                                            onClick={() => {
                                                setEditItem(prev => !prev)
                                                setEditElement((prev) => {
                                                    return {
                                                        ...prev,
                                                        ...item
                                                    }
                                                })
                                            }}
                                            >Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <section className="ml-10 mb-10">
                    {
                        Array.from({length: totalPages}, (_, i) => i+1).map((page) => {
                            return (
                                <button key={page} 
                                onClick={() => {
                                    router.push({
                                        pathname: router.pathname,
                                        query: {...router.query, page}
                                    })
                                }}
                                className={`btn btn-md ${currentPage === page ? 'bg-blue-600 text-white' : ''}`}
                                >
                                    {page}
                                </button>
                            )
                        })
                    }
                </section>

            </section>
        </>

    )
}

