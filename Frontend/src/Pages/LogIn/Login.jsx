import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

function Login() {
  const [input,setInput] = useState({
    username:'',
    password:''
  })

  const {loading,login} = useLogin()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    // console.log(input)
    await login(input)
  }
  
  if(loading) 
    return(
      <span className="loading loading-dots loading-lg"></span>
    )

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-4 rounded-lg shadow-xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Login{" "}
          <span className='text-blue-500'>
            Chat App Pro
          </span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input input-bordered flex items-center gap-2 mt-5 bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="rgba(100,100,100,1)"
              className="h-4 w-4 opacity-100">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow text-gray-700 placeholder:text-gray-700" placeholder="Username" value={input.username} onChange={(e)=>setInput({...input,username:e.target.value})}/>
          </label>
          <label className="input mt-5 bg-blue-100 input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill='rgba(100,100,100,1)'
              className="h-4 w-4 opacity-100">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow text-gray-700 placeholder:text-gray-700"
            placeholder='*******' value={input.password} onChange={(e)=>setInput({...input,password: e.target.value})}/>
          </label>
          </div>
          <Link to='/signup' className='text-sm  text-white hover:underline hover:text-blue-400 mt-5 inline-block' >Don't have an Account ?</Link>

          <button className="btn mt-2 btn-block text-white bg-blue-500
        border-blue-500 hover:bg-blue-300 hover:text-blue-600 hover:border-2 hover:border-blue-600" >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login