import React, { HTMLProps } from 'react'
import { FormError } from './FormError'

export type HtmlLabelProps = HTMLProps<HTMLLabelElement> & {
  error?: string | undefined
  optional?: boolean
}

// 定义一个名为HtmlLabel的React组件，该组件接收HTML标签元素和HtmlLabelProps类型的属性
// 通过React.forwardRef创建一个转发引用组件，第一参数为组件函数，第二参数为ref
export const HtmlLabel = React.forwardRef<HTMLLabelElement, HtmlLabelProps>(
  // 组件函数接收两个参数，第一个参数是一个对象，包含children, title, optional, error, className等属性，第二个参数是ref
  // 函数内部返回一个label标签，包裹着标题，可选标记和表单错误
  ({ children, title, optional, error, className }, ref) => (
    // 创建一个label元素，ref属性用于引用label DOM节点，className属性用于设置样式类
    <label ref={ref} className={`text-sm block select-none ${className}`}>
      // 一个flex布局的div用于容纳标题和可选标记，使其在水平线上对齐
      <div className="flex items-baseline justify-between">
        // 标题，使用font-semibold和capitalize样式来加粗和首字母大写
        <div className="mb-1 font-semibold capitalize">{title}</div>
        // 如果optional为true，则显示'(optional)'文字，否则不渲染内容
        <div className="text-xs text-gray-600 ">
          {optional ? '(optional)' : null}
        </div>
      </div>
      // children用于渲染label标签内部的子元素
      {children}
      // FormError组件用于展示表单错误信息，error属性用于传递错误信息
      <FormError error={error} />
    </label>
  ),
);

HtmlLabel.displayName = 'HtmlLabel'
