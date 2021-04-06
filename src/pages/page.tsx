import { useState } from 'react';
import { Table } from 'antd';
import useFetchData from '../hooks/useFetchData';
import { getUserList } from '../constants/Apis';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
];

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const { loading, data } = useFetchData(getUserList, { query: { page, pageSize } });
  const onPageNumChange = (page: number, pageSize?: number) => {
    setPage(page);
    setPageSize(pageSize);
  }
  return (
    <Table
      rowKey={record => record.id}
      loading={loading}
      columns={columns}
      dataSource={data?.list || []}
      pagination={{
        pageSize,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        onChange: onPageNumChange,
        total: data?.total || 0
      }}
      scroll={{ y: 640 }}
    />
  )
}

export default Page;
