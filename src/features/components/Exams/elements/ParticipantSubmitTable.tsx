import { User, useExams } from "@/features";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../node";

export const ParticipantSubmitTable = React.memo(
  function ParticipantSubmitTable() {
    const { data } = useQuery({
      queryFn: User.getTeachersStudents,
      queryKey: ["teacher-students"],
    });
    const { examId } = useParams();
    const { memoizedExams, handleEvaluateExam, evaluateExamLoading } =
      useExams();

    const examParticipantsAnswered = React.useMemo(() => {
      return memoizedExams
        ?.find((exam) => exam._id === examId)
        ?.participants?.filter((participan) => participan.answers?.length > 0);
    }, [examId, memoizedExams]);

    return (
      <div className="relative overflow-x-auto w-full ">
        <table className=" overflow-hidden w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-left w-full bg-primary text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                Nama Murid
              </th>
              <th scope="col" className="px-6 py-3">
                Jawaban
              </th>
              <th scope="col" className="px-6 py-3">
                Nilai Otomatis
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Price
              </th> */}
            </tr>
          </thead>
          <tbody className=" w-full text-left overflow-hidden">
            {examParticipantsAnswered?.map((participant) => {
              return (
                // <>
                <tr className="bg-white overflow-hidden border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* {JSON.stringify(data)} */}
                    {
                      data?.find(
                        (user: any) => user._id === participant.studentId
                      )?.name
                    }
                  </th>
                  <td className="px-6 py-4 flex ">
                    <ol className="list-decimal flex flex-col h-full gap-3">
                      {participant.answers.map((value: any) => {
                        return <li>{value.answer}</li>;
                      })}
                    </ol>
                  </td>
                  <td className="py-4  gap-2 w-[300px]">
                    {!participant?.score && (
                      <>
                        Metode Penilaian
                        <form className=" w-[150px]">
                          <select className="w-full rounded-lg">
                            <option value="cosine">Cosine</option>
                          </select>
                        </form>
                        <Button
                          text="Nilai"
                          type="button"
                          classname="w-[150px]"
                          onClick={() =>
                            examId &&
                            handleEvaluateExam(examId, participant.studentId)
                          }
                          loading={evaluateExamLoading}
                        />
                      </>
                    )}
                    {participant?.score && (
                      <h1 className="text-xl">
                        Skor siswa:{" "}
                        <span className="text-green-600 font-bold">
                          {participant.score}
                        </span>
                      </h1>
                    )}
                  </td>
                  {/* <td className="px-6 py-4">$1999</td> */}
                </tr>
                // </>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);
