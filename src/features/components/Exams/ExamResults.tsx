import { useExams } from "@/features";
import * as React from "react";

export const ExamResults = React.memo(function ExamResults() {
  const { memoizedExamsResults } = useExams();

  console.log("memoizedExamsResults: ", memoizedExamsResults);

  return (
    <div className="relative overflow-x-auto w-full">
      <h1>Hasil Test</h1>
      <table className=" overflow-hidden w-full text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-left w-full bg-primary text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            <th scope="col" className="px-6 py-3">
              Mata Pelajaran
            </th>
            <th scope="col" className="px-6 py-3">
              Detail pengisian
            </th>
            <th scope="col" className="px-6 py-3">
              Nilai
            </th>
          </tr>
        </thead>
        <tbody className=" w-full text-left overflow-hidden">
          {memoizedExamsResults?.map((result, index) => {
            return (
              <tr
                key={index}
                className="bg-white overflow-hidden border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {result.subject}
                </th>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <ol key={index} className="list-decimal flex flex-col gap-3">
                    {result.detail.map((detail) => {
                      return (
                        <div key={index}>
                          <li>
                            <h1>Soal: {detail.question}</h1>
                          </li>

                          <h1>Jawaban: {detail.answer}</h1>
                        </div>
                      );
                    })}
                  </ol>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {result.score ? (
                    <h1
                      className={`text-xl ${
                        result.score && result.score > 60
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {result.score}
                    </h1>
                  ) : (
                    <h1 className="text-red-700">Belum Dinilai</h1>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
