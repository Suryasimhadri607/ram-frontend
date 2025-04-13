import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    
    const navigate = useNavigate();

    function handleAdmin(){
        navigate('/auth/register')
    }
    function handleStudent(){
        navigate('/student/register')
    }
  return (

    <div>
        <div>
            <h1>Welocome </h1>

        </div>
        <div><button className='btn btn-primary' onClick={handleStudent}>Student Register</button>
              <button className='btn btn-secondary' onClick={handleAdmin}> Admin Register</button></div>

    </div>

  )
}

export default Homepage