import * as React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegister<FieldValues>;
  registerName: string;
  options: { label: string; value: string; isSelected?: boolean }[];
  selected?: string;
}

export const SelectInput = React.memo(function SelectInput({
  label,
  register,
  registerName,
  options,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="select"
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id="select"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        {...register(registerName)}
      >
        {options.map(({ label, value, isSelected }) => (
          <option value={value} selected={isSelected}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});
