/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-30 23:17:24
 * @modify date 2024-04-30 23:17:24
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */
'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
}

export default QueryProvider
