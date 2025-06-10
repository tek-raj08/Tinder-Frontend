import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const dashboard = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default dashboard
