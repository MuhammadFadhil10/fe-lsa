import * as React from "react";
import {
  DataTable,
  DisplayName,
  EmptyContent,
  UserPayload,
  useTeacher,
} from "..";
import { Button } from "./node";

export const TeacherStudents = React.memo(function TeacherStudents() {
  const {
    memoizedAllStudents,
    memoizedTeacherStudentsIds,
    toggleAddStudentLoading,
    handleToggleAddStudent,
  } = useTeacher();

  const [studentId, setStudentId] = React.useState("");

  return (
    <div className="w-full">
      {/* {memoizedAllStudents?.length > 0 && (
        <div className="w-full">
          <table className=" overflow-hidden w-full text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-left w-full bg-primary text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  Nama Murid
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Tambah murid
                </th>
              </tr>
            </thead>
            <tbody className=" w-full text-left overflow-hidden">
              {memoizedAllStudents?.map((student: any) => {
                return (
                  <tr
                    key={student._id}
                    className="bg-white overflow-hidden border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {student.name}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {student.email}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Button
                        id={student._id}
                        type="button"
                        text={
                          memoizedTeacherStudentsIds.includes(student._id)
                            ? "Buang"
                            : "Tambah"
                        }
                        bgColor={
                          memoizedTeacherStudentsIds.includes(student._id)
                            ? "red"
                            : undefined
                        }
                        variant={
                          memoizedTeacherStudentsIds.includes(student._id)
                            ? "outlined"
                            : "fill"
                        }
                        loading={
                          toggleAddStudentLoading && studentId === student._id
                        }
                        onClick={async (e) => {
                          setStudentId(e.currentTarget.id);

                          await handleToggleAddStudent([student._id]);

                          setStudentId("");
                        }}
                      />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )} */}

      {memoizedAllStudents.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <h1 className="text-2xl text-primary">Tambah Murid</h1>
          <DataTable
            rowsCount={memoizedAllStudents.length}
            columns={[
              {
                title: "Nama Murid",
                cell: (currentIndex) => {
                  return (memoizedAllStudents as UserPayload[]).map(
                    (student, index) =>
                      currentIndex === index ? (
                        <DisplayName key={index} name={student.name} />
                      ) : (
                        <></>
                      )
                  );
                },
                width: 250,
              },
              {
                title: "Email Murid",
                cell: (currentIndex) => {
                  return (memoizedAllStudents as UserPayload[]).map(
                    (student, index) =>
                      currentIndex === index ? <h1>{student.email}</h1> : <></>
                  );
                },
                width: 250,
              },
              {
                title: "Tambah Murid",
                cell: (currentIndex) => {
                  return (memoizedAllStudents as UserPayload[]).map(
                    (student, index) =>
                      currentIndex === index ? (
                        <Button
                          id={student._id}
                          type="button"
                          text={
                            memoizedTeacherStudentsIds.includes(student._id)
                              ? "Buang"
                              : "Tambah"
                          }
                          bgColor={
                            memoizedTeacherStudentsIds.includes(student._id)
                              ? "red"
                              : undefined
                          }
                          variant={
                            memoizedTeacherStudentsIds.includes(student._id)
                              ? "outlined"
                              : "fill"
                          }
                          loading={
                            toggleAddStudentLoading && studentId === student._id
                          }
                          onClick={async (e) => {
                            setStudentId(e.currentTarget.id);

                            await handleToggleAddStudent([student._id]);

                            setStudentId("");
                          }}
                          className="w-[150px]"
                        />
                      ) : (
                        <></>
                      )
                  );
                },
                width: 200,
                bodyJustify: "center",
                titleJustify: "center",
              },
            ]}
          />
        </div>
      )}

      <EmptyContent dataArray={memoizedAllStudents} />
    </div>
  );
});
