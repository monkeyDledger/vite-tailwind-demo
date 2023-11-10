import React, { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import {
  checkQrStatus,
  getLoginStatus,
  getQrImage,
  getQrKey
} from '../service/login'
import { useUserStore } from '../stores/user'
import { useNavigate } from 'react-router-dom'

function QRCodeLogin() {
  const [qrImage, setQrImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useRequest(getQrKey, {
    onSuccess: async (res) => {
      console.log(res)
      const unikey = res.data.unikey
      if (unikey) {
        const imgRes = await getQrImage(unikey)
        setQrImage(imgRes.data.qrimg)
        checkStatus(unikey)
      }
    }
  })

  const { run: login } = useRequest(getLoginStatus, {
    manual: true,
    onSuccess: (res) => {
      console.log('login', res)
      setLoading(false)
      const profile = res.data.profile
      useUserStore.setState({ user: profile })
      navigate('/song-list')
    }
  })

  const { run: checkStatus, cancel } = useRequest(checkQrStatus, {
    manual: true,
    pollingInterval: 3000,
    onSuccess: (res) => {
      console.log(res)
      if (res.code === 803) {
        // 登录成功，设置cookie
        const cookie = res.cookie
        setLoading(true)
        login(cookie)
        localStorage.setItem('cookie', cookie)
        cancel()
      }
      if (res.code === 800) {
        alert('二维码已过期，请刷新页面')
        cancel()
      }
    }
  })
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex-col w-max items-center p-2 space-y-2">
        <h3>使用网易云扫码登录</h3>
        {qrImage ? (
          <img src={qrImage} alt="qr" />
        ) : (
          <div>
            <span className="loading loading-ring loading-lg" />
          </div>
        )}
        {loading && (
          <div>
            已授权，正在登录
            <span className="loading loading-dots loading-md" />
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCodeLogin
