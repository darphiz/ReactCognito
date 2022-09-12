import google from '../assets/img/google.png';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="container max-w-md mx-auto mt-16 md:mt-16 h-2">
            <h2 className="text-center text-3xl font-semibold">Welcome Back</h2>
            <p className="text-center text-sm font-semibold mt-4 mb-10">Please enter your details</p>
            <div className="flex space-y-2 flex-col">
                <label htmlFor="email" className="font-semibold text-sm">Email</label>
                <input type="email" className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" name="email" placeholder="Enter your email" />
            </div>

            <div className="flex my-5 space-y-2 flex-col">
                <label htmlFor="password" className="font-semibold text-sm">Password</label>
                <input type="password" className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" name="password" placeholder="Enter your password" />
            </div>

            <button className="bg-cs-light-green w-full mt-4 hover:bg-cs-green rounded-md text-white font-semibold text-sm p-3">Sign In</button>
            <button className="text-cs-light-green w-full mt-4 flex items-center justify-center space-x-3 p-3 rounded-md font-semibold border border-cs-green text-sm">
                <img src={google} alt="google" className='w-5' />
                <span>Sign In With Google</span>
            </button>
        
            <p className="text-sm text-center mt-6">
                Don't have an account? <Link to={"/register"} className="font-semibold text-cs-light-green" >Sign Up</Link>
            </p>
                
    </div>
                
  )
}

