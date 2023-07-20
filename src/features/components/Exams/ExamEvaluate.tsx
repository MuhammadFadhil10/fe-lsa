import * as React from "react";
import { useParams } from "react-router-dom";
import {
  AnswerBody,
  ColumnDataTable,
  DataTable,
  Participan,
  User,
  UserPayload,
  useExams,
} from "@/features";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../node";
import { Alert, Modal, Select, TextInput, Label } from "flowbite-react";

export const ExamEvaluate = React.memo(function ExamEvaluate() {
  const { data: students } = useQuery({
    queryFn: User.getTeachersStudents,
    queryKey: ["teacher-students"],
  });

  const [openModal, setOpenModal] = React.useState(false);
  const [method, setMethod] = React.useState<"cosine" | "dice" | "manual">(
    "cosine"
  );
  const score = React.useRef<number | undefined>(undefined);

  const { studentId, examId } = useParams();

  const {
    memoizedExams,
    examParticipantsAnswered,
    handleEvaluateExam,
    handleSubmitScoreExam,
    submitScoreLoading,
    evaluateExamLoading,
  } = useExams();

  const memoizedStudent = React.useMemo(() => {
    return (students as UserPayload[])?.find(
      (student) => student._id === studentId
    );
  }, [studentId, students]);

  const memoizedCurrentExam = React.useMemo(() => {
    return memoizedExams?.find((exam) => exam._id === examId);
  }, [examId, memoizedExams]);

  const memoizedStudentAnswers: ({ _id: string } & AnswerBody)[] =
    React.useMemo(() => {
      return (examParticipantsAnswered?.find(
        (participant) => participant.studentId === memoizedStudent?._id
      )?.answers ?? {}) as ({ _id: string } & AnswerBody)[];
    }, [examParticipantsAnswered, memoizedStudent?._id]);

  const memoizedStudentEvaluated: Participan | undefined = React.useMemo(() => {
    return examParticipantsAnswered?.find(
      (participant) => participant.studentId === memoizedStudent?._id
    );
  }, [examParticipantsAnswered, memoizedStudent?._id]);

  const memoizedColumns: ColumnDataTable[] = React.useMemo(() => {
    return [
      {
        title: "No",
        width: 50,
        cell: (currentIndex) => <h1 className="text-xl">{currentIndex + 1}</h1>,
      },
      {
        title: "Pertanyaan",
        width: 250,
        cell: (currentIndex) =>
          memoizedCurrentExam?.questions.map((question, index) => {
            if (index === currentIndex) {
              return <h1>{question.question} </h1>;
            }
          }) as JSX.Element[],
      },
      {
        title: "Kunci Jawaban",
        width: 250,
        cell: (currentIndex) =>
          memoizedCurrentExam?.questions.map((question, index) => {
            if (index === currentIndex) {
              return <h1>{question.answerKey}</h1>;
            }
          }) as JSX.Element[],
      },
      {
        title: "Jawaban Murid",
        width: 250,
        cell: (currentIndex) =>
          memoizedStudentAnswers?.map((answer, index) => {
            if (index === currentIndex) {
              return <h1>{answer.answer}</h1>;
            }
          }) as JSX.Element[],
      },
      {
        title: "Akurasi Kemiripan",
        width: 200,
        titleJustify: "center",
        bodyJustify: "center",
        cell: (currentIndex) =>
          memoizedStudentAnswers?.map((answer, index) => {
            if (index === currentIndex) {
              return (
                <h1
                  className={`${
                    answer.accuracy ? "text-primary" : "text-red-600"
                  } font-bold`}
                >
                  {answer.accuracy ?? "Belum dihitung"}
                </h1>
              );
            }
          }) as JSX.Element[],
      },
      // score per question
      // {
      //   title: "Nilai",
      //   width: 200,
      //   titleJustify: "center",
      //   bodyJustify: "center",
      //   bodyAlign: "center",
      //   cell: () => (
      //     <Button
      //       text="Nilai akurasi otomatis"
      //       type="button"
      //       className="w-[190px]"
      //       onClick={() => {
      //         setOpenModal(true);
      //       }}
      //     />
      //   ),
      // },
    ];
  }, [memoizedCurrentExam?.questions, memoizedStudentAnswers]);

  return (
    <div className="w-full h-[90vh] flex flex-col gap-5 overflow-auto ">
      {/* {memoizedStudent && memoizedCurrentExam && ( */}
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl text-primary">
            Hasil Jawaban {memoizedStudent?.name}
          </h1>

          <h1 className="flex items-center gap-2">
            Nilai {memoizedStudent?.name}:{" "}
            {examParticipantsAnswered?.find(
              (p) => p.studentId === memoizedStudent?._id
            )?.score ? (
              <span className="text-2xl text-green-600">
                {examParticipantsAnswered?.find(
                  (p) => p.studentId === memoizedStudent?._id
                )?.score +
                  `${
                    memoizedStudentEvaluated?.score &&
                    !memoizedStudentEvaluated?.isEvaluated
                      ? " (Belum Disubmit)"
                      : ""
                  }`}
              </span>
            ) : (
              <span className="text-2xl text-red-600">Belum Dinilai</span>
            )}
          </h1>
        </div>

        <div className="flex gap-5 ">
          <Button
            text={
              examParticipantsAnswered?.find(
                (p) => p.studentId === memoizedStudent?._id
              )?.score
                ? "Edit Nilai"
                : "Nilai"
            }
            type="button"
            className="w-[190px]  shadow-lg"
            onClick={() => {
              setOpenModal(true);
            }}
          />
          {memoizedStudentEvaluated?.score &&
            !memoizedStudentEvaluated?.isEvaluated && (
              <Button
                text="Submit Nilai"
                type="button"
                className="w-[190px]  shadow-lg"
                onClick={() =>
                  examId &&
                  studentId &&
                  handleSubmitScoreExam(examId as string, studentId as string)
                }
                loading={submitScoreLoading}
              />
            )}
        </div>
      </div>
      {/* )} */}

      {/* {memoizedStudentEvaluated?.score &&
        !memoizedStudentEvaluated?.isEvaluated && (
          <Alert color="failure" className="w-[400px] items-center">
            Nilai Belum Disubmit!
          </Alert>
        )} */}

      {/* {memoizedCurrentExam && ( */}
      <DataTable
        rowHeight={200}
        rowsCount={memoizedCurrentExam?.questions.length ?? 0}
        columns={memoizedColumns}
      />
      {/* )} */}

      {/* {memoizedStudent && memoizedCurrentExam && ( */}
      {/* <div className="flex gap-5">
        <Button
          text={
            examParticipantsAnswered?.find(
              (p) => p.studentId === memoizedStudent?._id
            )?.score
              ? "Edit Nilai"
              : "Nilai"
          }
          type="button"
          className="w-[190px]  shadow-lg"
          onClick={() => {
            setOpenModal(true);
          }}
        />
        <Button
          text={
            examParticipantsAnswered?.find(
              (p) => p.studentId === memoizedStudent?._id
            )?.score
              ? "Edit Nilai"
              : "Nilai"
          }
          type="button"
          className="w-[190px]  shadow-lg"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div> */}
      {/* )} */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <h1>Nilai</h1>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div>
              <h1>Metode penilaian</h1>
              <Select
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value as "dice" | "cosine");
                  score.current = undefined;
                }}
              >
                <option value="cosine">Cosine</option>
                <option value="dice">Dice</option>
                <option value="manual">Manual</option>
              </Select>
            </div>
            {method === "manual" && (
              <div>
                <Label htmlFor="manual-score">Nilai Manual</Label>
                <TextInput
                  id="manual-score"
                  type="number"
                  value={score.current}
                  min="0"
                  max="100"
                  placeholder="100"
                  onChange={(e) => {
                    score.current = +e.target.value;
                  }}
                  autoFocus
                />
              </div>
            )}
          </div>

          <Button
            text={
              examParticipantsAnswered?.find(
                (p) => p.studentId === memoizedStudent?._id
              )?.score
                ? "Edit"
                : "Submit"
            }
            type="button"
            className="w-[190px]"
            onClick={async () => {
              examId &&
                studentId &&
                (await handleEvaluateExam(
                  examId,
                  studentId,
                  method,
                  score.current
                ));

              setOpenModal(false);
            }}
            loading={evaluateExamLoading}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
});
