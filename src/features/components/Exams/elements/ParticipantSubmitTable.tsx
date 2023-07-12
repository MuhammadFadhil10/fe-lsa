import { EmptyContent, User, useExams } from "@/features";
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
    const {
      memoizedExams,
      handleEvaluateExam,
      evaluateExamLoading,
      trimAnswer,
    } = useExams();

    const examParticipantsAnswered = React.useMemo(() => {
      return memoizedExams
        ?.find((exam) => exam._id === examId)
        ?.participants?.filter((participant) => participant.answers?.length > 0);
    }, [examId, memoizedExams]);

    return (
      <>
        {(examParticipantsAnswered ?? []).length > 0 && (
          <div className="relative overflow-x-auto w-full ">
            <h1 className="text-xl">Data jawaban siswa</h1>
            <table className="overflow-hidden w-full text-sm text-gray-500 dark:text-gray-400">
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
                </tr>
              </thead>
              <tbody className="w-full text-left overflow-hidden">
                {examParticipantsAnswered?.map((participant) => {
                  return (
                    <tr
                      key={participant._id}
                      className="bg-white overflow-hidden border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data?.find(
                          (user: any) => user._id === participant.studentId
                        )?.name}
                      </th>
                      <td
                        scope="row"
                        className="px-6 bg-[red] overflow-y-auto overflow-x-hidden w-[400px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <ol className="list-decimal flex flex-col h-full w-[400px] gap-3">
                          {participant.answers.map((value: any) => {
                            return (
                              <li key={value}>
                                <h1>{trimAnswer(value.answer)}</h1>
                                <h1 className=" break-words">{value.answer}</h1>
                              </li>
                            );
                          })}
                        </ol>
                      </td>
                      <td className="py-4 gap-2 w-[300px]">
                        {/* cosine */}
                        {!participant?.cosineScore &&
                          typeof participant.cosineScore !== "number" && (
                            <Button
                              text="Nilai dengan metode Cosine"
                              type="button"
                              className="w-full"
                              onClick={() =>
                                examId &&
                                handleEvaluateExam(
                                  examId,
                                  participant.studentId,
                                  "cosine"
                                )
                              }
                              loading={evaluateExamLoading}
                            />
                          )}

                        {/* dice */}
                        {!participant?.diceScore &&
                          typeof participant.diceScore !== "number" && (
                            <Button
                              text="Nilai dengan metode Dice"
                              type="button"
                              className="w-full"
                              onClick={() =>
                                examId &&
                                handleEvaluateExam(
                                  examId,
                                  participant.studentId,
                                  "dice"
                                )
                              }
                              loading={evaluateExamLoading}
                            />
                          )}

                        {/* cosine */}
                        {participant?.cosineScore &&
                          typeof participant.cosineScore === "number" && (
                            <h1 className="text-xl">
                              Score cosine siswa:{" "}
                              <span
                                className={`${
                                  participant.cosineScore > 60
                                    ? "text-green-700"
                                    : "text-red-700"
                                } font-bold`}
                              >
                                {Math.round(participant.cosineScore)}
                              </span>
                            </h1>
                          )}

                        {/* dice */}
                        {participant?.diceScore &&
                          typeof participant.diceScore === "number" && (
                            <h1 className="text-xl">
                              Score dice siswa:{" "}
                              <span
                                className={`${
                                  participant.diceScore > 60
                                    ? "text-green-700"
                                    : "text-red-700"
                                } font-bold`}
                              >
                                {participant.diceScore.toFixed(1)}
                              </span>
                            </h1>
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <EmptyContent dataArray={examParticipantsAnswered} />
      </>
    );
  }
);