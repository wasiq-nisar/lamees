import {useState, useEffect} from 'react'
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

const Slider = () => {
  const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const [hoverPos, setHoverPos] = useState('')
  const [currSlide, setCurrSlide] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }
    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  const handleMouseMove = (e) => {
    if (isSmallScreen) return;
    const {clientX, currentTarget} = e
    const halfWidth = currentTarget.clientWidth / 2
    setHoverPos(clientX < halfWidth ? 'left' : 'right');
  }

  const nextSlide = () => {
    setCurrSlide(currSlide === 2 ? 0 : currSlide + 1)
  }

  const prevSlide = () => {
    setCurrSlide(currSlide === 0 ? 2 : currSlide - 1)
  }

  return (
    <div className="relative h-[40vh] sm:h-[80vh] w-[100vw] overflow-hidden" onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverPos('')}>
      <div className='flex h-full w-[300vw] transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${currSlide * 100}vw)` }}>

        { data.map((image, index) => (
          <img 
            key={index}   
            src={image} 
            alt={`Slide ${index}`} 
            className="h-full w-[100vw] object-cover"
          />
        ))}
      </div>

      {/* Left Arrow */}
      {!isSmallScreen && hoverPos === 'left' && (
        <div className='absolute top-0 left-0 h-full w-1/2 bg-black bg-opacity-20' onClick={prevSlide}>
          <div className='absolute top-1/2 left-4'>
            <WestOutlinedIcon />
          </div>
        </div>
      )}

      {/* Right Arrow */}
      {!isSmallScreen && hoverPos === 'right' && (
        <div className='absolute top-0 right-0 h-full w-1/2 bg-black bg-opacity-20' onClick={nextSlide}>
          <div className='absolute top-1/2 right-4'>
            <EastOutlinedIcon />
          </div>
        </div>
      )}
    </div>
  )
}

export default Slider