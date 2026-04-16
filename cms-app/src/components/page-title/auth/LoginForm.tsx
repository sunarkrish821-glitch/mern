import { FormLabel } from "../form/Label";
import { InputText } from "../form/InputText";
import { RedirectLink } from "../links/Urls";
import { CancelButton, SubmitButton } from "../buttons/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {type ICredentials, loginDTO} from "../../../types/auth-type";
import { useAuth } from "../../../lib/provider/hook/auth-hook";

export const LoginForm = () => {
    // data store and submit logic will be added later
    // state hook
    
    const navigate = useNavigate();
    const { login } = useAuth()

    const {control, handleSubmit, formState:{errors}} = useForm<ICredentials>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(loginDTO),
    })

    const submitForm = async(data: ICredentials) => {
        try {
            const userDetail = await login(data);
                 navigate("/"+userDetail?.role)
                } catch (exception: unknown) {
                    toast.error("Invalid or Wrong Credentials");
                    console.log(exception);
        }
    };

    return (
        // <form onSubmit={submitEvent} className="flex flex-col gap-5 w-full">
           <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-5 w-full">
            <div className="flex w-full items-center">
        <FormLabel>UserName:</FormLabel>
    <div className="w-full ">
         {/* <InputText type="email" name="username" control={control} errMsg={errors?.username?.message} /> */}
         <InputText type="text" name="username" control={control} errMsg={errors?.username?.message} />
    </div>
    </div>

    <div className="flex w-full items-center">
        <FormLabel>Password:</FormLabel>
    <div className="w-full ">
       <InputText type="password" name="password" control={control}  errMsg={errors?.password?.message} />
    </div>
    </div>
    <div className="flex w-full justify-end">
        <RedirectLink href="/forget-password">
            Forget Your Password?
        </RedirectLink>
    </div>

    <div className="flex w-full gap-3">
         <CancelButton> Cancel </CancelButton>
            <SubmitButton> Login </SubmitButton>
    </div>
        </form>
    )
};



// import { useState, type BaseSyntheticEvent } from "react";
// import z from "zod";
// import Cookies from "js-cookie";
// import axiosInstance from "../../../config/apiClient";


//     } catch (exception: any) {
//     // This will show the ACTUAL message from DummyJSON
//     const errorMessage = exception.response?.data?.message || "Connection Error";
//     toast.error(errorMessage); 
//     console.log("Error details:", exception.response?.data);
// }
//     }


            // const response = await fetch("https://dummyjson.com/auth/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(data),
            //     credentials: "include", // to include cookies in the request
            // });
            // const loginResponse = await response.json();
            
            // web storage(kind of a permanent storage) -> Cookies, localStorage, sessioonStorage
            // state management(global,  context or redux)
            // redirect
        //     navigate("/admin")



        //     console.log(loginResponse);




        // } catch (exception: unknown) {
            // console.error(exception.response.data.message);
            // alert(exception.response?.data?.message);
            // toast
            // const error = exception as {data: {message: string}}
            // toast.error(error?.data?.message)

    //         toast.error("Invalid or Wrong Credentials")

    //         console.log(exception)
    //     }
    // };



        // console.log(data);

        // const response = {
        //     // ....
        //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
        //};

            //To set Cookies
            // Cookies.set("authToken",response.token, { 
            //     expires: 7,
            //     secure: true,
            //     sameSite: "lax",
            //     // path: "/admin"
            //  });



            //  // local storage
            //     localStorage.setItem("authToken", response.token);
            //     sessionStorage.setItem("authToken", response.token);

            //  // logout Function
            //  Cookies.remove("authToken",{
            //     // path: "/",
            //  });

            //     localStorage.removeItem("authToken");
            //     sessionStorage.removeItem("authToken");



            //  caching (Redis)
            // firebased storage, AWS S3, Cloudinary -> for storing images and files
            



        

        // keep this token any where safe
        //
        // after login logic will be added later
        // BE willsend us a token -> auth token, jwt token , bearer token
        // header. payload, signature
        // we will store the token in local storage or cookie
        // and then we will use the token to access the protected routes



        // cookies -> http only cookie -> secure cookie -> same site cookie
    //     document.cookie = `token=${response.token}; expires=${new Date()}; path=/admin; `;
    //     const cookie = document.cookie;   // "token=eyJhb"
    //     console.log(cookie);
    // }

// const [credentials, setCredentials] = useState<ICredentials>({
//     username: "",
//     password: "",
// });


// const handleChange = (e: BaseSyntheticEvent) => {
//             const {name, value} = e.target;
//             setCredentials({
//                 ...credentials,
//                 [name]: value,
//             });
//         };

//             // const submitEvent = (formdata: FormData) => {
//             //     // e.preventDefault();
//             //     // validate
//             //     // submit logic will be added later
//             //     console.log(formdata.get("username"), formdata.get("password"));
//             // }


//             const submitEvent = (e: BaseSyntheticEvent) => {
//                 e.preventDefault();
//                 // validate
//                 // submit logic will be added later
//                 console.log(credentials);
//             }

