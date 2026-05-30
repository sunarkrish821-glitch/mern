import { useEffect } from "react";
import { PageTitle } from "../../components/page-title/PageTitle";
import { LoginForm } from "../../components/page-title/auth/LoginForm";
import { useAuth } from "../../lib/provider/hook/auth-hook";
import { useNavigate } from "react-router";


export default function LoginPage() {
    const {loggedInUser} = useAuth()
    const navigate = useNavigate();
    useEffect(() => {
     if(loggedInUser) [
        navigate (`/${loggedInUser.role}`)
     ]
    }, [])




    return (
        <section className="flex w-full h-screen items-center justify-center bg-gray-100">
        <div className="bg-white flex flex-col gap-10 w-4xl shadow-lg rounded-md p-10" >
              <PageTitle pageTitle = "Login Page" />
       <LoginForm />
        </div>
        </section>
       
    );
}