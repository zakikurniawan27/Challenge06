import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import GetUsername from './GetUsername'

function Headers({ search, setSearch, handleSearch, handleGetPopularMovie, setToken, token }) {
  const navigate = useNavigate()
  

  useEffect(() => {
    (async () => {
        if(token){
            try {
                await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (error) {
                if(error.response.status === 401){
                    localStorage.removeItem("token")
                    navigate("/")
                }
            }
        }
    })()
  },[token, navigate, setToken])
  
  const handleLogout = (e) =>{
    e.preventDefault()
    localStorage.removeItem("token")
    setToken(null)
  }

    return (
      <div>
        <div className="absolute ml-5">
          <h1
            className="text-red-600 text-4xl font-extrabold font-sans cursor-pointer hover:text-red-900"
            onClick={() => navigate("/")}
          >
            Movielist
          </h1>
        </div>
        <div
          className=" absolute left-[37rem] top-1"
          onClick={() => handleSearch()}
        >
          <input
            type="text"
            placeholder="What do you want to watch?"
            className="block mr-40 w-full text-sm text-white placeholder-white bg-transparent rounded-2xl border 
                        border-red-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          />
          <div
            className="flex absolute inset-y-0 items-center right-2.5 cursor-pointer"
            onClick={() => {
              if (search) {
                navigate(`?title=${search}`);
              }
              if (!search) {
                alert("harap masukan data");
                handleGetPopularMovie();
              } else {
                navigate("/");
              }
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div className=" absolute right-3 mt-1">
          {!token ?(
            <>
                <button
                className="text-red-700 hover:text-white border 
                            border-red-700 hover:bg-red-800 font-medium rounded-3xl 
                            text-sm px-7 py-2.5 text-center mr-2 mb-2"
                onClick={() => navigate("/login")}
            >
                Login
            </button>
            <button
                className="btn btn-ghost text-white bg-red-700 font-medium rounded-3xl px-7 "
                onClick={() => navigate("/register")}
            >
                Register
            </button>
            </>
          ): (
            <div className='flex flex-row gap-5'>
              <GetUsername/>
              <button className='btn' onClick={handleLogout}> 
                <FiLogOut className='text-white'/> 
              </button>
            </div>
          )}
        </div>
      </div>
    );
}

export default Headers