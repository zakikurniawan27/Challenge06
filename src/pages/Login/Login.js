import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { GiPadlock } from "react-icons/gi"
import { useState } from "react";
import axios from "axios";
import GoogleLogin from "../../components/GoogleLogin";
import ButtonSubmitLogin from "../../components/ButtonSubmitLogin";

const Login = ({token, setToken}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "") {
          alert("Email is required");
          return;
        }
        if (password === "") {
          alert("Password is required");
          return;
        }
        if (email !== "" && password !== "") {
          const data = {
            email,
            password,
          };
          try {
            const result = await axios.post(
              `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
              data
            );
            if (result.data.token) {
              // Set token from backend to local storage
              // {"data": { "token": "ini token" }}
              localStorage.setItem("token", result.data.token);
              setToken(result.data.token);
            }
          } catch (error) {
            // If there are any error it will show the error message from backend
            // { "message": "Password salah" }
            alert(error.response.data.message);
          }
        }
      };
    return (
        <div className="bg-white h-screen">
            {!token ? (
                <>
                    <div className="flex justify-center pt-44">
                        <div className="card w-1/2 h-96 bg-white shadow-inner shadow-slate-400">
                            <div className="pt-10">
                                <h1 className="font-bold font-sans text-black text-center">Login in to Your Account</h1>
                            </div>
                            <div className="card-body items-center ">  
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Your Email</span>
                                            </label>
                                            <label className="input-group">
                                                <span className="input input-bordered input-sm bg-white border-gray-400"> 
                                                    <FiMail className="text-black"/> 
                                                </span>
                                                <input type="email" placeholder="Masukan Email" 
                                                className="input input-bordered input-sm bg-white border-gray-400 w-96 text-black" 
                                                value={email} onChange={(e) => {
                                                    e.preventDefault()
                                                    setEmail(e.target.value)
                                                }}/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Your Password</span>
                                            </label>
                                            <label className="input-group input-group-sm">
                                                <span className="input input-bordered input-sm bg-white border-gray-400"> 
                                                    <GiPadlock className="text-black"/> 
                                                </span>
                                                <input type="password" placeholder="Masukan Password" 
                                                className="input input-bordered input-sm bg-white border-gray-400 w-96 text-black"
                                                value={password} onChange={(e) =>{
                                                    e.preventDefault()
                                                    setPassword(e.target.value)
                                                }}/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-row ml-4">
                                        <button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 
                                            focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 
                                            text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                                            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" 
                                            data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                <path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 
                                                52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 
                                                124.7v70.62H22.89V288h81.39v224h100.2V288z">
                                                </path>
                                            </svg>
                                            Sign in with Facebook
                                        </button>
                                        <GoogleLogin setToken={setToken} label="Sign in with Google"/>
                                    </div>
                                    <ButtonSubmitLogin email={email} password={password} label="Login"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-row justify-center gap-[37rem] ">
                        <button className="text-black hover:text-red-400" onClick={() => navigate('/')}>Back</button>
                        <p className="text-black cursor-pointer hover:text-red-400" onClick={() => navigate('/login')}>Lupa Password?</p>
                    </div>
                </>
            ):(
                navigate('/')
            )}
           
        </div>
    )
}

export default Login