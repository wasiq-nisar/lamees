import { useEffect } from 'react';
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../Features/Products/productSlice';

// const cartItems = [
//   {
//     id: 'rec1JZlfCIBOPdcT2',
//     title: 'Samsung Galaxy S8',
//     price: '399.99',
//     img: 'https://images2.imgbox.com/c2/14/zedmXgs6_o.png',
//     amount: 1,
//   },
//   {
//     id: 'recB6qcHPxb62YJ75',
//     title: 'google pixel',
//     price: '499.99',
//     img: 'https://images2.imgbox.com/fb/3d/O4TPmhlt_o.png',
//     amount: 1,
//   },
//   {
//     id: 'recdRxBsE14Rr2VuJ',
//     title: 'Xiaomi Redmi Note 2',
//     price: '699.99',
//     img: 'https://images2.imgbox.com/4f/3d/WN3GvciF_o.png',
//     amount: 1,
//   },
//   {
//     id: 'recwTo160XST3PIoW',
//     title: 'Samsung Galaxy S7',
//     price: '599.99 ',
//     img: 'https://images2.imgbox.com/2e/7c/yFsJ4Zkb_o.png',
//     amount: 1,
//   },
// ];

const FeaturedProducts = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div>
      <h1 className='font-bold mt-6 pb-2 m-4 border-b border-gray-200 text-2xl'>Products</h1>
      <div className='mt-8 grid md:grid-cols-3 gap-8 ml-4 mr-4'>
        {
          products.map((item) => (
            <Card item={item} key={item._id}/>
          ))
        }
      </div>
    </div>
  )
}

export default FeaturedProducts