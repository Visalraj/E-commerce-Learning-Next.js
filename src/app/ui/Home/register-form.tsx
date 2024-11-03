'use server';
import { CreateButtonComponent } from "../customer/components/create-button";
export default async function CustomerRegForm() {
    return (
        <form className="bg-gray-300 p-3 w-fit m-auto rounded top-10 relative">
            <div className="create-label">
                <h1 className="font-extrabold text-2xl text-center">Whoo!! Fill out this fields</h1>
            </div>
            <div className="inputFields mt-5 flex">
                <div className="wrap-field-one">
                    <label htmlFor="Customer Name" className="label-class w-full">Firstname</label>
                    <input type="text" name="customer_fname" className="w-full p-2 rounded-sm border outline-none focus:border-gray-400 bg-gray-100" />

                </div>
                <div className="wrap-field-two ml-14">
                    <label htmlFor="Customer Name" className="label-class w-full">Lastname</label>
                    <input type="text" name="customer_lname" className="w-full p-2 rounded-sm border outline-none focus:border-gray-400 bg-gray-100" />
                </div>

            </div>
            <div className="inputFields mt-5 flex">
                <div className="wrap-field-one">
                    <label htmlFor="Customer Name" className="label-class w-20">Age</label>
                    <input type="number" name="customer_age" className="w-full p-2 rounded-sm border outline-none focus:border-gray-400 bg-gray-100" />
                </div>
                <div className="wrap-field-two ml-14">
                    <label htmlFor="Customer Name" className="label-class" style={{ width: "58px" }}>Email</label>
                    <input type="email" name="customer_lname" className="w-full p-2 rounded-sm border outline-none focus:border-gray-400 bg-gray-100" />
                </div>
            </div>
            <div className="inputFields mt-5 flex">
                <div className="wrap-field-two ml-2">
                    <label htmlFor="Customer Name" className="label-class" >Address</label>
                    <textarea className="border outline-none focus:border-gray-400 bg-gray-100" name="" id="" style={{ display: "block" }} cols={66}></textarea>
                </div>
            </div>
            <div className="inputFields mt-5 flex justify-end">
                <CreateButtonComponent />
            </div>
        </form>
    )
}