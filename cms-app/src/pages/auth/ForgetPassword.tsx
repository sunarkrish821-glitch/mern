import { PageTitle } from "../../components/page-title/PageTitle";
import ForgetPasswordForm from "../../components/page-title/auth/ForgetPasswordForm";
import { useEffect } from "react";
import { useAuth } from "../../lib/provider/hook/auth-hook";
import { useNavigate } from "react-router";

export default function ForgetPasswordPage() {
    const {loggedInUser} = useAuth()
        const navigate = useNavigate();
        useEffect(() => {
         if(loggedInUser) [
            navigate(`/${loggedInUser.role}`)
         ]
        }, [])
    return (
        <section className="flex w-full h-screen items-center justify-center bg-gray-100">
        <div className="bg-white flex flex-col gap-10 w-4xl shadow-lg rounded-md p-10" >
              <PageTitle className="text-left text-emerald-900 ">Request for new Password Change?</PageTitle>
                <ForgetPasswordForm />
        </div>
        </section>
       
    );
}