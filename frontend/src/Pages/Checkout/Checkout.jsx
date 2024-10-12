import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react'
import CheckoutInput from "../../Components/CheckoutInput/CheckoutInput"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const Checkout = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [cashMethod, setCashMethod] = useState(false)
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cashMethod) {
      console.log('Cash Method Selected!')
    } else {
      console.log('Stripe Method Selected!')
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
  }

  return (
    <div className="m-4 p-4 bg-gray-100 rounded-lg">
      <h1 className="font-bold text-3xl">Checkout</h1>

      <div className="grid sm:grid-cols-3 h-full"> 
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

            <div className='flex flex-col sm:flex-row sm:space-x-7'>
              <div className={`flex flex-row mt-4 p-1 w-full border border-gray-200 rounded-lg items-center cursor-pointer ${cashMethod ? '' : 'bg-gray-100'}`} onClick={() => setCashMethod(false)}>
                <CreditCardIcon style={{fontSize: 40}}/>
                <div className="flex flex-col">
                  <h1 className="text-xs text-gray-800 ml-2 ">Stripe</h1>
                  <h1 className="text-xs text-gray-800 ml-2 ">xxx-xxx-xxx</h1>
                </div>
                {
                  cashMethod ? <RadioButtonUncheckedOutlinedIcon style={{fontSize: 20}} className='ml-auto mr-2'/> : <CheckCircleOutlinedIcon style={{fontSize: 20}} className='ml-auto mr-2'/>
                }
              </div>

              <div className={`flex flex-row mt-4 p-1 w-full border border-gray-200 rounded-lg items-center cursor-pointer ${cashMethod ? 'bg-gray-100' : ''}`} onClick={() => setCashMethod(true)}>
                <PaymentsOutlinedIcon style={{fontSize: 40}}/>
                <h1 className="text-xs text-gray-800 ml-2 ">Cash</h1>
                {
                  cashMethod ? <CheckCircleOutlinedIcon style={{fontSize: 20}} className='ml-auto mr-2'/> : <RadioButtonUncheckedOutlinedIcon style={{fontSize: 20}} className='ml-auto mr-2'/>
                }
                
              </div>
            </div>
          </div>

          {
            !cashMethod && <div>
              
            </div>
          }
          <button className='btn mt-4 w-full' onClick={handleSubmit}>Proceed</button>
        </form>
      </div>
      
    </div>
  )
}

export default Checkout