import * as React from "react";

interface Props {
  text?: string;
  dataArray?: unknown[];
  dataObj?: unknown | null;
}

export const EmptyContent = React.memo(function EmptyContent({
  text = "Belum ada data",
  dataArray = [],
  dataObj = null,
}: Props) {
  return (
    <>
      {(!dataObj && dataArray.length === 0) && (
        <div className="w-full text-primary text-2xl flex items-center justify-center">
          <h1 className="font-bold" >{text}</h1>
        </div>
      )}
    </>
  );
});
