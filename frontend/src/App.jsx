import Navbar from './Components/Navbar/Navbar'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import Products from './Pages/Products/Products'
import Footer from './Components/Footer/Footer'
import ContactUs from './Pages/ContactUs/ContactUs'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout'

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your publishable key from the Stripe dashboard
const stripePromise = loadStripe('process.env.STRIPE_KEY');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/products/:id",
    element: <Products />
  },
  {
    path: "/products/:id",
    element: <Product />
  },
  {
    path: "/contactus",
    element: <ContactUs />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/checkout",
    element: (
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    )
  }
  
])

function App() {
  return (
    <div >
      <Navbar />
      <RouterProvider router={router}/>
      <Footer />
    </div>
  )
}

export default App
