import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [passwordMatchError, setPasswordMatchError] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (user.confirmPassword) {
        if (user.password !== user.confirmPassword) {
          setPasswordMatchError('Passwords do not match')
        } else {
          setPasswordMatchError(null)
        }
      } 
    }, 500)
    
    return () => clearTimeout(timeoutId)  // Cleanup timeout if the user is still typing
  }, [user.password, user.confirmPassword])

  const handleChange = (e) => {
    const { name, value } = e.target  
    setUser({ ...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordMatchError) {
      return
    }

    try {
      const resp = await axios.post('http://localhost:4000/api/user/signup', {
        name: user.name,
        email: user.email,
        password: user.password
      })
      const value = JSON.stringify(resp.data)
      localStorage.setItem('user', value)
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed up!',
        icon: 'success',
        confirmButtonText: 'Done'
      }).then(() => {
        navigate('/');  // Redirect to the homepage
      });

    } catch (error) {
      Swal.fire({
        title: 'Failure!',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'Done'
      })
    }
  }

  return {
    handleChange,
    user,
    handleSubmit,
    passwordMatchError
  }
}