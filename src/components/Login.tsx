import google from '../assets/img/google.png';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="container h-2 max-w-md mx-auto mt-16 md:mt-16">
            <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>
            <p className="mt-4 mb-10 text-sm font-semibold text-center">Please enter your details</p>
            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <input type="email" className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" name="email" placeholder="Enter your email" />
            </div>

            <div className="flex flex-col my-5 space-y-2">
                <label htmlFor="password" className="text-sm font-semibold">Password</label>
                <input type="password" className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" name="password" placeholder="Enter your password" />
            </div>
            <div className='my-2 text-cs-light-green hover:text-cs-green'>
              <a href="/reset" className='text-xs font-semibold'>Forgot password ?</a>
            </div>
            <button className="w-full p-3 mt-4 text-sm font-semibold text-white rounded-md bg-cs-light-green hover:bg-cs-green">Sign In</button>
            <button className="flex items-center justify-center w-full p-3 mt-4 space-x-3 text-sm font-semibold border rounded-md text-cs-light-green border-cs-green">
                <img src={google} alt="google" className='w-5' />
                <span>Sign In With Google</span>
            </button>
        
            <p className="mt-6 text-sm text-center">
                Don't have an account? <Link to={"/register"} className="font-semibold text-cs-light-green" >Sign Up</Link>
            </p>
                
    </div>
                
  )
}

