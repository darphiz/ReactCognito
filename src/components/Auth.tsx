import {Login}  from "./Login"
import {Register}  from "./Register"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



export const Auth = () => {
  return (
    <div className="font-Poppins text-cs-green min-h-screen">
        <div className="grid grid-cols-7 bg-cs-bg">
            <div className="col-span-7 p-6 md:col-span-4 min-h-screen">
                <h2 className="font-bold font-Pacifico text-2xl"><a href="/">Files.com</a></h2>
                <Router>
                    <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                </Router>
                
            </div>
            <div className="hidden md:col-span-3 md:block h-full bg-cs-image bg-cover bg-no-repeat"></div>
        </div>
    </div>
  )
}