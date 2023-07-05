import * as React from "react";
import { UserPayload, useDashboard } from "@/features";
import { useLocation } from "react-router-dom";
import { ExamsSection } from "..";
import { DashboardPageCard } from "./DashboardPageCard";

export const DashboardSidebar = React.memo(function DashboardSidebar() {
  const { memoizedStudentPages, memoizedTeacherPages } = useDashboard();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user-loggedin") ?? "{}"
  ) as UserPayload;

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed  shadow-lg top-10 left-0 z-40 w-[15vw] h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto bg-primary dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {user.role === "student" &&
              memoizedStudentPages.map((page) => {
                return <DashboardPageCard key={page.label} page={page} />;
              })}

            {user.role === "teacher" &&
              memoizedTeacherPages.map((page) => {
                return <DashboardPageCard key={page.label} page={page} />;
              })}
          </ul>
        </div>
      </aside>

      {/* <div className="flex fixed top-20  items-center justify-center h-screen w-screen rounded bg-gray-50 dark:bg-gray-800">
        <div className="w-1/2 border border-primary h-full pt-2">
          {location.pathname === "/dashboard/student/exams" && <ExamsSection />}
        </div>
      </div> */}
    </>
  );
});
