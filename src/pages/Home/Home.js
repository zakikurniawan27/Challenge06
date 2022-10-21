import { useEffect, useState } from "react"
import { BiPlayCircle, BiRightArrowAlt } from 'react-icons/bi'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Headers from "../../components/Headers"




function Home({setToken, token}){
    const [movie, setMovie] = useState([])
    const [detail, setDetail] = useState([])
    const [detail1,setDetail1] = useState([])
    const [detail2, setDetail2] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const URL = 'https://api.themoviedb.org/3/'
    const API_KEY ='604903f555635f1a1b0968cd4bde010e'
    const MOVIE_URL = URL + 'movie/popular'
    const SEARCH_URL = URL + 'search/movie'
    const page = '1'

    const handleGetPopularMovie = async() =>{
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
    
    const handleSearch = async () =>{
        try {
            const res = await axios.get(`${SEARCH_URL}`,{
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

    const handleDetail = async() =>{
        setLoading(true)
        try {
            const res = await axios.get(`${URL}movie/453395`,{
                params:{
                    api_key: API_KEY
                }
            })
            setDetail(res?.data)
            const res1 = await axios.get(`${URL}movie/810693`,{
                params:{
                    api_key: API_KEY
                }
            })
            setDetail1(res1?.data)
            const res2 = await axios.get(`${URL}movie/634649`,{
                params:{
                    api_key:API_KEY
                }
            })
            setDetail2(res2?.data)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        handleGetPopularMovie()
        handleDetail()
    },[])

    const getPosterURL = (poster_path) =>{
        return `https://www.themoviedb.org/t/p/original${poster_path}`
    }
    
    return(
        <div className="bg-white">
            <div className="carousel w-full h-screen">
                <div id="item1" className="relative carousel-item w-full ">
                    <Headers search={search} setSearch={setSearch} handleSearch={handleSearch} handleGetPopularMovie={handleGetPopularMovie} setToken={setToken} token={token}/>
                    <img src={getPosterURL(detail.backdrop_path)} alt="..." className=" w-full" />
                    <div className="absolute text-white text-left font-sans left-5 top-44 pr-[47rem]">
                        <h1 className="text-7xl font-bold">{detail.title}</h1>
                        <p className="mt-5 text-2xl">
                            {detail.overview}
                        </p>
                        <button className="btn btn-ghost text-white bg-red-700 font-medium rounded-3xl px-12 mt-5 " > 
                            <BiPlayCircle className="mr-2 text-xl"/>Watch Trailer
                        </button>
                    </div>
                    <div className="absolute z-30 flex justify-center w-full py-2 gap-1 bottom-5">
                        <a href="#item1" type="button" className="btn btn-xs rounded-full"> </a> 
                        <a href="#item2" type="button" className="btn btn-xs rounded-full"> </a> 
                        <a href="#item3" type="button" className="btn btn-xs rounded-full"> </a> 
                    </div>
                </div> 
                <div id="item2" className="relative carousel-item w-full">
                    <Headers search={search} setSearch={setSearch} handleSearch={handleSearch} handleGetPopularMovie={handleGetPopularMovie} setToken={setToken} token={token}/>
                    <img src={getPosterURL(detail1.backdrop_path)} alt="..." className="w-full" />
                    <div className="absolute text-white text-left font-sans left-5 top-44 pr-[47rem]">
                        <h1 className="text-7xl font-bold">{detail1.title}</h1>
                        <p className="mt-5 text-2xl">
                            {detail1.overview}
                        </p>
                        <button className="btn btn-ghost text-white bg-red-700 font-medium rounded-3xl px-12 mt-5 " > 
                            <BiPlayCircle className="mr-2 text-xl"/>Watch Trailer
                        </button>
                    </div>
                    <div className="absolute z-30 flex justify-center w-full py-2 gap-1 bottom-5">
                        <a href="#item1" type="button" className="btn btn-xs rounded-full"> </a> 
                        <a href="#item2" type="button" className="btn btn-xs rounded-full"> </a> 
                        <a href="#item3" type="button" className="btn btn-xs rounded-full"> </a> 
                    </div>
                </div> 
                <div id="item3" className="relative carousel-item w-full">
                <Headers search={search} setSearch={setSearch} handleSearch={handleSearch} handleGetPopularMovie={handleGetPopularMovie} setToken={setToken} token={token}/>
                    <img src={getPosterURL(detail2.backdrop_path)} alt="..." className="w-full" />
                    <div className="absolute text-white text-left font-sans left-5 top-44 pr-[47rem]">
                        <h1 className="text-7xl font-bold">{detail2.title}</h1>
                        <p className="mt-5 text-2xl">
                            {detail2.overview}
                        </p>
                        <button className="btn btn-ghost text-white bg-red-700 font-medium rounded-3xl px-12 mt-5 " > 
                            <BiPlayCircle className="mr-2 text-xl"/>Watch Trailer
                        </button>
                    </div>
                    <div className="absolute z-30 flex justify-center w-full py-2 gap-1 bottom-5">
                        <a href="#item1" type="button" className="btn btn-xs rounded-full"> </a> 
                        <a href="#item2" type="button" className="btn btn-xs rounded-full"> </a> 
                        <a href="#item3" type="button" className="btn btn-xs rounded-full"> </a> 
                    </div>
                </div> 
            </div>
            {search ? (
                <div className="py-5 pl-5">
                    <p className="font-semibold text-3xl text-black">Search Result "{search}"</p>
                </div>
            ) : (
                <div className="py-5 pl-5">
                    <p className="font-semibold text-3xl text-black">Popular Movie</p>
                </div>
            )}
            <div className="flex justify-end gap-3 pr-5 ">
                <p className="text-red-600 cursor-pointer hover:text-red-900" onClick={() => navigate('/seeallmovie')}>
                    See All Movie
                    <BiRightArrowAlt className="text-red-600 inline text-lg"/>
                </p>
            </div>
            <div className="grid grid-cols-5 gap-y-4 gap-x-4 ml-7 mt-7">
            {loading ? (
                <p className="text-center"> Loading... </p>
            ):(
                movie?.map((item) => (
                    <>
                        <div className="card w-64 bg-transparent shadow-xl">
                            <figure className="pt-10"  key={item.id}>
                                <img src={getPosterURL(item.poster_path)} alt="poster" className="rounded-xl cursor-pointer" 
                                onClick={() => navigate(`/detail/${item.id}`)} />
                            </figure>
                         </div>
                    </>
                ))
            )}
            </div>
            
        </div>
    )
}


export default Home