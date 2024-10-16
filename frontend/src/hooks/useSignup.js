import { useState } from "react";
import axios from 'axios';

export const useSignup = () => {
  const [error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target  
    setUser({ ...user, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true);
    setError(null);
  }

  return {
    handleChange,
    user,
    handleSubmit,
    isLoading,
    error
  }
}