import { useState } from 'react';
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
      <button onClick={() => setPage(2)}>加载第二页</button>
    </>
  )
};

export default LoadMore;

