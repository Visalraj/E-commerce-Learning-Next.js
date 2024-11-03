'use server';
export default async function CustomerRegForm() {
    return (
        <form className="bg-slate-300 p-3 w-fit m-auto rounded top-10 relative">
            <div className="create-label">
                <h1 className="font-extrabold text-2xl text-center">Whoo!! Fill out this fields</h1>
            </div>
            <div className="inputFields mt-5 flex">
                <div className="wrap-field-one">
                    <label htmlFor="Customer Name" className="label-class w-full">Firstname</label>
                    <input type="text" name="customer_fname" className="w-full p-2 rounded-sm" />
                </div>
                <div className="wrap-field-two ml-14">
                    <label htmlFor="Customer Name" className="label-class w-full">Lastname</label>
                    <input type="text" name="customer_lname" className="w-full p-2 rounded-sm" />
                </div>

            </div>
            <div className="inputFields mt-5 flex">
                <div className="wrap-field-one">
                    <label htmlFor="Customer Name" className="label-class w-20">Age</label>
                    <input type="text" name="customer_age" className="w-full p-2 rounded-sm" style={{ width: "30px" }} />
                </div>
                <div className="wrap-field-two ml-14">
                    <label htmlFor="Customer Name" className="label-class" style={{ width: "58px" }}>Email</label>
                    <input type="email" name="customer_lname" className="w-full p-2 rounded-sm" />
                </div>
            </div>
            <div className="inputFields mt-5 flex">
                <div className="wrap-field-two ml-2">
                    <label htmlFor="Customer Name" className="label-class" >Address</label>
                    <textarea name="" id="" style={{ display: "block" }} cols={66}></textarea>
                </div>
            </div>

        </form>
    )
}