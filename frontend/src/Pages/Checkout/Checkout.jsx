import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutInput from "../../Components/CheckoutInput/CheckoutInput"
import axios from 'axios';
import { useState } from 'react'

const Checkout = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      setPaymentError(error.message)
      setPaymentSuccess(null)
    } else {
      try {
        const res = await axios.post('http://localhost:4000/api/create-payment-intent', {
          paymentMethod: paymentMethod.id,
          amount: 5000, // in cents (for example, $50)
        })

        if (res.data.success) {
          setPaymentSuccess('Payment successful!');
          setPaymentError(null);
        }
      } catch (error){
        setPaymentError('Payment failed, please try again.');
      }
    }
  }

  return (
    <div className="m-4 p-4 bg-gray-100 rounded-lg h-[100vh]">
      <h1 className="font-bold text-3xl">Checkout</h1>

      <div className="grid grid-cols-3 h-full"> 
        <form action="" className="col-span-2 mt-4">
          <div className="p-4 rounded-lg bg-white">
            <p className="font-light text-2xl">Customer Info</p>

            <div className="flex flex-row justify-between space-x-6">
              <div className="w-full">
                <CheckoutInput label={'Email'} type={'email'} required={true}/>
              </div>

              <div className="w-full">
                <CheckoutInput label={'Phone Number'} type={'number'} required={true}/>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-white">
            <p className="font-light text-2xl">Shipping Information</p>

            <CheckoutInput label={'Full Name'} type={'text'} required={true}/>
            <CheckoutInput label={'Street Address'} type={'text'} required={true}/>

            <div className="flex flex-row justify-between space-x-6">
              <div className="w-full">
                <CheckoutInput label={'Country'} type={'text'} required={true}/>
              </div>

              <div className="w-full">
                <CheckoutInput label={'State'} type={'text'} required={true}/>
              </div>
            </div>

            <div className="flex flex-row justify-between space-x-6">
              <div className="w-full">
                <CheckoutInput label={'City'} type={'text'} required={true}/>
              </div>

              <div className="w-full">
                <CheckoutInput label={'Zip Code'} type={'number'} required={false}/>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-white">
            <p className="font-light text-2xl">Payment Info</p>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default Checkout