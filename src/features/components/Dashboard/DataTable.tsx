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
  //   const customCell = (rowIndex: number) => {
  //     return <Cell></Cell>;
  //   };

  return (
    <>
      <Table
        rowHeight={60}
        rowsCount={rowsCount}
        width={1180}
        maxHeight={700}
        headerHeight={50}
      >
        {columns.map((col) => {
          return (
            <Column
              header={<Cell>{col.title}</Cell>}
              cell={({ rowIndex }) => (
                <Cell
                  style={{
                    width: "100%",
                    cursor: col.onClick ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={col.onClick && col.onClick}
                >
                  {col.cell(rowIndex)}
                </Cell>
              )}
              width={col.width === "half" ? 1180 / 2 : (col.width as number)}
              fixed
            />
          );
        })}
      </Table>
    </>
  );
});
