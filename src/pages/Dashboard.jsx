import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const userData = useSelector((store) => store.user)

  const fetchUser = async() => {
    try{
      const res = await axios.get(`${BASE_URL}/profile`, {withCredentials: true})
      dispath(addUser(res.data.user))
    }catch(err){
      if(err.status === 401){
        navigate("/login")
      }
      console.error(err)
    }
  }

  useEffect(() => {
    if(!userData){

      fetchUser()
    }
  }, [])

  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Dashboard
