import {Login}  from "./Login"
import {Register}  from "./Register"
import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route
} from "react-router-dom";
import { PasswordReset } from "./PasswordReset";
import { Verify } from "./Verify";
import { NewPassword } from "./NewPassword";



export const Auth = () => {
  return (
    <div className="min-h-screen font-Poppins text-cs-green">
       <Toaster position="top-center" reverseOrder={true} />
        <div className="grid grid-cols-7 bg-cs-bg">
            <div className="min-h-screen col-span-7 p-6 md:col-span-4">
                <h2 className="text-2xl font-bold font-Pacifico"><a href="/">Files.com</a></h2>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset" element={<PasswordReset />} />
                    <Route path='/verify' element={<Verify />} />
                    <Route path='/setpassword' element={<NewPassword />} />
                  </Routes>                
            </div>
            <div className="hidden h-full bg-no-repeat bg-cover md:col-span-3 md:block bg-cs-image"></div>
        </div>
    </div>
  )
}