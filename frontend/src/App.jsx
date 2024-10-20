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
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'

// Load your publishable key from the Stripe dashboard
const stripePromise = loadStripe('pk_test_51Q8ocaClFhUHWnMqKTwiqNpRR79hQWFcSSgSFPX7IF7Ddd7a0MzAItKjx1SXJgQo4djVXUhL6TK2nmN1dgLsR2qV00b7SNMe3g');

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
  }, 
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
  
])

function App() {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router}>
      <Footer />
      </ RouterProvider>
    </div>
  )
}

export default App
