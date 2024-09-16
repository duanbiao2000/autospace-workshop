import { LatLng } from './types'

/**
 * 检查给定的对象是否为一个有效的 LatLng 对象。该函数主要用于类型断言，确保某个对象符合 LatLng 接口的基本结构。
 * 
 * 一个有效的 LatLng 对象需要同时包含 `lat` 和 `lng` 两个属性。
 * 
 * @param obj 可能是 LatLng 对象的局部，也可能是 null。
 * @returns 如果给定的对象同时包含 `lat` 和 `lng` 属性，则返回 true，否则返回 false。
 */
export const isLatLng = (obj?: Partial<LatLng> | null): obj is LatLng => {
  return obj?.lat !== undefined && obj?.lng !== undefined;
}
