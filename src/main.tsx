import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import PrivateRoutes from './components/PrivateRoutes'
import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import NotFoundPage from './routes/NotFoundPage'
import TodoPage from './routes/TodoPage'
import AuthProvider from './store/AuthProvider'

const rootElement = document.getElementById('root')
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: 'todos',
        element: <TodoPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
