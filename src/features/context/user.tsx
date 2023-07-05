import * as React from "react";
import { UserType } from "..";

type Props = { children: React.ReactNode };

export const UserContext = React.createContext<{
  user: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
} | null>(null);

export const UserContextProvider = ({ children }: Props) => {
  const { Provider } = UserContext;
  const [user, setUser] = React.useState<UserType>();

  return <Provider value={{ user, setUser }}>{children}</Provider>;
};
