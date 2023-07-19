import {
  DataTable,
  DisplayName,
  EmptyContent,
  User,
  UserPayload,
  useExams,
} from "@/features";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ParticipantSubmitTable = React.memo(
  function ParticipantSubmitTable() {
    const { data: students } = useQuery({
      queryFn: User.getTeachersStudents,
      queryKey: ["teacher-students"],
    });
    
    const { examParticipantsAnswered } = useExams();
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
              width: 500,
              onClick: (currentIndex) =>
                navigate(
                  `${pathname}/evaluate/${
                    (students as UserPayload[])[currentIndex]._id
                  }`
                ),
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
              width: 500,
            },
          ]}
        />

        <EmptyContent dataArray={examParticipantsAnswered} />
      </div>
    );
  }
);
