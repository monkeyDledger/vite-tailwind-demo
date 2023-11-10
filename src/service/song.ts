import request from './request'

/**
说明 : 调用此接口,可获取歌手热门 50 首歌曲

必选参数 :

id : 歌手 id

接口地址 : /artist/top/song

调用例子 : /artist/top/song?id=6452
 */
export const getTopSong = (id: string) => {
  return request.get(`/artist/top/song?id=${id}`)
}

export const searchSong = (searchKey: string) => {
  return request.get(`/search?keywords=${searchKey}&limit=3`)
}

export const getSongDetail = (id: string) => {
  return request.get(`/song/detail?ids=${id}`)
}

export const getCommentList = (id: string, limit = 20) => {
  return request.get(`/comment/music?id=${id}&limit=${limit}`)
}

// export const sendMsgWithSong = (id: string, msg: string, uids: string[]) => {
//   const user_ids = uids.join(',')
//   return request.get(`/send/song?id=${id}&msg=${msg}&user_ids=${user_ids}`)
// }

export const sendMsgWithSong = (id: string, msg: string, uids: string[]) => {
  const user_ids = uids.join(',')
  const data = {
    id,
    msg,
    user_ids
  }
  return request.post('/send/song', data)
}
