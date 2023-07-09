import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DashboardHeader,
  DashboardSidebar,
  ExamDetail,
  ExamsSection,
  UserContextProvider,
} from "./features/index.ts";
import {
  CreateExamPage,
  EditExamPage,
  ExamEvaluatePage,
  ExamListPage,
  ExamResultsPage,
} from "./pages";

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* ... etc. */}
      </Route>

      <Route
        path="/dashboard/student/exams"
        element={
          <>
            <DashboardHeader />
            <DashboardSidebar />
            <ExamsSection />

            {/* <DashBoard /> */}
          </>
        }
      />

      <Route
        path="/dashboard/student/exams/:examId"
        element={
          <>
            <DashboardHeader />
            <DashboardSidebar />

            <ExamDetail />
          </>
        }
      />

      <Route
        path="/dashboard/student/exams-results"
        element={
          <>
            <DashboardHeader />
            <DashboardSidebar />

            <ExamResultsPage />
          </>
        }
      />

      {/* teacher */}
      <Route
        path="/dashboard/teacher/create-exams"
        element={
          <>
            <DashboardHeader />
            <DashboardSidebar />
            <CreateExamPage />

            {/* <DashBoard /> */}
          </>
        }
      />
      <Route
        path="/dashboard/teacher/exams"
        element={
          <>
            <DashboardHeader />
            <DashboardSidebar />
            <ExamListPage />

            {/* <DashBoard /> */}
          </>
        }
      />
      <Route
        path="/dashboard/teacher/exams/:examId"
        element={
          <>
            <DashboardHeader />
            <DashboardSidebar />
            <ExamEvaluatePage />
          </>
        }
      />
    </>
  )
);

// query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
