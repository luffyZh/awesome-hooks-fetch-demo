import { useState } from 'react';
import { Button } from 'antd';
import useFetchData from '../hooks/useFetchData';
import { getUserList } from '../constants/Apis';

const LoadMore = () => {
  const [page, setPage] = useState(1);
  const options = { query: { page } };
  const { loading, data, error } = useFetchData(getUserList, options);
  console.log(loading, data, error);
  return (
    <>
      <h1>Basic</h1>
      <p>This is the about page</p>
      <Button type="primary" onClick={() => setPage(2)}>加载第二页</Button>
    </>
  )
};

export default LoadMore;

