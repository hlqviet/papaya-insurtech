import { Link } from 'react-router-dom'

import Layout from '../../components/Layout'

const NotFoundPage = () => {
  return (
    <Layout title='Oops'>
      <p>You&apos;ve gone the wrong way, buddy!</p>
      <p>
        Let&apos;s go back to the <Link to='/'>homepage</Link>.
      </p>
    </Layout>
  )
}

export default NotFoundPage
