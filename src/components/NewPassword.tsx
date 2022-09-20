import toast from "react-hot-toast"
import {useState} from "react"
import { SERVER_URL } from "..";
import { IResponse } from "./Register";
import { useNavigate, useLocation, Location } from "react-router-dom";

interface ILocation extends Location {
    email: string;
}



export const NewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const location = useLocation();
    let email:string;
    
    if (location.state && (location.state as ILocation).email) {
        email = (location.state as ILocation).email;
    } else {
        email = '';
        navigate('/', {replace: true});
    }
    
    
    const validPassword = (password:string) =>{
        const regex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }


    const setNewPassword = async (e:React.MouseEvent) => {
        e.preventDefault();
        const res:Promise<Response> = fetch(`${SERVER_URL}/api/auth/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                code,
                password
            })
        });

        toast.loading('Setting new password');
        try {
            const data:IResponse = await (await res).json();
            if ((data.status as unknown) === 'ok') {
                toast.dismiss();
                toast.success(data.message);
                navigate('/');
            }
            else {
                toast.dismiss();
                toast.error(data.message ? data.message : 'Invalid credentials');
            }
        }
        catch (err) {
            toast.dismiss();
            toast.error('Something went wrong. Retry');
        }
    }


    

  return (
    <div className="container h-2 max-w-md mx-auto mt-16 md:mt-16">
        <h2 className="text-3xl font-semibold text-center">Enter New Password</h2>
        <p className="mt-4 mb-10 text-sm font-semibold text-center">Enter the activation code send to {email} and the new password</p>
        <div className="flex flex-col mt-16">
            <input 
                value={code}
                onInput={(e) => setCode(e.currentTarget.value)}
              type="number" 
              className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" 
              name="code" 
              placeholder="Enter your the 6 digits code sent to your mail" 
              />

        </div>

        <div className="flex flex-col mt-4">
            <input 
              type="password" 
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
              className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" 
              name="password" 
              placeholder="Enter new password" 
              />

                {password.length > 0 && !validPassword(password) && (
                    <p className="text-xs text-yellow-600">Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character</p>
                )}


        </div>

        <button 
            disabled={!validPassword(password) || code.length !== 6}
            onClick={setNewPassword}
            className="w-full p-3 mt-4 text-sm font-semibold text-white rounded-md bg-cs-light-green disabled:opacity-50 active:hover:bg-cs-green">
            Change Password
        </button>        
    </div>

  )
}
