import { PropsWithChildren } from 'react'

import useAuth from '../../hooks/useAuth/useAuth'

const Layout = (props: PropsWithChildren<{ title: string }>) => {
  const { children, title } = props
  const { user } = useAuth()

  return (
    <>
      <main className='prose'>
        <header>
          <h1>{title}</h1>
          {user && <span>Hi {`${user.firstName} ${user.lastName}`}</span>}
        </header>
        <section>{children}</section>
      </main>
    </>
  )
}

export default Layout
