import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/**
 * 自定义钩子，用于管理对话框的显示状态。
 * 
 * @param defaultState 对话框的初始状态，默认为关闭状态（false）。
 * @returns 返回一个包含当前对话框状态和改变状态的方法的数组。
 *          第一个元素是当前对话框是否打开的状态（布尔值），
 *          第二个元素是用于设置对话框状态的方法。
 */
export const useDialogState = (defaultState = false) => {
  // 使用useState钩子来管理对话框的显示状态，初始状态由defaultState决定。
  const [open, setOpen] = useState(defaultState)

  // 获取当前页面路径。
  const pathname = usePathname()
  // 使用useRef钩子来保持初始页面路径的引用，用于后续比较。
  const initialPathname = useRef(pathname)

  // 使用useEffect钩子来监听页面路径的变化，当路径改变时重置对话框状态。
  useEffect(() => {
    if (pathname !== initialPathname.current) {
      // 当当前路径与初始路径不同时，关闭对话框，并更新初始路径。
      setOpen(false)
      initialPathname.current = pathname
    }
  }, [pathname, open]) // 列表中的依赖项包括pathname和open，确保在这些值改变时重新运行效果。

  // 返回当前对话框状态和设置状态的方法，通过as const语法确保类型优化。
  return [open, setOpen] as const
}
