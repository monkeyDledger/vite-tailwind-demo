import { useMount, useReactive, useRequest } from 'ahooks'
import { getFollowCount } from '../../service/song'

const ids = [54678821, 57215036]
export default function FanStat() {
  const data = useReactive({
    54678821: 0,
    57215036: 0
  })

  useMount(() => {
    getFollowCount('54678821').then((res) => {
      if (res.code === 200) {
        data[54678821] = res.data.fansCnt
      }
    })
    getFollowCount('57215036').then((res) => {
      if (res.code === 200) {
        data[57215036] = res.data.fansCnt
      }
    })
  })

  return (
    <div className="h-full w-full flex justify-center items-start mt-10">
      <div className="stats stats-vertical shadow">
        <div className="stat place-items-center">
          <div className="stat-title">银河快递</div>
          <div className="stat-value text-secondary">{data[54678821]}</div>
          <div className="stat-desc"></div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">门尼</div>
          <div className="stat-value text-blue-600">{data[57215036]}</div>
          <div className="stat-desc text-blue-600"></div>
        </div>
      </div>
    </div>
  )
}
