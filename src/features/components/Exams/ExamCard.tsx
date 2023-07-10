import { Exam } from "@/features";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  exam: Exam;
  userRole: "student" | "teacher";
  isParticipated: (exam: Exam) => boolean;
}

export const ExamCard = React.memo(function ExamCard({
  exam,
  userRole,
  isParticipated,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className=" cursor-pointer w-[300px] max-h-40 flex flex-col items-start justify-center p-2 box-border bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      onClick={() => navigate(`/dashboard/${userRole}/exams/${exam._id}`)}
    >
      <div className=" w-full h-[100px] ">
        <img alt="thumbnail" src={exam.thumbnailPath} className="h-full w-full" />
      </div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {exam.subject}
      </h5>

      {/* card footer */}
      {userRole === "student" && (
        <p className="font-normal text-gray-600 dark:text-gray-400">
          Status:{" "}
          <span
            className={`${
              isParticipated(exam) ? "text-[green]" : "text-[red]"
            }`}
          >
            {isParticipated(exam) ? "Sudah dimulai" : "Belum dimulai"}
          </span>
        </p>
      )}
    </div>
  );
});
