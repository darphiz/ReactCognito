import toast from "react-hot-toast"

const notify = () => toast.success("Check your email for a password reset link");

export const PasswordReset = () => {
  return (
    <div className="container h-2 max-w-md mx-auto mt-16 md:mt-16">
        <h2 className="text-3xl font-semibold text-center">Reset Your Password</h2>
        <p className="mt-4 mb-10 text-sm font-semibold text-center">Please enter the email associated with your account</p>
        <div className="flex flex-col mt-16">
            <input type="email" className="w-full p-2 border border-gray-400 rounded-md placeholder:text-sm outline-cs-green" name="email" placeholder="Enter your email" />
        </div>
        <button 
            onClick={notify}
            className="w-full p-3 mt-4 text-sm font-semibold text-white rounded-md bg-cs-light-green hover:bg-cs-green">
            Reset
        </button>        
    </div>

  )
}
