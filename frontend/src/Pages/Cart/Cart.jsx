import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../Features/Cart/cartSlice'
import { useNavigate } from "react-router-dom";

import FreeFast from '../../Components/Misc/FreeFast'
import BestPrice from '../../Components/Misc/BestPrice'

const Cart = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDecrement = (item) => {
    dispatch(removeFromCart(item._id))
  }

  const handleIncrement = (item) => {
    dispatch(addToCart(item))
  }

  const proceedToCheckout = () => {
    let path = '/checkout'
    navigate(path)
  }

  if (totalQuantity === 0) {
    return (
      <div className='flex justify-center items-center h-[80vh]'>
        <h1 className='font-extrabold sm:text-6xl text-3xl text-gray-700'>Cart is Empty!</h1>
      </div>
    )
  } else {
      return (
      <div className={`grid grid-cols-3 gap-0 mx-auto max-w-6xl rounded-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] ${cartItems.length <= 3 ? 'h-[70vh]' : ''}`}>
        <div className="col-span-2 p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <h1 className="text-lg text-gray-600">{totalQuantity} Items</h1>
          </div>
          <hr className="h-0.5 mt-4 bg-neutral-100"/>

          <div className="grid grid-cols-9 mt-4">
            <div className="col-span-5">
              <p className="text-lg text-gray-400">Product Details</p>
            </div>
            <div className="col-span-2">
              <p className="text-lg text-center text-gray-400">Quantity</p>
            </div>
            <div className="col-span-2">
              <p className="text-lg text-center text-gray-400">Total</p>
            </div>
          </div>
          <hr className="h-0.5 mt-4 bg-neutral-100"/>
          
          {cartItems.map((item, index) => (
            <div className='grid grid-cols-9 mt-4 gap-6' key={index}>
              {/* Image and description in the same column */}
              <div className='col-span-5 flex'>
                <img 
                  src='https://pagedone.io/asset/uploads/1701162850.png'
                  alt={item.title} 
                  className='w-24 h-24 object-cover mr-4'  // Adjust image size here
                />
                <div className='flex flex-col justify-center'>
                  <p className='font-semibold'>{item.title}</p>
                  <p className='text-gray-400'>{item.category}</p>
                  <p className='text-gray-900'>Rs. {item.price}</p>
                </div>
              </div>
              <div className='col-span-2'>
                <div className='flex flex-row h-full justify-center items-center'>
                  <button className='w-10 h-10 border border-gray-200 rounded-l-md' onClick={() => handleDecrement(item)}>-</button>
                  <input 
                    type="text" 
                    value={item.quantity} 
                    className='w-10 h-10 border-y border-gray-200 text-center outline-none' 
                    readOnly
                  />
                  <button className='w-10 h-10 border border-gray-200 rounded-r-md' onClick={() => handleIncrement(item)}>+</button>
                </div>
              </div>
              <div className='col-span-2 flex items-center justify-center'>
                <p className='text-gray-900 font-bold'>Rs. {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-1 bg-gray-50 p-8">
          <h1 className="text-3xl font-bold">Order Summary</h1>
          <hr className="h-0.5 mt-4 bg-neutral-100"/>
          
          <div className='flex flex-row items-center justify-between mt-4'>
            <p className="text-md text-gray-400">{totalQuantity} items</p>
            <p className="text-md text-gray-400">Rs. {totalPrice}</p>
          </div>

          <FreeFast />
          <BestPrice />

          <form action="" className='flex flex-col space-y-4 mt-4'>
            <input type="text" placeholder='Promo Code' className='formInputField' required/>
            <button className='bg-black text-white font-medium py-2 px-4 rounded-lg'>Apply Promo</button>
          </form>

          <hr className="h-0.5 mt-4 bg-neutral-100"/>

          <div className='flex flex-row items-center justify-between mt-4'>
            <p className="text-sm text-gray-400">{totalQuantity} items</p>
            <p className="text-sm text-gray-400">Rs. {totalPrice}</p>
          </div>

          <button className='bg-purple-800 text-white font-medium mt-4 py-2 px-4 rounded-lg w-full' onClick={proceedToCheckout}>Checkout</button>

        </div>
      </div>
    )
  }

  
}

export default Cart