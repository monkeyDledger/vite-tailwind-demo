import React, { useState } from 'react'
import { useUserStore } from '../stores/user'
import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getCommentList, getTopSong, searchSong } from '../service/song'
import SendMsg from './SendMsg'

const ArtistId = '54678821'

/**
 * 展示热门歌曲列表，供选择
 * @returns
 */
function SongList() {
  const [searchParams] = useSearchParams()
  const user = useUserStore((state) => state.user)
  const [songList, setSongList] = useState([])
  const [songId, setSongId] = useState('')
  const [searchSongId, setSearchSongId] = useState('')
  const [userIds, setUserIds] = useState([])
  const [msg, setMsg] = useState('')

  const artistId = searchParams.get('id') || ArtistId

  const { data: songRes } = useRequest(getTopSong, {
    defaultParams: [artistId]
  })

  const { run: search } = useRequest(searchSong, {
    manual: true,
    debounceWait: 1000,
    onSuccess: (res) => {
      console.log('search', res)
      if (res.code === 200 && res.result) {
        const songList = res.result.songs.reduce((acc, cur) => {
          const { id, name, artists } = cur
          const artistName = artists[0].name
          acc.push({ id, name, artistName })
          return acc
        }, [])
        console.log('songList', songList)
        setSongList(songList)
      }
    }
  })

  const { loading: loadingComment, run: fetchComment } = useRequest(
    getCommentList,
    {
      manual: true,
      onSuccess: (res) => {
        console.log('fetchComment', res)
        if (res.code === 200) {
          let comments = res.comments
          let tmp = []
          comments.map((comment) => {
            const user = comment.user
            tmp.push(user.userId)
          })
          tmp = Array.from(new Set(tmp))
          console.log('uid length', tmp.length)
          setUserIds(tmp)
        }
      }
    }
  )

  const handleSelectSearchSong = (e, song) => {
    console.log('handleSelectSearchSong', e, song)
    setSearchSongId(song.id)
    fetchComment(song.id)
  }

  if (!user) return <div>请先登录</div>

  console.log('songRes', songRes)
  const { nickname, avatarUrl } = user
  return (
    <div className="p-4">
      <header>
        <div className="w-full flex items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-xs">
              <img src={avatarUrl} />
            </div>
          </div>
          <div className="text-center">{nickname}</div>
        </div>
      </header>
      <div className="flex flex-col mt-4 gap-4">
        <select
          className="select w-full max-w-xs mt-6"
          onChange={(e) => {
            console.log('song change', e.target.value)
            setSongId(e.target.value)
          }}
        >
          <option disabled selected>
            选择要推荐的歌曲
          </option>
          {songRes?.songs.map((song) => {
            const { id, name, artists } = song
            return (
              <option key={id} value={id}>
                {name}
              </option>
            )
          })}
        </select>
        <textarea
          placeholder="填写私信文案"
          className="textarea textarea-bordered textarea-md w-full max-w-xs"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value)
          }}
        />
        <input
          type="text"
          className="input input-bordered w-full max-w-xs text-xs"
          placeholder="搜索并选择一首歌曲，将发私信给该歌曲下的评论用户推荐"
          onChange={(e) => {
            search(e.target.value)
          }}
        />
        {songList.length
          ? songList.map((song) => (
              <div className="form-control" key={song.id}>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-xs checked:radio-primary"
                    checked={searchSongId === song.id}
                    onChange={(e) => handleSelectSearchSong(e, song)}
                  />
                  <span className="label-text flex-1 text-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {song.name}
                  </span>
                  <span className="label-text flex-1 text-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {song.artistName}
                  </span>
                </label>
              </div>
            ))
          : null}
        {searchSongId && loadingComment && (
          <div className="flex gap-4 text-xs">
            <span>正在获取前50条评论的用户</span>
            <span className="loading loading-dots loading-xs" />
          </div>
        )}
        <div className="divider" />
        {searchSongId && !loadingComment ? (
          <SendMsg songId={songId} users={userIds} msg={msg} />
        ) : null}
      </div>
    </div>
  )
}

export default SongList
