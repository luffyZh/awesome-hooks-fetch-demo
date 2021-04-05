/*
 * @Author: your name
 * @Date: 2021-04-05 14:25:44
 * @LastEditTime: 2021-04-05 14:26:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /awesome-hooks-fetch-demo/src/pages/Page.tsx
 */
import Link from 'next/link'
import Layout from '../components/Layout'

const Page = () => (
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

export default Page
