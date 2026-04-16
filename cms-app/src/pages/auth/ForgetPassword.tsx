import { PageTitle } from "../../components/page-title/PageTitle";
import ForgetPasswordForm from "../../components/page-title/auth/ForgetPasswordForm";

export default function ForgetPasswordPage() {
    return (
        <section className="flex w-full h-screen items-center justify-center bg-gray-100">
        <div className="bg-white flex flex-col gap-10 w-4xl shadow-lg rounded-md p-10" >
              <PageTitle className="text-left text-emerald-900 ">Request for new Password Change?</PageTitle>
                <ForgetPasswordForm />
        </div>
        </section>
       
    );
}