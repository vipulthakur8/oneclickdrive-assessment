import { ChangeEvent, FormEvent } from "react";


export default function EditVehicleForm(
    {item, changeHandler, closeForm, editElementSubmitHandler, notification}: 
    {
        item: Record<string, string | number>, changeHandler: (e: ChangeEvent<HTMLInputElement>) => void, closeForm: () => void,
        editElementSubmitHandler: (e: FormEvent) => void,
        notification: {type: 'success' | 'error' | 'pending' | null, message: string}
    }
) {
    return (
        <section className="bg-white w-[90%] md:w-1/3 px-2 py-5 rounded-lg">
            <h1 className="text-center text-2xl font-semibold">Edit Vehicle Information</h1>
            <form>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Owner Name</span>
                    <input type="text" name="owner" value={item.owner} className="input w-full" onChange={changeHandler}/>
                </label>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Model</span>
                    <input type="text" name="model" value={item.model} className="input w-full capitalize" onChange={changeHandler}/>
                </label>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Price per kilometer (Rupee)</span>
                    <input type="text" name="pricePerKm" value={item.pricePerKm} className="input w-full" onChange={changeHandler}/>
                </label>
                <label className="flex flex-col gap-1 pb-2">
                    <span>Status</span>
                    <input type="text" name="" value={item.status} className="input w-full capitalize" disabled/>
                </label>
                <div className="w-fit mx-auto">
                    <button onClick={closeForm} className="btn btn-sm bg-red-700 text-white">Cancel</button>
                    <button onClick={editElementSubmitHandler} className="btn btn-sm bg-slate-900 text-slate-300">
                        {
                            notification.type === 'pending' ? 'Submitting...' : 'Submit'
                        }
                    </button>
                </div>
            </form>
        </section>
    )
}