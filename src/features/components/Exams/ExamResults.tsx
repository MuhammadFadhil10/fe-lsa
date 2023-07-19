import { ColumnDataTable, DataTable, EmptyContent, useExams } from "@/features";
import * as React from "react";

export const ExamResults = React.memo(function ExamResults() {
  const { memoizedExamsResults } = useExams();

  const memoizedColumns: ColumnDataTable[] = React.useMemo(() => {
    return [
      {
        title: "Mata Pelajaran",
        cell: (currentIndex) => {
          return (
            <>
              {memoizedExamsResults.map(
                (result, index) =>
                  index === currentIndex && <h1>{result.subject}</h1>
              )}
            </>
          );
        },
        width: 200,
      },
      {
        title: "Soal",
        cell: (currentIndex) => {
          return (
            <>
              {memoizedExamsResults.map(
                (result, index) =>
                  index === currentIndex && (
                    <div className="flex flex-col gap-5">
                      {result.detail.map((detail, num) => (
                        <h1>
                          {num + 1}. {detail.question}
                        </h1>
                      ))}
                    </div>
                  )
              )}
            </>
          );
        },
        width: 300,
      },
      {
        title: "Jawaban",
        cell: (currentIndex) => {
          return (
            <>
              {memoizedExamsResults.map(
                (result, index) =>
                  index === currentIndex && (
                    <div className="flex flex-col gap-5 ">
                      {result.detail.map((detail, num) => (
                        <h1>
                          {num + 1}. {detail.answer}
                        </h1>
                      ))}
                    </div>
                  )
              )}
            </>
          );
        },
        width: 300,
      },
      {
        title: "Nilai",
        cell: (currentIndex) => {
          return (
            <>
              {memoizedExamsResults.map(
                (result, index) =>
                  index === currentIndex && (
                    <h1
                      className={`text-2xl ${
                        (result.score ?? 0) >= 60
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {result.score ?? "Belum Dinilai"}
                    </h1>
                  )
              )}
            </>
          );
        },
        width: 200,
        bodyJustify: "center",
        titleJustify: "center",
      },
    ] as ColumnDataTable[];
  }, [memoizedExamsResults]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl text-primary">Hasil Test</h1>
      <DataTable
        rowHeight={300}
        rowsCount={memoizedExamsResults?.length ?? 0}
        columns={memoizedColumns}
      />

      <EmptyContent
        dataArray={memoizedExamsResults}
        text="Belum ada hasil test"
      />
    </div>
  );
});
