import * as React from "react";
import { DashboardPageContainer, Exam, useExams } from "@/features";
import { ExamCard } from "./ExamCard";

export const ExamsSection = React.memo(function ExamsSection() {
  const { memoizedExams, user, isParticipated } = useExams();

  console.log("memoizedExams: ", memoizedExams);

  return (
    <DashboardPageContainer>
      <div className="border shadow-lg w-full h-[95vh] overflow-auto p-2 flex gap-3 grid grid-cols-4 grid-rows-[250px] overflow-auto">
        {memoizedExams?.map((exam: Exam, index) => {
          return (
            <>
              {!exam.participants?.find((p) => p.studentId === user._id)
                ?.score &&
                (exam.participants?.find((p) => p.studentId === user._id)
                  ?.answers?.length === 0 ||
                  !isParticipated(exam)) && (
                  <ExamCard
                    key={index}
                    exam={exam}
                    userRole={user.role}
                    isParticipated={isParticipated}
                  />
                )}
            </>
          );
        })}
      </div>
    </DashboardPageContainer>
  );
});
