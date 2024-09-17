// 从本地模块'createGarage'导入formSchemaCreateSlot用于表单验证
import { formSchemaCreateSlot } from './createGarage';
// 导入zod库用于表单的模式定义和验证
import { z } from 'zod';
// 导入zodResolver用于将zod模式与react-hook-form集成
import { zodResolver } from '@hookform/resolvers/zod';
// 导入useForm钩子用于处理表单状态
import { useForm } from 'react-hook-form';

// 定义FormTypeCreateManySlots类型，用于推导formSchemaCreateSlot的结构
// 导出一个类型 FormTypeCreateManySlots，用于在创建多个Slot时的数据校验
// 该类型是通过formSchemaCreateSlot的infer推导出来的，确保了数据结构的一致性和类型安全
export type FormTypeCreateManySlots = z.infer<typeof formSchemaCreateSlot>;

/**
 * 使用react-hook-form创建一个表单钩子，用于创建多个停车位
 * 该钩子使用zodResolver进行数据验证
 * @returns 返回表单实例，以便在React组件中使用
 */
export const useFormCreateManySlots = () =>
  useForm<FormTypeCreateManySlots>({
    resolver: zodResolver(formSchemaCreateSlot), // 使用formSchemaCreateSlot进行数据解析和验证
  });
  