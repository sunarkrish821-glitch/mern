import { PageTitle } from "../../components/page-title/PageTitle";
import { LoginForm } from "../../components/page-title/auth/LoginForm";


export default function LoginPage() {
    return (
        <section className="flex w-full h-screen items-center justify-center bg-gray-100">
        <div className="bg-white flex flex-col gap-10 w-4xl shadow-lg rounded-md p-10" >
              <PageTitle pageTitle = "Login Page" />
       <LoginForm />
        </div>
        </section>
       
    );
}