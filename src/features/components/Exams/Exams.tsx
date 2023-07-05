import * as React from "react";
import { useExams } from "@/features/hooks/useExams";

import { DashboardPageContainer, Exam } from "@/features";
import { Link } from "react-router-dom";

export const ExamsSection = React.memo(function ExamsSection() {
  const { memoizedExams, isParticipated } = useExams();

  return (
    <DashboardPageContainer>
      {memoizedExams?.map((exam: Exam) => {
        return (
          <Link
            to={`/dashboard/student/exams/${exam._id}`}
            className="block w-full p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {exam.subject}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Status: {isParticipated(exam) ? "Sudah dimulai" : "Belum dimulai"}
            </p>
          </Link>
        );
      })}
    </DashboardPageContainer>
  );
});
