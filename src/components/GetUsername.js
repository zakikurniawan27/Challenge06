import axios from 'axios'
import React, { useEffect, useState } from 'react'

function GetUsername() {
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false)

    const handleGetName = async () => {
        setLoading(true)
        try {
            const resp = await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`)
            setName(resp.data)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        handleGetName()
    })

  return (
    <div>
        {loading?(
            <p>Loading...</p>
        ):(
            <button className="btn btn-active">
                    Welcome {name.name}
                </button>
        )}
    </div>
  )
}

export default GetUsername