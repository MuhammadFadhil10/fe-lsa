import * as React from "react";
import { Table, Column, Cell } from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.css";
import { ColumnDataTable } from "@/features";

interface Props {
  rowsCount: number;
  columns: ColumnDataTable[];
}

export const DataTable = React.memo(function DataTable({
  rowsCount,
  columns,
}: Props) {
  const colWidth = React.useMemo(() => {
    return columns.map((col) => col.width);
  }, [columns]);

  const tableWidth = React.useMemo(() => {
    const width = colWidth.reduce((prev, cur) => (prev ?? 0) + (cur ?? 0));

    return (width ?? 0) >= 1180 ? 1180 : width;
  }, [colWidth]);

  return (
    <>
      <Table
        rowHeight={60}
        rowsCount={rowsCount}
        width={tableWidth as number}
        maxHeight={700}
        headerHeight={50}
      >
        {columns.map((col, index) => {
          return (
            <Column
              key={index}
              header={
                <Cell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: col.titleJustify ?? "start",
                  }}
                >
                  {col.title}
                </Cell>
              }
              cell={({ rowIndex }) => (
                <Cell
                  key={rowIndex}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: col.onClick ? "pointer" : "default",
                    display: "flex",
                    alignItems: col.bodyAlign ?? "start",
                    justifyContent: col.bodyJustify ?? "start",
                  }}
                  onClick={() => col.onClick && col.onClick(rowIndex)}
                  className={`${col.onClick && "hover:bg-gray-300"}`}
                >
                  {col.cell(rowIndex)}
                </Cell>
              )}
              width={col.width ? col.width : 1180 - (tableWidth as number)}
              fixed={col.fixed}
            />
          );
        })}
      </Table>
    </>
  );
});
