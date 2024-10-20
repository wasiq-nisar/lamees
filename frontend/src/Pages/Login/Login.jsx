import AppleIcon from '@mui/icons-material/Apple';
import { FcGoogle } from "react-icons/fc";
import CheckoutInput from '../../Components/CheckoutInput/CheckoutInput';
import { useLogin } from '../../hooks/useLogin';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const { isLoading, login } = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="w-2/6 mx-auto h-[70vh] rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden">
      <h1 className="m-6 font-bold text-2xl w-full">Welcome Back</h1>

      {/* Login with Google and Apple */}
      <div className='flex justify-center gap-4 m-6 items-center'>
        <button className='flex items-center justify-center w-full p-2 rounded-md border border-gray-300 hover:bg-gray-100'>
          <FcGoogle className='text-2xl'/>
          <p className='ml-2'>Log in with Google</p>
        </button>

        <button className='flex items-center justify-center w-full p-2 rounded-md border border-gray-300 hover:bg-gray-100'>
          <AppleIcon />
          <p className='ml-2'>Log in with Apple</p>
        </button>
      </div>

      <div className="flex m-6 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 text-black">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Other Signin Method */}
      <form className='m-6'>
        <CheckoutInput label={'Email'} type={'email'} required={true} placeholder={'Enter your email'} onChange={(e) => setEmail(e.target.value) }  value={email}/>
        <CheckoutInput label={'Password'} type={'password'} required={true} placeholder={'•••••••••'} onChange={(e) => setPassword(e.target.value) }  value={password}/>
        <a href="#" className='text-sm text-blue-700 mt-6 block ml-auto text-right'>Forgot password?</a>

        <button disabled={isLoading} type='submit' className='btn mt-4 w-full' onClick={handleSubmit}>Sign in to your account</button>
      </form>

      <div className='flex flex-row m-6 text-sm'>
        <p className='font-medium text-gray-500'>Don’t have an account yet?</p>
        <a href="/signup" className='ml-1 text-blue-700'>Sign up here</a>
      </div>
    </div>
  )
}

export default Login