import { roleApi, RoleItemType } from '~/api/system';
import type { ActionType, ProColumns, ProCoreActionType } from '@ant-design/pro-components';
import { BasicButton, BasicContent, BasicTable } from '~/components';
import { accessControlCodes, useAccess } from '~/hooks';
import { handleTree } from '~/utils';

import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Detail } from './containers/detail';
import { getConstantColumns } from './constants';

export default function Role() {
  const { t } = useTranslation();
  const { hasAccessByCodes } = useAccess();
  const { data: menuItems } = useQuery({
    queryKey: ['role-menu'],
    queryFn: async () => {
      const responseData = await roleApi.listRoleMenu();
      return responseData?.map(item => ({
        ...item,
        title: item.name,
        key: item.id,
      }));
    },
    initialData: [],
  });
  const deleteRoleItemMutation = useMutation({
    mutationFn: roleApi.delete,
  });
  /* Detail Data */
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [detailData, setDetailData] = useState<Partial<RoleItemType> & { menus?: string[] }>({});

  const actionRef = useRef<ActionType>(null);

  const handleDeleteRow = async (id: number, action?: ProCoreActionType<object>) => {
    const responseData = await deleteRoleItemMutation.mutateAsync(id);
    await action?.reload?.();
    window.$message?.success(`${t('common.deleteSuccess')} id = ${responseData}`);
  };

  const columns: ProColumns<RoleItemType>[] = [
    ...getConstantColumns(t),
    {
      title: t('common.action'),
      valueType: 'option',
      key: 'option',
      width: 120,
      fixed: 'right',
      render: (text, record, _, action) => {
        return [
          <BasicButton
            key="editable"
            type="link"
            size="small"
            disabled={!hasAccessByCodes(accessControlCodes.update)}
            onClick={async () => {
              /* 请求角色菜单权限 */
              const responseData = await roleApi.menuByRoleId({ id: record.id });
              setIsOpen(true);
              setTitle(t('system.role.editRole'));
              setDetailData({ ...record, menus: responseData });
            }}
          >
            {t('common.edit')}
          </BasicButton>,
          <Popconfirm
            key="delete"
            title={t('common.confirmDelete')}
            onConfirm={() => handleDeleteRow(record.id, action)}
            okText={t('common.confirm')}
            cancelText={t('common.cancel')}
          >
            <BasicButton type="link" size="small" disabled={!hasAccessByCodes(accessControlCodes.delete)}>
              {t('common.delete')}
            </BasicButton>
          </Popconfirm>,
        ];
      },
    },
  ];

  const onCloseChange = () => {
    setIsOpen(false);
    setDetailData({});
  };

  const refreshTable = () => {
    actionRef.current?.reload();
  };
  return (
    <BasicContent className="h-full">
      <BasicTable<RoleItemType>
        columns={columns}
        actionRef={actionRef}
        request={async params => {
          // console.log(sort, filter);
          const responseData = await roleApi.list(params);
          return {
            ...responseData,
            data: responseData.list,
            total: responseData.total,
          };
        }}
        headerTitle={`${t('common.menu.role')} （${t('common.demoOnly')}）`}
        toolBarRender={() => [
          <Button
            key="add-role"
            icon={<PlusCircleOutlined />}
            type="primary"
            disabled={!hasAccessByCodes(accessControlCodes.add)}
            onClick={() => {
              setIsOpen(true);
              setTitle(t('system.role.addRole'));
            }}
          >
            {t('common.add')}
          </Button>,
        ]}
      />
      <Detail
        title={title}
        open={isOpen}
        onCloseChange={onCloseChange}
        detailData={detailData}
        refreshTable={refreshTable}
        treeData={handleTree(menuItems || [])}
      />
    </BasicContent>
  );
}
