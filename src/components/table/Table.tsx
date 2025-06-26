import React from "react";
import { Table as AntTable, TableProps } from "antd";
import styles from "@components/table/Table.module.css";

const Table: React.FC<TableProps> = ({ columns, dataSource, ...props }) => {
  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      rootClassName={styles.tableWrapper}
      rowKey="id"
      pagination={{
        // pageSize: 10,
        pageSizeOptions: [10, 50, 100],
        showSizeChanger: true,
      }}
      scroll={{ y: 55 * 5, x: 1000 }}
      {...props}
    />
  );
};

export default Table;
