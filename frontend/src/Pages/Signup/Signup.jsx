import CheckoutInput from "../../Components/CheckoutInput/CheckoutInput"
import { useSignup } from "../../hooks/useSignup"

const Signup = () => {
  const { 
    handleChange,
    user, 
    handleSubmit,
    isLoading,
    error 
  } = useSignup()

  return (
    <div className="grid grid-cols-3 gap-0 max-w-6xl mx-auto h-[80vh] rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden">
      <div className="hidden md:block md:col-span-1 h-full bg-gradient-to-r from-gray-900 to-gray-700 p-8">
        <h1 className="font-bold text-2xl mt-8 text-white">Create Your Account</h1>
        <p className="text-sm text-gray-200 mt-4">Welcome to our registration page! Get started by creating your account.</p>
        
        <h1 className="font-bold text-2xl mt-8 text-white">Simple & Secure Registrationt</h1>
        <p className="text-sm text-gray-200 mt-4">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
      </div>

      <form className="col-span-3 md:col-span-2 m-8 ">
        <h1 className="text-3xl font-bold">Create an account</h1>

        <CheckoutInput label={'Name'} required={true} onChange={handleChange} name={'name'} value={user.name} type={'text'}/>
        <CheckoutInput label={'Email'} required={true} onChange={handleChange} name={'email'} value={user.email} type={'email'}/>
        <CheckoutInput label={'Password'} required={true} onChange={handleChange} name={'password'} value={user.password} type={'password'}/>
        <CheckoutInput label={'Confirm Password'} required={true} onChange={handleChange} name={'confirmPassword'} value={user.confirmPassword} type={'password'}/>
        
        <div className="mt-8 flex flex-row items-center">
          <input type="checkbox" className="" />
          <p className="ml-2">I accept the</p>
          <p className="ml-1 text-blue-600 italic">Terms</p>
          <p className="ml-1">and</p>
          <p className="ml-1 text-blue-600 italic">Conditions</p>
        </div>
        
        <div className="flex mt-9 justify-center">
          <button className='bg-gray-700 text-white text-center font-medium py-3 px-4 w-1/2 rounded-lg' 
            onClick={handleSubmit} >
            Create an Account
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default Signup