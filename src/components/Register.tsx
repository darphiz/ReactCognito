import { Link, NavigateFunction } from 'react-router-dom';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {SERVER_URL} from '../index';
import { useNavigate  } from 'react-router-dom';



interface IRegisterField {
    value : string;
    error : string;
}

interface IError {
    msg : string;
    param: string;
    location: string;
} 


export interface IResponse extends Response{
    errors : Array<IError>;
    message : string;
    oauth_url : string;
    redirect_message : string;
}


export const Register = () => {
    const navigate:NavigateFunction = useNavigate();    
    const [email, setEmail] = useState<IRegisterField>({
        value: '',
        error: ''
    });
    

    const [password, setPassword] = useState<IRegisterField>({
        value: '',
        error: ''
    });

    const [fullName, setFullName] = useState<IRegisterField>({
        value: '',
        error: ''
    });
  



    const validPassword = (password:string) =>{
        const regex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (regex.test(password)) {
            setPassword({
                value: password,
                error: ''
            });
        } 
            
        else {
            setPassword({
                value: password,
                error: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
            });
        }
    }


    const validateEmail = (email:string) => {
        const regex:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            setEmail({
                value: email,
                error: ''
            });
        } 
            
        else {
            setEmail({
                value: email,
                error: 'Enter a valid email address'
            });
        }
    }

    const buttonDisabled = ():boolean => {
        if (!email.error && !password.error && email.value && password.value && fullName.value) {
            return false;
        } 
        else {
            return true;
        }
    } 


   
    const submitForm = async (e: React.MouseEvent) => {
        e.preventDefault();

        const response:Promise<Response> = fetch(`${SERVER_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',

            body: JSON.stringify({
                email: email.value,
                password: password.value,
                full_name: fullName.value
            })
        }
        )

        toast.loading('Submitting');
        try{
            const data:IResponse = await (await response).json();
            toast.dismiss();
            if ((data.status as unknown) === 'ok') {
                toast.success('Finish setting up your account');
                navigate('/verify', {state: {email: email.value}});
            } 
            else {
                if (data.errors){
                    data.errors.forEach((error) => {
                        switch (error.param) {
                            
                            case 'email':
                                setEmail({
                                    value: email.value,
                                    error: error.msg
                                });
                                break;
                            case 'password':
                                setPassword({
                                    value: password.value,
                                    error: error.msg
                                });
                                break;
                            case 'full_name':
                                setFullName({
                                    value: fullName.value,
                                    error: error.msg
                                });

                                break;
                            default:
                                toast.error('Something went wrong');
                                break;
                        }
                    });
                }
                else{
                    toast.error(data.message);
                    
                }
            }
        }
        catch {
            toast.dismiss();
            toast.error('Something went wrong');
        }
    }    


    return (
    <div className="container max-w-md mx-auto mt-10 md:mt-7 h-2">
            <h2 className="text-center text-3xl font-semibold">Become a member</h2>
            <p className="text-center text-sm font-semibold mt-4 mb-10">Please enter your details</p>
            
            <div className="flex space-y-2 mb-4 flex-col">
                <label htmlFor="full_name"  className="font-semibold text-sm">Full Name</label>
                <input 
                    type="text"  
                    value = {fullName.value}
                    onInput ={(e) =>{setFullName({...fullName, value: e.currentTarget.value, error: ''})}}
                    className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" 
                    name="full_name" 
                    placeholder="Enter your full name" 
                />

                {fullName.error && <p className="text-yellow-500 text-xs">{fullName.error}</p>}
            </div>

            <div className="flex space-y-2 flex-col">
                <label htmlFor="email" className="font-semibold text-sm">Email</label>
                <input 
                    type="email" 
                    value={email.value}
                    onInput={(e) => {validateEmail(e.currentTarget.value)}}
                    className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" 
                    name="email" 
                    placeholder="Enter your email" 
                />
                {email.error && <p className="text-yellow-600 text-xs">{email.error}</p>}

            </div>

            <div className="flex my-3 space-y-2 flex-col">
                <label htmlFor="password" className="font-semibold text-sm">Password</label>
                <input 
                    type="password" 
                    value={password.value}
                    onInput={(e) => {validPassword(e.currentTarget.value)}}
                    className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" 
                    name="password" 
                    placeholder="Enter your password" 
                />
                { password.error && <p className="text-yellow-600 text-xs">{password.error}</p>}

            </div>

            <button 
                type="submit"
                onClick={submitForm}
                disabled={buttonDisabled()}
                className="bg-cs-light-green w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed  enabled:hover:bg-cs-green rounded-md text-white font-semibold text-sm p-3">
                    Sign Up
            </button>
            
            <div className='my-6'>
                <p className="text-sm text-center">
                    Already have an account? <Link to={"/"} className="font-semibold" >Sign In</Link>
                </p>
            </div>
    </div>
                
  )
}

