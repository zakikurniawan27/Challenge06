import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {FiHome} from "react-icons/fi"

const AllMovie = ()=>{
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const URL = 'https://api.themoviedb.org/3/'
    const API_KEY ='604903f555635f1a1b0968cd4bde010e'
    const MOVIE_URL = URL + 'movie/now_playing'
    const page = '1'

    const handleAllMovie = async() =>{
        setLoading(true)
        try {
            const res = await axios.get(`${MOVIE_URL}`,{
                params:{
                    api_key: API_KEY,
                    page: page
                }
            })
            setMovie(res.data.results)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        handleAllMovie()
    },[])

    const getPosterURL = (poster_path) =>{
        return `https://www.themoviedb.org/t/p/original${poster_path}`
    }

    return(
        <div className="bg-white">
            <div className="py-5 pl-5">
                <p className="font-semibold text-3xl text-black">AllMovie</p>
            </div>
            <div className="grid grid-cols-5 gap-y-4 gap-x-4 ml-7 mt-7">
            {loading ? (
                <p className="text-center"> Loading... </p>
            ):(
                movie?.map((item) => (
                    <>
                        <div className="card w-64 bg-transparent shadow-xl" >
                            <figure className="pt-10" key={item.id}>
                                <img src={getPosterURL(item.poster_path)} alt="poster" className="rounded-xl cursor-pointer" 
                                onClick={() => navigate(`/detail/${item.id}`)}/>
                            </figure>
                         </div>
                    </>
                ))
            )}
            </div>
            <div className="btn-group flex justify-center pt-7">
                <button className="btn btn-outline" onClick={()=> navigate('/')}><FiHome/></button>
                <button className="btn btn-outline" onClick={() => navigate('/seeallmovie-page2')}>Next</button>
            </div>
        </div>
        
    )
}

export default AllMovie