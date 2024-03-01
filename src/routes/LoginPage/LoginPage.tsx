import { Navigate } from 'react-router-dom'

import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import useAuth from '../../hooks/useAuth/useAuth'
import useGetUsersQuery from '../../hooks/useGetUsersQuery'

const LoginPage = () => {
  const { user, login } = useAuth()
  const { error, data, isLoading } = useGetUsersQuery({
    options: { enabled: !user }
  })

  if (user) return <Navigate to='/todos' />

  if (error) return <span>{error.message}</span>

  if (isLoading) return <Spinner />

  if (!data) return null

  return (
    <Layout title='Login'>
      <p>Choose a user to login</p>
      <div className='w-full max-h-96 overflow-y-auto flex flex-col gap-2'>
        {data.users.map(({ id, firstName, lastName, password, username }) => (
          <button
            key={id}
            className='btn btn-wide'
            onClick={() => void login({ username, password })}
          >{`${firstName} ${lastName}`}</button>
        ))}
      </div>
    </Layout>
  )
}

export default LoginPage
