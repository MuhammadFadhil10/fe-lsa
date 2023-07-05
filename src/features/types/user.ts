export type UserPayload = {
  _id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
};

export interface UserType {
  isLogin: boolean;
  payload: UserPayload;
}
