import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const dispath = useDispatch()
  const fetchUser = async() => {
    try{
      const res = await axios.get(`${BASE_URL}/profile`, {withCredentials: true})
      dispath(addUser(res.data.user))
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Dashboard
