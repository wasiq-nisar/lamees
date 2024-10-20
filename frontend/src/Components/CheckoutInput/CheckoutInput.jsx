const CheckoutInput = ({ label, type, required, name, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="flex items-center text-sm text-gray-500 mt-6">{label} {required && '*'}</label>
      <input type={type} className='formInputField mt-2' required={required} name={name} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  )
}

export default CheckoutInput