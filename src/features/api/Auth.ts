import { Api } from ".";

export class Auth {
  static async Login(data: unknown) {
    return await Api.post("/auth/login", data);
  }

  static async Register(data: unknown) {
    return await Api.post("/auth/register", data);
  }
}
