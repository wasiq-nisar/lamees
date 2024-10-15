import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAll } from '../Features/Cart/cartSlice';
import Swal from 'sweetalert2';

export const useCheckout = () => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const { cartItems, totalPrice } = useSelector((state) => state.cart)

  const [cashMethod, setCashMethod] = useState(false)
  const [paymentError, setPaymentError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    fullName: '',
    street: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value})
  }

  const fireSwal = (state, error = '') => {
    if (state) {
      Swal.fire({
        title: 'Success!',
        text: 'Order Placed Successfully!',
        icon: 'success',
        confirmButtonText: 'Done'
      })
    } else {
      Swal.fire({
        title: 'Failure!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Done'
      })
    }
  }

  const clearDataAndCart = () => {
    dispatch(clearAll());
    setFormData({
      email: '',
      phoneNumber: '',
      fullName: '',
      street: '',
      country: '',
      state: '',
      city: '',
      postalCode: ''
    });
  }

  const handleSubmit = async (e) => {
    console.log('In Handle Submit')
    e.preventDefault()

    if (!formData.email || !formData.phoneNumber || !formData.fullName || !formData.street || !formData.country || !formData.state || !formData.city) {
      console.log('Empty Field!!')
      setPaymentError('Please fill in all the required fields.')
      return
    }

    const userInfo = {
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      fullName: formData.fullName
    }

    const shippingAddress = {
      street: formData.street,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zipCode: formData.postalCode
    }

    if (cashMethod) {
      try {
        const response = await axios.post('http://localhost:4000/api/order/', {
          userInfo, 
          shippingAddress,
          paymentMethod: 'Cash',
          items: cartItems,
          totalPrice: totalPrice
        })
        console.log('response: ', response)
        clearDataAndCart()
        fireSwal(true)
      } catch (error) {
        console.log(error)
        setPaymentError('Failed to place order by Cash Method.')
        fireSwal(false, error)
      }
    } else {
      console.log('Stripe')
      if (!stripe || !elements) {
        setPaymentError('Stripe is not properly initialized.')
        return
      }

      try {
        // Create PaymentIntent on the server
        const { data } = await axios.post('http://localhost:4000/api/create-payment-intent', {
          amount: totalPrice
        })
        const clientSecret = data.clientSecret;
        const cardElement = elements.getElement(CardElement);

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
              address: {
                line1: formData.street,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postalCode,
                country: 'PK'
              } 
            }
          }
        })

        if (error) {
          setPaymentError('Payment failed: ' + error.message);
          fireSwal(false, error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          // On payment success
          await axios.post('http://localhost:4000/api/order/', {
            userInfo,
            shippingAddress,
            paymentMethod: 'Card',
            items: cartItems,
            totalPrice: totalPrice
          });
          clearDataAndCart()
          fireSwal(true);
        }
      } catch (error) {
        setPaymentError('Payment failed.');
        fireSwal(false, error.message);
      }
    }
  }

  return {
    formData,
    cashMethod,
    paymentError,
    handleChange,
    handleSubmit,
    setCashMethod
  };
}