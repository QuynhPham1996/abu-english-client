import React, { useState } from 'react';
import classNames from 'classnames';
import { Table as AntdTable, Col, Row } from 'antd';

import Select from '@/components/Select';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataTablePerPageOptions } from '@/common/constants';
import Pagination from '@/components/Pagination';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import { getTotalPage } from '@/utils/functions';

import { TTableProps } from './Table.types';

const Table: React.FC<TTableProps> = ({
  className,
  columns,
  dataSources = [],
  header,
  loading,
  rowKey = 'id',
  page,
  pageSize,
  total,
  showPagination = true,
  scroll,
  title,
  rowClassName,
  onRow,
  onPaginationChange,
}) => {
  const [sorting, setSorting] = useState<string>();
  const totalPage = getTotalPage(total || 0, pageSize || 0);

  const handleTableChange = (_: any, __: any, sorter: any): void => {
    if (sorter) {
      const key = sorter.column?.keySort;
      if (key) {
        const typeOrder = sorter.order === 'ascend' ? 'ASC' : 'DESC';
        const sortValue = `${key}:${typeOrder}`;
        onPaginationChange?.(DEFAULT_PAGE, pageSize || DEFAULT_PAGE_SIZE, sortValue);
        setSorting(sortValue);
      } else {
        onPaginationChange?.(DEFAULT_PAGE, pageSize || DEFAULT_PAGE_SIZE, undefined);
        setSorting(undefined);
      }
    }
  };

  return (
    <div className={classNames('Table', className, { 'show-header-table': header })}>
      {header && <div className="Table-header">{header}</div>}

      <div className="Table-body">
        {loading && (
          <div className="Table-loading flex">
            <Loading />
          </div>
        )}

        <AntdTable
          locale={{
            cancelSort: 'Hủy sắp xếp',
            triggerDesc: 'Sắp xếp giảm dần',
            triggerAsc: 'Sắp xếp tăng dần',
            emptyText: <Empty />,
          }}
          rowClassName={(record, index): string =>
            classNames({ 'cursor-pointer': onRow }, rowClassName?.(record, index))
          }
          pagination={false}
          columns={columns?.filter((item) => !item.hide)}
          dataSource={dataSources}
          rowKey={rowKey}
          onRow={onRow}
          title={title}
          onChange={handleTableChange}
          scroll={{ ...scroll, x: 'auto' }}
        />
      </div>

      {!!showPagination && !!pageSize && !!total && (
        <div className="Table-footer flex items-center justify-between">
          <div className="Table-footer-perpage flex items-center">
            Hiển thị / trang
            <Select
              options={dataTablePerPageOptions}
              size="small"
              value={dataTablePerPageOptions.find((option) => Number(option.value) === pageSize)}
              onChange={(data): void => {
                onPaginationChange?.(DEFAULT_PAGE, Number(data?.value), sorting);
              }}
            />
          </div>
          {totalPage > 1 && (
            <div className="Table-footer-pagination">
              <Pagination
                page={page || DEFAULT_PAGE}
                pageSize={pageSize}
                total={total}
                onChange={(changedPage, changedPageSize): void =>
                  onPaginationChange?.(changedPage, changedPageSize || pageSize, sorting)
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
