import { Home } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='text-black flex justify-center items-center'>
        <h1 className='text-4xl font-semibold'>404 Not found</h1>
        <button className=' flex p-2 text-black bg-blue-400 rounded-lg  hover:bg-blue-500 hover:text-white' onClick={()=>{navigate("/")}} >Back Home<Home/></button>
    </div>
  )
}

export default NotFound