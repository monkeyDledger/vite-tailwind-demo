import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import backgroundImage from '../assets/background.jpg'
import backgroundMoney from '../assets/money.jpg'
import { useUserStore } from './stores/user'

function App(): ReactElement {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const user = useUserStore((s) => s.user)

  const handleStart = () => {
    const cookie = localStorage.getItem('cookie')
    let url
    if (cookie && user) {
      url = '/song-list'
    } else {
      url = '/phone-login'
    }
    if (id) {
      url += `?id=${id}`
    }
    navigate(url)
  }

  const bgImg = id ? backgroundMoney : backgroundImage
  const welcomeStr = id ? '欢迎，门徒' : '欢迎，银河护卫队'

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover'
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{welcomeStr}</h1>
          <button className="btn btn-primary" onClick={handleStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
