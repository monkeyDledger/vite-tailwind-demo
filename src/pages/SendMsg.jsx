import { useRequest } from 'ahooks'
import React, { useRef, useState } from 'react'
import { getSongDetail, sendMsgWithSong } from '../service/song'

function SendMsg({ songId, users }) {
  const [songDetail, setSongDetail] = useState(null)
  const [msg, setMsg] = useState('')

  useRequest(() => getSongDetail(songId), {
    refreshDeps: [songId],
    onSuccess: (res) => {
      console.log('getSongDetail', res)
      if (res.code === 200) {
        setSongDetail(res.songs[0])
      }
    }
  })

  const { run: send } = useRequest(sendMsgWithSong, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        alert('已全部发送')
      } else {
        alert('Oops, 寄件已被网易云拦截，稍后再试吧')
      }
    },
    onError: (err) => {
      alert('Oops, 寄件已被网易云拦截，稍后再试吧')
    }
  })

  const handleSend = () => {
    if (!msg) return
    const modal = document.getElementById('progress-modal')
    if (modal) {
      modal.showModal()
    }
    send(songId, msg, users)
  }

  if (!songDetail) return <span className="loading loading-ring" />
  const { name, al } = songDetail
  return (
    <div className="flex flex-col gap-4">
      <textarea
        placeholder="填写私信内容"
        className="textarea textarea-bordered textarea-md w-full max-w-xs"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value)
        }}
      />
      <div
        className="card w-58 bg-base-100 shadow-xl image-full"
        style={{ width: '280px' }}
      >
        <figure>
          <img src={`${al.picUrl}?param=280y240`} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{msg}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleSend}>
              寄出
            </button>
          </div>
        </div>
      </div>
      <dialog id="progress-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-md">快递派送中</h3>
          <p className="py-4">
            <progress className="progress w-56"></progress>
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default SendMsg
