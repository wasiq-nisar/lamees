import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const BestPrice = () => {
  return (
    <div className='flex items-center mt-4'>
      <LocalAtmIcon style={{ fontSize: 18 }} className='text-gray-400'/>
      <p className='ml-2 text-xs text-gray-400'>Best Price</p>
    </div>
  )
}

export default BestPrice