import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  type: "email" | "text" | "password";
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>; // validation 규칙
  placeholder?: string;
  label?: string;
  error?: string;
  desc?: string;
};

const FormInput = <T extends FieldValues>({
  type,
  name,
  register,
  rules,
  placeholder,
  label,
  error,
  desc,
}: FormInputProps<T>) => {
  return (
    <div className="flex flex-col gap-1 text-white">
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={name} className="text-sm font-medium">
            {label}
            {rules?.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {desc && <span className="text-xs text-gray-300">{desc}</span>}
      </div>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`px-3 py-2 border rounded-lg outline-none transition-colors
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
