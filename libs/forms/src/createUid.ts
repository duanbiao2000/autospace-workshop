import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const formSchemaUid = z.object({
  uid: z.string(),
})

export type FormTypeUid = z.infer<typeof formSchemaUid>

/**
 * 使用表单钩子来管理表单的uid字段
 * 
 * 该钩子基于 `useForm` 实现，并使用 `zodResolver` 为表单验证提供便利
 * 它简化了表单uid字段的管理，确保uid字段的正确性和有效性
 * 
 * @returns 返回一个包含表单操作和状态的对象，专门针对uid字段
 */
export const useFormUid = () =>
  useForm<FormTypeUid>({
    resolver: zodResolver(formSchemaUid),
  })
