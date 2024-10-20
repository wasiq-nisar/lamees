import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar = () => {
  const { totalQuantity } = useSelector((store) => store.cart)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setLoggedIn(!!user)
  }, [loggedIn])

  const handleLogout = () => {
    console.log('handleLogout Tapped')
    localStorage.removeItem('user')
    setLoggedIn(false)
  }

  return (
    <nav className="bg-white p-4 ">
      <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-100 p-2">
        
        {/* Left Side: Burger and Menu Items */}
        <div>
          {/* Burger Menu */}
          <div className="md:hidden right-4 mr-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FontAwesomeIcon icon={faBars} style={{ color: "#000000" }} className="w-6 h-6" />
            </button>
          </div>

          {/* Left-Side Items */}
          <ul className="hidden md:flex lg:space-x-1 space-x-0">
            <li><a href="/" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200">Home</a></li>
            <li><a href="#" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200">Products</a></li>
            <li><a href="#" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200">About</a></li>
            <li><a href="/contactus" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200">Contact Us</a></li>
          </ul>
        </div>

        {/* Logo */}
        <div className="absolute flex justify-center inset-x-0">
            <img src="https://flowbite.com/docs/images/logo.svg" className="xs:hidden h-8" alt="Lamees Logo" />
            <span className="text-black text-2xl font-bold ml-2">Lamees</span>
        </div>

        {/* Right-Side Items */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <a href="/cart">
              <ShoppingCartOutlinedIcon />
            </a>
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-xs font-semibold rounded-full flex justify-center align-middle">{totalQuantity}</span>
          </div>
          <FavoriteBorderOutlinedIcon />
          <div className="relative">
            { loggedIn ? ( 
              <button onClick={handleLogout} >
                <LogoutOutlinedIcon />
              </button>
            ) : (
              <a href="/login">
                <PersonOutlineOutlinedIcon /> 
              </a>
            )}
          </div>
        </div>

      </div>
      {isMenuOpen ?( 
            <ul className={`flex flex-col md:hidden text-center ${isMenuOpen ? "opacity-100" : "opacity-0"}`}> 
              <li className="border-b border-slate-100 p-2"><a href="#" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200 ">Home</a></li>
              <li className="border-b border-slate-100 p-2"><a href="#" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200 ">Products</a></li>
              <li className="border-b border-slate-100 p-2"><a href="#" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200 ">About</a></li>
              <li className="border-b border-slate-100 p-2"><a href="/contactus" className="text-textColor p-3 hover:text-black rounded-md transition ease-out duration-200 ">Contact Us</a></li>
            </ul>
          ) : null}
    </nav>
  )
}

export default Navbar