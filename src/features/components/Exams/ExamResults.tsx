import * as React from "react";

export const ExamResults = React.memo(function ExamResults() {
  return (
    <div className="w-full">
      <h1>Hasil Test</h1>
      <table className=" overflow-hidden w-full text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-left w-full bg-primary text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            <th scope="col" className="px-6 py-3">
              Mata Pelajaran
            </th>
            <th scope="col" className="px-6 py-3">
              Jawaban
            </th>
            <th scope="col" className="px-6 py-3">
              Nilai
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
});
