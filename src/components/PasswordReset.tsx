import toast from "react-hot-toast"
import {useState} from "react"
import { SERVER_URL } from "..";
import { IResponse } from "./Register";
import { useNavigate } from "react-router-dom";


export const PasswordReset = () => {
  const [email, setEmail] = useState<string>("")
  const navigate = useNavigate();

  const validateEmail = (email:string) => {
    const regex:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }


  const resetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res:Promise<Response> =  fetch(`${SERVER_URL}/api/auth/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
      }),
    });

    toast.loading("Resseting password");
  try{

      const data:IResponse = await (await res).json();
      
      if ((data.status as unknown) === "ok") {
        toast.dismiss();
        toast.success("Check your email for a password reset link");
        navigate('/setpassword', {state: {email: email}});
      } else {
        toast.dismiss();
        toast.error(data.message ? data.message : "Invalid email");
      }
    }
    catch(err){
      toast.dismiss();
      toast.error("Something went wrong. Retry");
    };
}
  
  return (
    <div className="container h-2 max-w-md mx-auto mt-16 md:mt-16">
        <h2 className="text-3xl font-semibold text-center">Reset Your Password</h2>
        <p className="mt-4 mb-10 text-sm font-semibold text-center">Please enter the email associated with your account</p>
        <div className="flex flex-col mt-16">
            <input 
              type="email" 
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" 
              name="email" 
              placeholder="Enter your email" 
              />
        </div>
        <button 
            onClick={resetPassword}
            disabled={!validateEmail(email)}
            className="w-full p-3 mt-4 text-sm font-semibold text-white rounded-md bg-cs-light-green disabled:opacity-50 active:hover:bg-cs-green">
            Reset
        </button>        
    </div>

  )
}
