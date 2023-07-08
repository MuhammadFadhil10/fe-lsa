import { Exam } from "@/features";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../node";

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
      className=" cursor-pointer w-[300px] h-[100px] p-2 box-content bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      onClick={() => navigate(`/dashboard/student/exams/${exam._id}`)}
    >
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

      {userRole === "teacher" && (
        <div
          className="flex"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            type="button"
            text="Edit"
            onClick={(e) => {
              e.stopPropagation();

              navigate(`/dashboard/teacher/exams/edit/${exam._id}`);
            }}
          />
          <Button
            type="button"
            variant="outlined"
            text="Buang"
            bgColor="red"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      )}
    </div>
  );
});
