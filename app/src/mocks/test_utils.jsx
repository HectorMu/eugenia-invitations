import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { MockStore } from './store/store.mock'
import { Toaster } from 'react-hot-toast'

export const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export const QueryClientWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

export const ReduxStoreWrapper = ({ children }) => {
  return <Provider store={MockStore}>{children}</Provider>
}

export const TestProviderWrapper = ({ children }) => {
  return (
    <QueryClientWrapper>
      <ReduxStoreWrapper>
        <RouterWrapper>{children}</RouterWrapper>
        <Toaster />
      </ReduxStoreWrapper>
    </QueryClientWrapper>
  )
}
