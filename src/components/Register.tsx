import google from '../assets/img/google.png';
import { Link } from 'react-router-dom';


export const Register = () => {
  return (
    <div className="container max-w-md mx-auto mt-10 md:mt-7 h-2">
            <h2 className="text-center text-3xl font-semibold">Become a member</h2>
            <p className="text-center text-sm font-semibold mt-4 mb-10">Please enter your details</p>
            
            <div className="flex space-y-2 mb-4 flex-col">
                <label htmlFor="full_name" className="font-semibold text-sm">Full Name</label>
                <input type="text" className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" name="full_name" placeholder="Enter your full name" />
            </div>

            <div className="flex space-y-2 flex-col">
                <label htmlFor="email" className="font-semibold text-sm">Email</label>
                <input type="email" className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" name="email" placeholder="Enter your email" />
            </div>

            <div className="flex my-3 space-y-2 flex-col">
                <label htmlFor="password" className="font-semibold text-sm">Password</label>
                <input type="password" className="w-full p-2 rounded-md border border-gray-400 placeholder:text-sm outline-cs-green" name="password" placeholder="Enter your password" />
            </div>

            <button className="bg-cs-light-green w-full mt-4 hover:bg-cs-green rounded-md text-white font-semibold text-sm p-3">Sign Up</button>
            <button className="text-cs-light-green w-full mt-4 flex items-center justify-center space-x-3 p-3 rounded-md font-semibold border border-cs-green text-sm">
                <img src={google} alt="google" className='w-5' />
                <span>Sign Up With Google</span>
            </button>
            <div className='my-6'>
                <p className="text-sm text-center">
                    Already have an account? <Link to={"/"} className="font-semibold" >Sign In</Link>
                </p>
            </div>
    </div>
                
  )
}

