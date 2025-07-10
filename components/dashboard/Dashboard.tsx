import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditVehicleForm from "./EditVehicleForm";

const dummyListing = [
    {
        id: 1,
        model: 'Honda civic',
        owner: 'Mario',
        pricingPerKm: 21,
        status: 'pending'
    },
    
    {
        id: 2,
        model: 'Honda civic',
        owner: 'Mario',
        pricingPerKm: 21,
        status: 'pending'
    },
    {
        id: 3,
        model: 'Honda civic',
        owner: 'Mario',
        pricingPerKm: 21,
        status: 'pending'
    },
    {
        id: 4,
        model: 'Honda civic',
        owner: 'Mario',
        pricingPerKm: 21,
        status: 'rejected'
    },
    {
        id: 5,
        model: 'Honda civic',
        owner: 'Mario',
        pricingPerKm: 21,
        status: 'pending'
    },
    {
        id: 6,
        model: 'Honda civic',
        owner: 'Mario',
        pricingPerKm: 21,
        status: 'approved'
    }
]

export default function Dashboard() {
    const { status } = useSession();
    const { replace } = useRouter();

    const [data, setData] = useState(dummyListing)
    const [filter, setFilter] = useState<string>('')

    const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null)

    useEffect(() => {
        if (status === 'unauthenticated') {
            replace('/');
        }
    }, [status, replace])

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

                <table className="border w-[95%] mx-auto">
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
                                            {item.pricingPerKm}
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
                                            {item.pricingPerKm}
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

            </section>
        </>

    )
}