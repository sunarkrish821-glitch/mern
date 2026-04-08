import { PageTitle } from "../../assets/components/page-title/PageTitle";


export const ForgetPasswordForm = () => {
    return (
        <form action="" className="flex flex-col gap-5 w-full ">
                <div className="flex w-full items-center">
        <label
        className="w-1/3 font-semibold text-lg" 
        htmlFor="username">
            Username: {" "}
            </label>
    
    <div className="w-full ">
        <input className="w-full border border-gray-200 p-2 rounded-md shadow" 
        type="email" name="username" 
        placeholder="Enter your username...... "/>
    </div>
    </div>

    <div className="flex w-full gap-3">
         <button className="w-full text-white rounded-md cursor-pointer transition hover:bg-teal-800/70 p-2 bg-teal-800" type="submit"> Submit </button>
        
    </div>
        </form>
        );
}





export default function ForgetPasswordPage() {
    return (
        <section className="flex w-full h-screen items-center justify-center bg-gray-100">
        <div className="bg-white flex flex-col gap-10 w-4xl shadow-lg rounded-md p-10" >
              <PageTitle className="text-left text-emerald-900 ">
                Request for new Password Change?
              </PageTitle>
       <ForgetPasswordForm />
        </div>
        </section>
       
    );
}