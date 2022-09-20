import google from '../assets/img/google.png';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {IResponse} from './Register';
import {SERVER_URL} from '../index';
import toast from 'react-hot-toast';
import { useNavigate, useLocation, Location } from 'react-router-dom';

interface ILocation extends Location {
    redirect_message: string;
}

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const location:Location = useLocation();
  

  useEffect(()=>{

    (
      ()=>{
    try{    
        fetch(`${SERVER_URL}/api/auth/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      }).then((res) => {
        if (res.statusText === "OK") {
          navigate('/drive', {replace: true});
        }
      })
    
    }

    catch{

    }

    }

    )();

  }, [navigate])



  useEffect(() => {
    if (location.state && (location.state as ILocation).redirect_message) {
      const {redirect_message} = location.state as {redirect_message: string};
      toast.error(redirect_message);
      navigate(location.pathname, {}); //clear state
    }
  }, [location.state, navigate, location.pathname]);


  const instantiateLogin = async (e: React.MouseEvent) => {
      e.preventDefault();
      const res:Promise<Response> = fetch(`${SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      });

      toast.loading('Logging in');

      try{

        const data:IResponse = await (await res).json();


        if ((data.status as unknown) === 'ok') {
            toast.dismiss();    
            toast.success('Logged in');
            navigate('/drive');
        } 
        else {
          toast.dismiss();
          toast.error(data.message ? data.message : 'Invalid Credentials');
        }

      }
      catch{
        toast.dismiss();
        toast.error('Something went wrong. Retry');
      }

    };


    const googleSignIn = async (e: React.MouseEvent) => {
      e.preventDefault();
      const res:Promise<Response> = fetch(`${SERVER_URL}/api/google/login`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      toast.loading('Logging in');

      const data:IResponse = await (await res).json();


      if ((data.status as unknown) === 'ok') {
          toast.dismiss();    
          const {oauth_url} = data;
          if (!oauth_url) {
            toast.error('Something went wrong. Retry');
            return;
          }
          window.location.href = oauth_url;
      } 
      else {
        toast.dismiss();
        toast.error(data.message ? data.message : 'An error occurred');
      }

    }


  return (
    <div className="container h-2 max-w-md mx-auto mt-16 md:mt-10">
            <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>
            <p className="mt-4 mb-10 text-sm font-semibold text-center">Please enter your details</p>
            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <input 
                  type="email"
                  onInput={(e)=> setEmail(e.currentTarget.value)} 
                  value={email} 
                  className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" name="email" placeholder="Enter your email" 
                />
            </div>

            <div className="flex flex-col my-5 space-y-2">
                <label htmlFor="password" className="text-sm font-semibold">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onInput={(e)=> setPassword(e.currentTarget.value)}
                  className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" name="password" placeholder="Enter your password" 
                />
            </div>
            <div className='my-2 text-cs-light-green hover:text-cs-green'>
              <Link to="/reset" className='text-xs font-semibold'>Forgot password ?</Link>
            </div>
            <button
              onClick={instantiateLogin} 
              disabled={email.length === 0 || password.length === 0}
              className="w-full p-3 mt-4 text-sm font-semibold text-white rounded-md bg-cs-light-green disabled:opacity-50  active:hover:bg-cs-green"
            >Sign In</button>
            <button  
                onClick={googleSignIn}
                className="flex items-center justify-center w-full p-3 mt-4 space-x-3 text-sm font-semibold border rounded-md text-cs-light-green border-cs-green">
                <img src={google} alt="google" className='w-5' />
                <span>Sign In With Google</span>
            </button>
        
            <p className="mt-6 text-sm text-center">
                Don't have an account? <Link to={"/register"} className="font-semibold text-cs-light-green" >Sign Up</Link>
            </p>
                
    </div>
                
  )
}

