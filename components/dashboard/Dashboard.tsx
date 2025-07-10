import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditVehicleForm from "./EditVehicleForm";

export default function Dashboard(
    {vehicleData, totalVehicles, currentPage, totalPages}:
    {totalVehicles: number, vehicleData: Array<Record<string, string | number>>, currentPage: number, totalPages: number}
) {
    const { status } = useSession();
    const router = useRouter();

    console.log("currentPage, totalPages", currentPage, totalPages);

    // const [data, setData] = useState(vehicleData)
    const [filter, setFilter] = useState<string>('')

    console.log("totalVehicles", totalVehicles);

    const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/');
        }
    }, [status, router])

    console.log("editItem", editItem);

    return (
        <>
            {
                editItem && 
                <div className="fixed w-[100%] h-[100%] bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
                    <EditVehicleForm item={editItem} 
                    changeHandler={() => {
                        console.log("edit change handler")
                    }} 
                    closeForm={() => setEditItem(null)}
                    />
                </div>
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
                            vehicleData.filter(item => item.status === filter).map((item, index) => {
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
                                            disabled={item.status === 'approved' || item.status === 'rejected'}>Approve</button>
                                            <button className="btn btn-xs bg-red-800 text-white" 
                                            disabled={item.status === 'approved' || item.status === 'rejected'}>Reject</button>
                                            <button className="btn btn-xs bg-black text-white" 
                                            disabled={item.status === 'rejected'}
                                            onClick={() => setEditItem(item)}
                                            >Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            vehicleData.map((item, index) => {
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
                                            disabled={item.status === 'approved' || item.status === 'rejected'}>Approve</button>
                                            <button className="btn btn-xs bg-red-800 text-white" 
                                            disabled={item.status === 'approved' || item.status === 'rejected'}>Reject</button>
                                            <button className="btn btn-xs bg-black text-white" 
                                            disabled={item.status === 'rejected'}
                                            onClick={() => setEditItem(item)}
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

