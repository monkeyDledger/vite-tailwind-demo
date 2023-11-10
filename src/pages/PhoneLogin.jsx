import React, { useState } from 'react'
import { loginByPhone } from '../service/login'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/user'

/**
 * 手机号密码登录
 */
export default function PhoneLogin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    loginByPhone(phone, password)
      .then((res) => {
        console.log(res)
        if (res.code != 200) {
          alert(res.msg)
        } else {
          localStorage.setItem('cookie', res.cookie)
          const profile = res.profile
          useUserStore.setState({ user: profile })
          navigate('/song-list')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-10">
      <h2>网易云登录</h2>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">手机号</span>
        </label>
        <input
          type="phone"
          className="input input-bordered w-full max-w-xs"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">密码</span>
        </label>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className="btn btn-wide" onClick={handleLogin}>
        登录
      </button>
    </div>
  )
}
