import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Features/Cart/cartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StarRating from '../StarRating/StarRating';


const Card = ({ item }) => {
  console.log(item)
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(item))
  }

  return (
    <Link>
      <div className=' bg-gray-100 p-2 rounded-lg'>
        <img src={item.img} className='w-4/5 h-4/5 object-cover'/>

        <div className=' bg-blue-200 w-24 h-6 flex items-center justify-center rounded-md'>
          <p className='text-xs'>Up to 42% off</p>
        </div>

        <p className='font-bold mt-4'>{item.title}</p>
        <div className='flex'>
          <StarRating className='mt-2' rating={4}/>
          <p className='ml-1'>4.0</p>
          <p className='ml-2 text-gray-500'>(232)</p>
        </div>

        <div className='mt-4 mb-2 flex items-center'>
          <div className='flex items-center'>
            <LocalShippingIcon style={{ color: 'grey', fontSize: 18 }} />
            <p className='ml-2 text-xs text-gray-500'>Free & Fast Delivery</p>
          </div>
          <div className='flex items-center ml-4'>
            <LocalAtmIcon style={{ color: 'grey', fontSize: 18 }} />
            <p className='ml-2 text-xs text-gray-500'>Best Price</p>
          </div>
        </div>

        <div className='flex justify-between items-center mb-4'>
          <p className='text-xl font-bold'>Rs. {item.price}</p>
          <div className='btn hover:bg-blue-600 mr-2'>
            <AddShoppingCartIcon className='mr-2'/>
            <button onClick={addToCartHandler}>Add to Cart</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card