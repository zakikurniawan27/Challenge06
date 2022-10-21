import axios from "axios"
import { useEffect, useState } from "react"
import { BiPlayCircle } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import {FiHome} from "react-icons/fi"
import { useParams, useNavigate } from "react-router-dom"
import Headers from "../../components/Headers"

const Detail = ({token, setToken})=>{

    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    
    const params = useParams()
    const navigate = useNavigate()

    const URL = 'https://api.themoviedb.org/3/'
    const API_KEY ='604903f555635f1a1b0968cd4bde010e'

    const handleDetail = async() =>{
        setLoading(true)
        try {
            const res = await axios.get(`${URL}movie/${params.id}`,{
                params:{
                    api_key: API_KEY
                }
            })
            setMovie(res?.data)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        try {
            const res = await axios.get(`${URL}search/movie`,{
                params:{
                    api_key: API_KEY,
                    query: search
                }
            })
            setMovie(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleDetail()
    },[])

    const getPosterURL = (poster_path) =>{
        return `https://www.themoviedb.org/t/p/original${poster_path}`
    }

    return(
        <div className="bg-white">
            <div className="w-screen">
                {loading ? (
                    <p className="text-center text-black"> Loading... </p>
                ): (
                    <div id="item1" className="relative carousel-item w-full ">
                        <Headers search={search} setSearch={setSearch} handleSearch={handleSearch} setToken={setToken} token={token}/>
                        <img src={getPosterURL(movie.backdrop_path)} alt="..." className=" w-screen h-screen opacity-[5]" />
                        <div className="absolute text-white text-left font-sans left-5 top-44 pr-[47rem]">
                            <h1 className="text-7xl font-bold">{movie.title}</h1>
                            <p className="pt-3">{movie.release_date}</p>
                            <div className=" flex flex-row gap-3 mt-5">
                                {movie?.genres?.map((item) => 
                                <p className="text-xl font-semibold">
                                    {item.name},
                                </p>)}
                            </div>
                            <p className="pt-12 text-xl">
                                {movie.overview}
                            </p>
                            <p className="flex flex-row mt-10">
                                <AiOutlineStar className="text-2xl text-yellow-400"/> {movie.vote_average}/10
                            </p>
                            <button className="btn btn-ghost text-white bg-red-700 font-medium rounded-3xl px-12 mt-7 " > 
                                <BiPlayCircle className="mr-2 text-xl"/>Watch Trailer
                            </button>
                        </div>
                    </div>   
                )}
            </div>
        </div>
    )
}

export default Detail