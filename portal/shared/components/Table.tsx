import clsx from "clsx";
import { useMemo } from "react";
import { useTable } from "react-table";

export interface ITableProps {
  data: any[];
  columns: any[];
  classes?: {
    table?: string;
  };
}

export default function Table(props: ITableProps) {
  const { classes = {} } = props;

  const data = useMemo(() => props.data, [props.data]);
  const columns = useMemo(() => props.columns, [props.columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <table {...getTableProps()} className={clsx([classes?.table])}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`thead-${index}`}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`tbody-${index}`}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={`tbody-cell-${cell.value}`}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
