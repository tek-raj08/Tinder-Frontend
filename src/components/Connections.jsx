import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {
    const connections = useSelector((store) => store.connection)
    const dispatch = useDispatch()
    const fetchConnections = async () => {

        try{
            const res = await axios.get(`${BASE_URL}/user/connections`, {withCredentials: true})
            // console.log(res.data.data)
            dispatch(addConnections(res.data.data))

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if(!connections) return ;

    if(connections.length === 0) 
        return <h1 className='font-semibold text-2xl flex justify-center items-center h-screen'> No Connections Found. </h1>


  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <h1 className='font-bold text-2xl'>Connections</h1>

      {connections.map((connection) => {
        const {firstName, lastName, age, gender, photoUrl, about} = connection

        return (

           <div key={connection._id} className='mt-6 bg-gray-500 rounded overflow-hidden'>
                {photoUrl && <img src={photoUrl} alt={firstName} className='w-80 h-64 object-cover'/>}
                { firstName && lastName && <h2 className='ps-1'>{firstName + " " + lastName}</h2>}
                {age && <p className='ps-1'>Age: {age}</p>}
                {gender && <p className='ps-1'>Gender: {gender}</p>}
                {about && <p className='ps-1'>{about}</p>}
            </div>
        )
      })}



    </div>
  )
}

export default Connections
