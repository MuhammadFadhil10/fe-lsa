import * as React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegister<FieldValues>;
  registerName: string;
  defaultValues?: { [x: string]: unknown };
  placeholder?: string;
  required?: boolean;
}

export const TextInput = React.memo(function TextInput({
  label,
  register,
  registerName,
  placeholder,
  required = false,
}: Props) {
  return (
    <div>
      <label
        htmlFor="text"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label} {required && <span className="text-[red]">*</span>}
      </label>
      <input
        type="text"
        id="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder ?? "John Doe"}
        required={required}
        {...register(registerName)}
      />
    </div>
  );
});
