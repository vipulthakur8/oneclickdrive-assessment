

export default function EditVehicleForm(
    {item, changeHandler, closeForm}: 
    {item: Record<string, string | number>, changeHandler: () => void, closeForm: () => void}
) {
    return (
        <section className="bg-white w-[90%] md:w-1/3 px-2 py-5 rounded-lg">
            <h1 className="text-center text-2xl font-semibold">Edit Vehicle Information</h1>
            <form>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Owner Name</span>
                    <input type="text" value={item.owner} className="input w-full"/>
                </label>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Model</span>
                    <input type="text" value={item.model} className="input w-full capitalize"/>
                </label>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Price per kilometer (Rupee)</span>
                    <input type="text" value={item.pricePerKm} className="input w-full"/>
                </label>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Status</span>
                    <input type="text" value={item.status} className="input w-full capitalize" disabled/>
                </label>
                <div className="w-fit mx-auto">
                    <button onClick={closeForm} className="btn btn-sm bg-red-700 text-white">Cancel</button>
                    <button className="btn btn-sm bg-slate-900 text-slate-300">Submit</button>
                </div>
            </form>
        </section>
    )
}