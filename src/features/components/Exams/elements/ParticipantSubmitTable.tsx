import {
  DataTable,
  DisplayName,
  EmptyContent,
  ProfilePicture,
  User,
  UserPayload,
  useExams,
} from "@/features";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export const ParticipantSubmitTable = React.memo(
  function ParticipantSubmitTable() {
    const { data: students } = useQuery({
      queryFn: User.getTeachersStudents,
      queryKey: ["teacher-students"],
    });
    const { examParticipantsAnswered } = useExams();

    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl text-primary ">Data Pengumpulan Test</h1>

        <DataTable
          rowsCount={examParticipantsAnswered?.length ?? 1}
          columns={[
            {
              title: "Nama Murid",
              cell: (currentIndex) =>
                examParticipantsAnswered?.map(
                  (participant, index) =>
                    currentIndex === index &&
                    students && (
                      <DisplayName
                        name={
                          (students as UserPayload[]).find(
                            (student) => student._id === participant.studentId
                          )?.name ?? ""
                        }
                      />
                    )
                ) as JSX.Element[],
              width: "half",
              onClick: () => alert("assadds"),
            },
            {
              title: "Email Murid",
              cell: (currentIndex) =>
                examParticipantsAnswered?.map(
                  (participant, index) =>
                    currentIndex === index &&
                    students && (
                      <div className="w-full flex items-center">
                        <h1>
                          {
                            (students as UserPayload[]).find(
                              (student) => student._id === participant.studentId
                            )?.email
                          }
                        </h1>
                      </div>
                    )
                ) as JSX.Element[],
              width: "half",
            },
          ]}
        />

        <EmptyContent dataArray={examParticipantsAnswered} />
      </div>
    );
  }
);
