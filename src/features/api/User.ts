import { Api } from ".";

export class User {
  static async getStudentDashboard() {
    return await Api.get("/student/dashboard");
  }

  static async getTeachersStudents() {
    const response = await Api.get("/teacher/students");

    return response.data?.data;
  }
}
