import * as React from "react";
import { ProfilePicture } from ".";

interface Props {
  name: string;
}

export const DisplayName = React.memo(function DisplayName({ name }: Props) {
  return (
    <div className="w-full flex gap-2 items-center">
      <ProfilePicture name={name} />
      <h1>{name}</h1>
    </div>
  );
});
