import { TAKE_COUNT } from '../constants'
import { useState } from 'react'

/**
 * 自定义钩子，用于分页功能中的跳过和获取数量管理。
 * @param {number} initialSkip - 初始跳过数量。默认值为0。
 * @param {number} initialTake - 初始获取数量。默认值从TAKE_COUNT常量导入。
 * @returns {object} 包含当前的获取数量（take）、跳过数量（skip），
 * 以及更新这两个值的函数（setTake、setSkip）。
 */
export const useTakeSkip = (initialSkip = 0, initialTake = TAKE_COUNT) => {
  // 使用useState钩子管理跳过数量，初始值为initialSkip
  const [skip, setSkip] = useState(() => initialSkip)
  // 使用useState钩子管理获取数量，初始值为initialTake
  const [take, setTake] = useState(() => initialTake)

  // 返回当前的获取数量、跳过数量，以及更新这两个值的函数
  return { take, skip, setTake, setSkip }
}