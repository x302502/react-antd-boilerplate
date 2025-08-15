import { BasicContent } from '~/components';
import { theme, Table, TableColumnType } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDemo } from './hooks/use-demo';
import { ExampleItemDto } from '~/api/example/types';

export default function Demo() {
  const { t } = useTranslation();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const { data, isLoading, total, page, setPage } = useDemo();

  const columns: TableColumnType<ExampleItemDto>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'String Value',
      dataIndex: 'stringValue',
    },
    {
      title: 'Number Value',
      dataIndex: 'numberValue',
    },
    {
      title: 'Boolean Value',
      dataIndex: 'booleanValue',
    },
    {
      title: 'Date Value',
      dataIndex: 'dateValue',
    },
    {
      title: 'Date Time Value',
      dataIndex: 'dateTimeValue',
    },
    {
      title: 'Select Values',
      dataIndex: 'selectValues',
    },
    {
      title: 'JSON Object Value',
      dataIndex: 'jsonObjectValue',
    },
    {
      title: 'JSON Array Value',
      dataIndex: 'jsonArrayValue',
    },
  ];

  return (
    <BasicContent>
      <Table<ExampleItemDto>
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: page.pageIndex,
          pageSize: page.pageSize,
          total,
        }}
        onChange={pagination => {
          setPage({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
          });
        }}
      />
    </BasicContent>
  );
}
