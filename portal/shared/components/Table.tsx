import { useTranslation } from "@shared/hooks";
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
  const t = useTranslation();
  const { classes = {} } = props;

  const columns = useMemo(() => props.columns, [props.columns]);

  // Use the hook to extract the data from table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: props.data });

  // Setup actions [edit and delete] for each row
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

  // Handle on click action for each row
  const handleOnClick = (row: Row) => {
    props.onClick && props.onClick(row);
  };

  // helper function to map classes to action buttons
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
          {/* Loop into header to render thead with proper columns names */}
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`thead-${index}`}>
              {/* Additional th rendered to show numerical increment (eg. 1, 2, 3, 4, 5) */}
              {props.index && <th key={`thead-index-${index}`}></th>}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
              {/* Render action heading if only actions are provided from props */}
              {props.actions && (
                <th key="thead-actions" className="text-right">
                  {t.table.actions}
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            {/* prepare row data before building ui*/}
            prepareRow(row);

            {
              /* return a headless table row with tailwindcss classes */
            }
            return (
              <tr
                {...row.getRowProps()}
                key={`tbody-${index}`}
                onClick={() => handleOnClick(row.original)}
                className={clsx([{ "cursor-pointer": props.onClick }])}
              >
                {/* Render sequential index if th is rendered for the same */}
                {props.index && (
                  <td key={`tbody-cell-${index}-index`}>{index + 1}</td>
                )}
                {/* Render each cell in a row with dynamic data */}
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={`tbody-cell-${index}-${cell.row.original.id}`}
                  >
                    {/* Capitalize characters if cell column has capitalize property */}
                    <span
                      className={clsx([
                        // @ts-ignore
                        { capitalize: cell.column?.capitalize || false },
                      ])}
                    >
                      {cell.render("Cell")}
                    </span>
                  </td>
                ))}
                {/* Render action buttons with their mapped classes, if they are provided from props  */}
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
                        {t.buttons[action]}
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
