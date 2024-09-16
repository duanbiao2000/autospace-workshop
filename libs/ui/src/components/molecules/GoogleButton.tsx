import { signIn } from 'next-auth/react'

export const GoogleButton = () => {
  return (
    <button
      onClick={() => {
        /**
 * 使用Google进行登录
 * 
 * 此函数调用了signIn方法，使用Google作为身份提供者进行登录操作
 * 它会重定向用户到Google的登录页面，在成功登录后返回应用的首页
 * 
 * @param provider 指定使用的身份提供者，在这里是'google'
 * @param options 登录成功后的回调选项，这里设置了登录成功后重定向的URL为首页'/'
 */
signIn('google', { callbackUrl: '/' })
      }}
      className="text-lg hover:shadow-lg transition-shadow flex items-center justify-center w-8 h-8 border border-[#ea4335] rounded-full"
    >
      G
    </button>
  )
}
