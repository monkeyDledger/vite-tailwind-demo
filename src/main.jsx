import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import QRCodeLogin from './pages/QrLogin'
import SongList from './pages/SongList'
import PhoneLogin from './pages/PhoneLogin'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/qr-login" element={<QRCodeLogin />} />
        <Route path="/phone-login" element={<PhoneLogin />} />
        <Route path="/song-list" element={<SongList />} />
        <Route
          path="/about"
          element={
            <>
              <div className="text-center">
                <h1 className="text-xl">About</h1>
                <div>
                  <Link to="/" className="text-purple-400 underline">
                    Home
                  </Link>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
