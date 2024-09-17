'use client'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client'
import { ReactNode } from 'react'
import { setContext } from '@apollo/client/link/context'

// 定义ApolloProvider组件的属性接口
export interface IApolloProviderProps {
  children: ReactNode
}

// 创建并提供ApolloClient实例的React组件
export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  // 创建到GraphQL API的HTTP链接
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  })

  // 创建一个链接，用于在请求头中添加认证信息
  const authLink = setContext(async (_, { headers }) => {
    // 从服务器获取认证令牌
    const token = await fetch('/api/auth/token').then((res) => res.json())

    // 返回包含认证头的配置
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  // 创建并配置ApolloClient实例
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
  // 将ApolloClient实例作为Provider传递给子组件
  return <Provider client={apolloClient}>{children}</Provider>
}
