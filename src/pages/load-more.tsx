import Link from 'next/link'
import Layout from '../components/Layout'

const LoadMore = () => (
  <Layout>
    <h1>Basic</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default LoadMore
