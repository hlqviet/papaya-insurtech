import { PropsWithChildren } from 'react'

const Layout = (props: PropsWithChildren<{ title: string }>) => {
  const { children, title } = props

  return (
    <>
      <main className='prose'>
        <header>
          <h1>{title}</h1>
        </header>
        <section>{children}</section>
      </main>
    </>
  )
}

export default Layout
