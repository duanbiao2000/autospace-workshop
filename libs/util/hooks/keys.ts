import { useEffect } from 'react'

export const useKeypress = (keys: string[], action: () => void) => {
// 当指定按键释放时触发相应操作的事件监听器
useEffect(() => {
  // 定义按键释放事件的处理函数
  const onKeyup = (e: { key: any }) => {
    // 如果当前释放的按键包含在指定的按键数组中，则执行相应操作
    if (keys.includes(e.key)) action()
  }
  // 添加按键释放事件监听器
  window.addEventListener('keyup', onKeyup)
  // 返回一个函数，用于在组件卸载时移除事件监听器
  return () => window.removeEventListener('keyup', onKeyup)
  // 依赖项数组，包含action和keys，确保它们变化时重新创建事件监听器
}, [action, keys])
