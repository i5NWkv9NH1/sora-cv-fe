import { VChip } from 'vuetify/components'
import type { IOrder } from '~/types'

export function PayType(props: { pay: number }) {
  switch (props.pay) {
    case 1:
      return <div>微信支付</div>
    case 2:
      return <div>支付宝支付</div>
    default:
      return <div>未知</div>
  }
}

export function PayStatus(props: { status: number }) {
  switch (props.status) {
    case 1:
      return <VChip color="success">已付款</VChip>
    case 2:
      return <VChip color="warning">待付款</VChip>
    case 3:
      return <VChip color="error">付款失败</VChip>
    default:
      return <VChip color="error">付款失败</VChip>
  }
}

export function TableRow({ item }: { item: IOrder }) {
  return (
    <tr>
      <td>
        🍇
        {item.id}
      </td>
      <td>{item.name}</td>
      <td>{item.createdAt}</td>
      <td>
        <PayType pay={item.pay} />
      </td>
      <td>
        {item.price}
        元
      </td>
      <td>
        <PayStatus status={item.status} />
      </td>
    </tr>
  )
}
