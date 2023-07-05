import * as React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  registerName: string;
  defaultValues?: { [x: string]: unknown };
  placeholder?: string;
}

export const PasswordInput = React.memo(function PasswordInput({
  register,
  registerName,
  placeholder,
}: Props) {
  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder ?? "•••••••••"}
        required
        {...register(registerName)}
      />
    </div>
  );
});
