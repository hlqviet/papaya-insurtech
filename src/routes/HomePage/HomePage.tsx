import { Link } from 'react-router-dom'

import Layout from '../../components/Layout'

const HomePage = () => {
  return (
    <Layout title='Home'>
      <ul>
        <li>
          <Link to='login'>Login</Link>
        </li>
        <li>
          <Link to='todos'>Todos</Link>
        </li>
      </ul>
    </Layout>
  )
}

export default HomePage
