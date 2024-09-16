import { ReactNode } from 'react'

export type Role = 'admin' | 'manager' | 'valet'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}

export type MenuItem = { label: string; href: string }

export type ViewState = {
  latitude: number
  longitude: number
  zoom?: number
}

export type LocationInfo = { placeName: string; latLng: [number, number] }

/**
 * 定义总价格类型，用于表示停车和其他相关服务的费用结构。
 */
export type TotalPrice = {
  // 停车费用
  parkingCharge: number
  // 代客泊车服务的下车费用
  valetChargeDropoff: number
  // 代客泊车服务的取车费用
  valetChargePickup: number
}

export type LatLng = {
  lat: number
  lng: number
}

export type LngLatTuple = [number, number]
