import { useEffect, useState } from 'react'
import { LocationInfo } from '../types'
import { useDebounce } from './async'

export const useSearchLocation = () => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [locationInfo, setLocationInfo] = useState<LocationInfo[]>(() => [])

  const [debouncedSearchText] = useDebounce(searchText, 400)

/**
 * 使用Effect Hook在用户输入稳定后发起地理编码请求
 * 
 * 此函数在用户输入文本（经过防抖动处理）变化时，通过Mapbox API 请求地理编码信息
 * 它负责显示加载状态，在请求成功后更新位置信息，在请求结束时隐藏加载状态
 * 
 * @param debouncedSearchText 经过防抖动处理的搜索文本，用于触发请求
 */
useEffect(() => {
    // 请求开始，设置加载状态为true
    setLoading(true)

    // 构建Mapbox API 请求URL，获取搜索文本对应的地理编码信息
    // 使用环境变量NEXT_PUBLIC_MAPBOX_TOKEN 作为访问令牌
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${debouncedSearchText}.json?fuzzyMatch=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
    )
      // 处理API响应，将结果转换为JSON格式
      .then((response) => response.json())
      // 过滤并转换API返回的数据，以匹配预期的位置信息格式
      .then((data) => {
        const filtered = data.features?.map((x: any) => ({
          placeName: x.place_name, // 提取地点名称
          latLng: [x.center[1], x.center[0]], // 提取并重新排列中心坐标，适应纬度在前，经度在后的顺序
        }))

        // 更新位置信息状态，存储过滤后的地理编码结果
        setLocationInfo(filtered)
      })
      // 无论请求成功或失败，最终都重置加载状态为false
      .finally(() => setLoading(false))
}, [debouncedSearchText]) // 监听debouncedSearchText变化，触发Effect执行
  return { loading, setLoading, searchText, setSearchText, locationInfo }
}
