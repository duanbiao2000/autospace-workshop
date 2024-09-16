import { FormTypeBookSlot } from '@autospace/forms/src/bookSlot'
import { useWatch } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { differenceInTime } from '../date'
import { VALET_CHARGE_PER_METER } from '../constants'

/**
 * 计算总价格的钩子函数
 * @param {TotalPriceType} pricePerHour 每小时的价格
 * @returns {Object} 包含停车费、代驾取车费和代驾还车费的对象
 */
export const useTotalPrice = ({ pricePerHour }: TotalPriceType) => {
  // 使用 useWatch 钩子监视相关字段的变化
  const { startTime, endTime, valet } = useWatch<FormTypeBookSlot>()

  // 声明状态变量来存储各种费用
  const [parkingCharge, setParkingCharge] = useState(0)
  const [valetChargePickup, setValetChargePickup] = useState(0)
  const [valetChargeDropoff, setValetChargeDropoff] = useState(0)

  // 根据开始时间、结束时间和每小时价格计算停车费
  useEffect(() => {
    if (!startTime || !endTime) return
    if (!pricePerHour) return

    // 计算开始时间和结束时间之间的时间差（毫秒）
    const differenceInMilliseconds = differenceInTime({
      startTime: startTime,
      endTime: endTime,
    })
    // 将时间差转换为小时
    const differenceInHours = differenceInMilliseconds / (60 * 60 * 1000)

    // 根据每小时价格和停车时长计算停车费
    const parkingCharge = Math.floor((pricePerHour || 0) * differenceInHours)

    // 更新停车费状态
    setParkingCharge(parkingCharge)
  }, [pricePerHour, startTime, endTime])

  // 根据代驾信息计算代驾取车费和还车费
  useEffect(() => {
    // 计算代驾取车费
    const pickupCharge = valet?.pickupInfo?.distance
      ? valet?.pickupInfo?.distance * VALET_CHARGE_PER_METER
      : 0
    // 计算代驾还车费
    const dropoffCharge = valet?.dropoffInfo?.distance
      ? valet.dropoffInfo.distance * VALET_CHARGE_PER_METER
      : 0

    // 更新代驾取车费和还车费状态
    setValetChargePickup(Math.floor(pickupCharge))
    setValetChargeDropoff(
      Math.floor(valet?.differentLocations ? dropoffCharge : pickupCharge),
    )
  }, [valet])

  // 返回计算出的费用
  return {
    parkingCharge,
    valetChargePickup,
    valetChargeDropoff,
  }
}