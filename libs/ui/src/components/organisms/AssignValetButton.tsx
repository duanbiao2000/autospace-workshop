import {
  AssignValetDocument,
  BookingStatus,
  namedOperations,
} from '@autospace/network/src/gql/generated'
import { ReactNode } from 'react'
import { useMutation } from '@apollo/client'
import { toast } from '../molecules/Toast'
import { Button } from '../atoms/Button'

// 定义 AssignValetButton 组件的属性类型
export const AssignValetButton = ({
  bookingId,
  status,
  children,
}: {
  bookingId: number // 预订 ID
  status: BookingStatus // 预订状态
  children: ReactNode // 按钮的子元素
}) => {
  // 使用 useMutation 钩子定义 assignPickup 函数，处理代客泊车的 GraphQL 操作
  const [assignPickup, { data, loading }] = useMutation(AssignValetDocument, {
    awaitRefetchQueries: true, // 等待查询重新获取数据
    refetchQueries: [
      namedOperations.Query.valetDrops,
      namedOperations.Query.valetPickups,
      namedOperations.Query.myDropTrips,
      namedOperations.Query.myPickupTrips,
    ],
    onCompleted(data, clientOptions) {
      // 操作完成后的回调，显示成功提示
      toast(`Action successful.
            ID: ${data.assignValet.id}`)
    },
  })

  return (
    <Button
      loading={loading} // 按钮加载状态
      variant="outlined" // 按钮样式
      fullWidth // 按钮宽度占满
      onClick={async () => {
        // 点击按钮时调用 assignPickup 函数
        await assignPickup({
          variables: { bookingId, status }, // 传递预订 ID 和状态作为变量
        })
      }}
    >
      {children} // 按钮的子元素
    </Button>
  )
}
