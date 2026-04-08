import { InputText } from "../../assets/components/page-title/form/InputText";
import { PageTitle } from "../../assets/components/page-title/PageTitle";

export const PageDescription = () => {
    return (
        <form action="" className="flex flex-col gap-5 w-full ">
                <div className="flex w-full items-center">
        <label
        className="w-1/3 font-semibold text-lg" 
        htmlFor="username">
            Username: {" "}
            </label>
    
    <div className="w-full ">
        < InputText type="email" name="username"/>
        {/* < InputText name="email" type="email" placeholder="Enter your Username" /> */}
        {/* <input className="w-full border border-gray-200 p-2 rounded-md shadow" 
        type="email" name="username" 
        placeholder="Enter your username...... "/> */}
    </div>
    </div>

    <div className="flex w-full items-center">
         <label className="w-1/3 font-semibold text-lg" 
         htmlFor="password">
            Password:{" "}
            </label>
    
    <div className="w-full ">
           {/* < InputText name="password" type="password" placeholder="Enter your Password" /> */}
         <input 
         className="w-full border border-gray-200 p-2 rounded-md shadow"
         type="password"
         name="password"
         placeholder="Enter your password......" />
    </div>
    </div>
    <div className="flex w-full justify-end">
          <a className="text-teal-700 italic underline font-sm hover:text-teal-700/60 transition hover:scale-96" 
          href="/forget-password">
            Forget your Password?
            </a>
    </div>
    <div className="flex w-full gap-3">
         <button className="w-full text-white rounded-md cursor-pointer transition hover:bg-red-800/70 p-2 bg-red-800" type="reset"> Cancel </button>
         <button className="w-full text-white rounded-md cursor-pointer transition hover:bg-teal-800/70 p-2 bg-teal-800" type="submit"> Submit </button>
        
    </div>
        </form>);
}





export default function LoginPage() {
    return (
        <section className="flex w-full h-screen items-center justify-center bg-gray-100">
        <div className="bg-white flex flex-col gap-10 w-4xl shadow-lg rounded-md p-10" >
              <PageTitle pageTitle = "Login Page" />
       <PageDescription />
        </div>
        </section>
       
    );
}