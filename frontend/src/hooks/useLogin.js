import axios from "axios"
import { useState } from "react"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null)

  const navigate = useNavigate()
  
  const login = async(email, password) => {
    setIsLoading(true)

    try {
      const resp = await axios.post('http://localhost:4000/api/user/login', {
        email: email,
        password: password
      })
      const value = JSON.stringify(resp.data)
      localStorage.setItem('user', value)
      setIsLoading(false)
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed up!',
        icon: 'success',
        confirmButtonText: 'Done'
      }).then(() => {
        navigate('/');  // Redirect to the homepage
      });
    } catch (error) {
      setIsLoading(false)
      Swal.fire({
        title: 'Failure!',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'Done'
      })
    }
  }

  return {
    isLoading,
    login
  }
}