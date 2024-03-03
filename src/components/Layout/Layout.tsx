import { PropsWithChildren } from 'react'

import useAuth from '../../hooks/useAuth/useAuth'

const Layout = (props: PropsWithChildren<{ title: string }>) => {
  const { children, title } = props
  const { user, logout } = useAuth()

  return (
    <>
      <main className='prose'>
        <header>
          <h1>{title}</h1>
          {user && (
            <div className='flex flex-col my-4'>
              <span>Hi {`${user.firstName} ${user.lastName}`}!</span>
              <span>
                Don&apos;t like this user?{' '}
                <button className='btn-link' onClick={logout}>
                  Logout
                </button>
                .
              </span>
            </div>
          )}
        </header>
        <section>{children}</section>
      </main>
    </>
  )
}

export default Layout
