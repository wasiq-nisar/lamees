import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const FreeFast = () => {
  return (
    <div className='flex items-center mt-4'>
      <LocalShippingIcon style={{ fontSize: 18 }} className='text-gray-400'/>
      <p className='ml-2 text-xs text-gray-400'>Free & Fast Delivery</p>
    </div>
  )
}

export default FreeFast