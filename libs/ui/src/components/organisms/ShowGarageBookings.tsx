import {
  BookingStatus,
  BookingsForGarageDocument,
  QueryMode,
} from '@autospace/network/src/gql/generated'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useTakeSkip } from '@autospace/util/hooks/pagination'
import { ShowData } from './ShowData'
import { ManageBookingCard } from './ManageBookingCard'
import { CheckInOutButton } from './CheckInOutButtons'

/**
 * 显示车库预订信息的组件
 * 
 * 该组件用于显示特定车库的预订信息，可以根据状态过滤，并允许设置是否显示签入和签出按钮
 * 
 * @param {number} garageId - 需要显示预订信息的车库ID
 * @param {BookingStatus[]} statuses - 用于过滤预订信息的状态列表
 * @param {boolean} [showCheckIn=false] - 是否显示签入按钮
 * @param {boolean} [showCheckOut=false] - 是否显示签出按钮
 */
export const ShowGarageBookings = ({
  garageId,
  statuses,
  showCheckIn = false,
  showCheckOut = false,
}: {
  garageId: number
  statuses: BookingStatus[]
  showCheckIn?: boolean
  showCheckOut?: boolean
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { take, setTake, skip, setSkip } = useTakeSkip()

  /**
 * 使用 GraphQL 查询来获取车库的预订信息
 * 通过以下参数来分页和过滤结果
 * @param BookingsForGarageDocument GraphQL 查询文档
 * @param skip 分页参数，跳过的条目数
 * @param take 分页参数，获取的条目数
 * @param statuses 预订状态数组，用于过滤结果
 * @param garageId 车库 ID，用于过滤属于特定车库的预订
 * @param searchTerm 搜索术语，用于根据车辆编号搜索预订
 * @returns 返回一个对象，包含查询的数据、加载状态和错误信息
 */
  const { data, loading, error } = useQuery(BookingsForGarageDocument, {
    variables: {
      skip,
      take,
      // 定义查询条件对象
      where: {
        // 指定状态字段在给定状态列表中
        status: { in: statuses },
        // 关联的Slot表查询条件
        Slot: {
          // is操作符用于匹配Slot表中garageId字段等于给定garageId的记录
          is: {
            garageId: { equals: garageId },
          },
        },
        // 如果searchTerm存在，添加模糊搜索条件
        ...(searchTerm && {
          // vehicleNumber字段包含searchTerm，不区分大小写
          vehicleNumber: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
        }),
      },
    }
  });

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <div className="flex justify-start items-center gap-2 w-full max-w-xl  rounded-full shadow-xl bg-white px-4">
          <IconSearch />
          <input
            placeholder="Search vehicle number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.bookingsForGarage.length,
          totalCount: data?.bookingsCount.count,
          setSkip,
          setTake,
        }}
      >
        {data?.bookingsForGarage.map((booking) => (
          <div key={booking.id}>
            <ManageBookingCard booking={booking} />
            {showCheckIn ? (
              <CheckInOutButton
                status={BookingStatus.CheckedIn}
                buttonText="CHECK IN"
                bookingId={booking.id}
              />
            ) : null}
            {showCheckOut ? (
              <CheckInOutButton
                status={BookingStatus.CheckedOut}
                buttonText="CHECK OUT"
                bookingId={booking.id}
              />
            ) : null}
          </div>
        ))}
      </ShowData>
    </div>
  )
}