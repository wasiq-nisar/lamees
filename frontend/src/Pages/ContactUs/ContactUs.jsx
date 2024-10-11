// import Jharoka from '../../assets/Jharoka.jpg'
import { useState } from 'react';
import axios from "axios";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [email, setEmail] = useState('')

  const handleEmailSubmit = async(e) => {
    e.preventDefault()

    if (!subject || !email || !text || !name) {
      alert("All fields must be filled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/sendEmail/", {
        subject,
        text,
        email, 
        name, 
      })
      console.log(response.data);
      alert("Email sent successfully!");

      setName('');
      setEmail('');
      setSubject('');
      setText('');
    } catch (error) {
      console.log("Signup failed:", error);
      alert("Failed to send email. Please try again later.");
    }
  }

  return (
    <div className='mt-12'>
      <div className='grid sm:grid-cols-2 gap-14 p-8 mx-auto max-w-4xl rounded-md sm:h-[70vh] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]'>

        {/* LeftSide */}
        <div className='col-span-1'> 
          {/* ContactUs  */}
          <h1 className='font-extrabold text-4xl'>Contact Us</h1>
          <p className='text-sm text-gray-500 mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolor consequuntur nihil, unde enim quam eum ut fugiat. Quisquam magni ab nemo corrupti commodi aliquam ducimus reiciendis in laudantium esse.</p>  

          {/* Email  */}
          <div className='mt-12'>
            <h1 className='text-gray-800 text-2xl font-bold'>Email</h1>
            <div className='flex items-center'>
              <div className='iconRoundedBG'>
                <EmailIcon className='text-blue-600'/>
              </div>
    
              <div className='flex flex-col mt-4 ml-4 text-blue-600'>
                <p className='text-xs '>Mail</p>
                <a className='cursor-pointer text-sm font-bold' href='#'>lameesofficial@gmail.com</a>
              </div>
            </div>
          </div>  
          
          {/* Socials */}
          <div className='mt-12'>
            <h1 className='text-gray-800 text-2xl font-bold'>Socials</h1>
            <div className='flex items-center gap-6'>
              <a className='iconRoundedBG'>
                <FacebookIcon className='text-blue-600'/>
              </a>
              <a className='iconRoundedBG'>
                <InstagramIcon className='text-blue-600'/>
              </a>
              <a className='iconRoundedBG'>
                <XIcon className='text-blue-600'/>
              </a>
            </div>
          </div>
        </div>

        {/* RightSide Form*/}
        <div className='col-span-1'>
          <form className='space-y-6 ml-auto'>
            <input type="text" placeholder='Name' className='formInputField' value={name} onChange={(e) => setName(e.target.value)} required/>
            <input type="email" placeholder='Email' className='formInputField' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="text" placeholder='Subject' className='formInputField' value={subject} onChange={(e) => setSubject(e.target.value)} required/>
            <textarea placeholder='Message' rows={6} className='formInputField' value={text} onChange={(e) => setText(e.target.value)} required></textarea>
            <button type='button' className='btn w-full hover:bg-blue-600' onClick={handleEmailSubmit}>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs