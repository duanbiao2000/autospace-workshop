'use client'
import { Role } from '@autospace/util/types'
import { useFormRegister } from '@autospace/forms/src/register'
import { useMutation } from '@apollo/client'
import { RegisterWithCredentialsDocument } from '@autospace/network/src/gql/generated'
import { Form } from '../atoms/Form'
import { signIn } from 'next-auth/react'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'

export interface ISignupFormProps {
  className?: string
  role?: Role
}
export const RegisterForm = ({ className, role }: ISignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

// 定义一个可复用的登录功能，使用图形化查询（GraphQL）的变体操作（Mutation）
// RegisterWithCredentialsDocument 是定义了注册所需数据结构的 GraphQL 文档
// 该操作允许用户使用凭证（用户名和密码）进行注册
// 使用 GraphQL 的 Mutation 操作来处理用户凭据注册
// registerWithCredentials 是触发注册操作的函数
// loading 表示当前请求是否正在加载中
// data 包含成功执行 Mutation 后返回的数据
const [registerWithCredentials, { loading, data }] = useMutation(
  RegisterWithCredentialsDocument,
)

return (
  // 表单组件
  <Form
    onSubmit={handleSubmit(async (formData) => {
      // 提交表单时执行的异步函数
      // 使用 registerWithCredentials 函数执行注册操作，并将表单数据作为变量传递
      const { data, errors } = await registerWithCredentials({
        variables: {
          registerWithCredentialsInput: formData,
        },
      })

      // 如果注册操作返回错误，则显示错误信息
      if (errors) {
        alert(errors)
      }

      // 如果注册操作成功，则显示成功信息并使用 signIn 函数登录用户
      if (data) {
        alert(`User ${data.registerWithCredentials.uid} created. 🎉`)
        signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/', // 登录成功后跳转到首页
        })
      }
    })}
  >
    {/* 电子邮件输入框 */}
    <HtmlLabel title="Email" error={errors.email?.message}> 
      <HtmlInput
        className="text-black"
        placeholder="Enter the email."
        {...register('email')} // 使用 register 函数注册 email 字段
      />
    </HtmlLabel>
    {/* 密码输入框 */}
    <HtmlLabel title="Password" error={errors.password?.message}>
      <HtmlInput
        className="text-black"
        type="password"
        placeholder="······"
        {...register('password')} // 使用 register 函数注册 password 字段
      />
    </HtmlLabel>
    {/* 显示名称输入框 */}
    <HtmlLabel title="Display name" error={errors.name?.message}>
      <HtmlInput
        className="text-black"
        placeholder="Enter your name."
        {...register('name')} // 使用 register 函数注册 name 字段
      />
    </HtmlLabel>
    {/* 如果表单验证有错误，则显示错误信息 */}
    {Object.keys(errors).length ? (
      <div className="text-xs text-gray-600">
        Please fix the above {Object.keys(errors).length} errors
      </div>
    ) : null}
    {/* 注册按钮 */}
    <Button type="submit" fullWidth loading={loading}> 
      Register
    </Button>
    {/* 登录链接 */}
    <div className="mt-4 text-sm ">
      Already have an autospace account?
      <br />
      <Link href="/login" className="font-bold underline underline-offset-4">
        Login
      </Link>{' '}
      now.
    </div>
  </Form>
)
}
