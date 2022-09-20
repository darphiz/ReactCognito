import {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import {SERVER_URL} from '../index';
import toast from 'react-hot-toast';

interface Ilocation  {
    email: string;
}


export const Verify = () => {
    const [code, setCode] = useState<string>('')
    //get email from url params react router

    const location_data = useLocation();
    const navigate = useNavigate();

    let email:string;
    if (location_data.state) {
        email = (location_data.state as Ilocation).email;
    }
    else {
        email = '';
    }


    const verifyEmail = async (e: React.MouseEvent) => {
        e.preventDefault();
        const res:Promise<Response>  = fetch(`${SERVER_URL}/api/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                code
            })
        });

        toast.loading('Verifying');
    try{
        const data = await( await res).json();
        
        if (data.status === 'ok') {
            toast.dismiss();
            toast.success(data.message);
            navigate('/');
        }
        else {
            toast.dismiss();
            toast.error(data.message);
        }

    }
        catch (err) {
            toast.dismiss();
            toast.error('Something went wrong. Retry');
        }
    }

    return (
    <div className="container h-2 max-w-md mx-auto mt-16 md:mt-16">
        <h2 className="text-3xl font-semibold text-center">Verify Your Email Address </h2>
        {email ? <p className="mt-4 mb-10 text-sm font-semibold text-center">We have sent a verification code to {email}</p> : null}
        
        <div className="flex flex-col mt-16">
            <input 
                type="number"  
                onInput={(e) => setCode(e.currentTarget.value)}
                className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" name="code" placeholder="Enter 6 digits code" />
        </div>
        <button
            disabled={code.length !== 6 || !email}
            onClick={verifyEmail}
            className="w-full p-3 mt-4 text-sm font-semibold text-white rounded-md bg-cs-light-green disabled:opacity-50 active:hover:bg-cs-green">
            Verify
        </button>        
    </div>

  )
}
