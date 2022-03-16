import clsx from "clsx";
import { useMemo } from "react";
import { Row, useTable } from "react-table";

type Actions = "edit" | "delete";

export interface ITableProps {
  data: any[];
  columns: any[];
  index: boolean;
  classes?: {
    table?: string;
    actionBtn?: {
      edit?: string;
      delete?: string;
    };
  };
  actions?: Actions[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onClick?: (row: any) => void;
}

export const Table = (props: ITableProps) => {
  const { classes = {} } = props;

  const columns = useMemo(() => props.columns, [props.columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: props.data });

  const handleOnActionClick = (row: any, action: Actions) => {
    switch (action) {
      case "edit":
        props.onEdit && props.onEdit(row);
        break;
      case "delete":
        props.onDelete && props.onDelete(row);
        break;
    }
  };

  const handleOnClick = (row: Row) => {
    props.onClick && props.onClick(row);
  };

  const actionBtnClsx = (action: Actions) => {
    const clsxMap = {
      edit: classes.actionBtn?.edit || "btn-info",
      delete: classes.actionBtn?.delete || "btn-error text-white",
    };

    return clsx(clsxMap[action]);
  };

  return (
    <div className="h-full max-h-1/2">
      <table {...getTableProps()} className={clsx([classes?.table])}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`thead-${index}`}>
              {props.index && <th key={`thead-index-${index}`}></th>}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
              {props.actions && (
                <th key="thead-actions" className="text-right">
                  Actions
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={`tbody-${index}`}
                onClick={() => handleOnClick(row)}
                className={clsx([{ "cursor-pointer": props.onClick }])}
              >
                {props.index && (
                  <td key={`tbody-cell-${index}-index`}>{index + 1}</td>
                )}
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={`tbody-cell-${index}-${cell.row.original.id}`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
                {props.actions && (
                  <td className="flex gap-2 justify-end" key="tbody-actions">
                    {props.actions.map((action, index) => (
                      <button
                        key={`tbody-action-${index}`}
                        onClick={() =>
                          handleOnActionClick(row.original, action)
                        }
                        className={clsx(["btn btn-xs", actionBtnClsx(action)])}
                      >
                        {action}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
