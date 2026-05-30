import { LuArrowLeft, LuInfo } from "react-icons/lu";
import { PageTitle } from "../../components/page-title/PageTitle";




export default function NotFound({url="/"}:Readonly<{url?: string}>) {
    return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-200">
             <div className="w-3xl p-5 rounded-md bg-white shadow flex flex-col items-center gap-5">
               <LuInfo className="size-10 text-red-500 "/>
               <PageTitle className="text-red-800">404 Page Not Found</PageTitle>
               <p className="text-red-900 text-lg font-semibold">
                The page you are looking for does not exist!!!
               </p>

               <a href={url} className="w-full flex items-center justify-center p-3 border border-red-800 rounded-full text-lg text-red-800 hover:bg-red-100 transition duration-500 hover:scale-96">
               <LuArrowLeft/>
               Go Back
               
               </a>
             </div>
    </section>
    );
}