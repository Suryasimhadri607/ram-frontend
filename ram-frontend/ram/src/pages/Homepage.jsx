import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    
    const navigate = useNavigate();

    function handleAdminRegister(){
        navigate('/auth/register')
    }
    function handleStudentRegister(){
        navigate('/student/register')
    }
    function handleAdminLogin(){
      navigate('/auth/login')
  }
  function handleStudentLogin(){
      navigate('/student/login')
  }
  return (

    <div className="container mt-5">
 
        <div>
            <h1 className='text-center'>Welocome to student Management System </h1>

        </div>

        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6 col-xl-5 '>
            <div className='p-8'>

           
            <button className='btn btn-primary' onClick={handleStudentRegister}>Student Register</button>
        <button className='btn btn-primary' onClick={handleStudentLogin}>Student Login</button><br /><br />
              <button className='btn btn-secondary' onClick={handleAdminRegister}> Admin Register</button>
              
              <button className='btn btn-secondary' onClick={handleAdminLogin}> Admin Login</button></div>
              </div>
              </div>
    </div>
    

  )
}

export default Homepage