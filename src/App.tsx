import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../assets/background.jpg'
import { useUserStore } from './stores/user'

function App(): ReactElement {
  const navigate = useNavigate()
  const user = useUserStore((s) => s.user)
  const handleStart = () => {
    const cookie = localStorage.getItem('cookie')
    if (cookie && user) {
      navigate('/song-list')
    } else {
      navigate('/phone-login')
    }
  }

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover'
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">欢迎，银河快递</h1>
          <button className="btn btn-primary" onClick={handleStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
