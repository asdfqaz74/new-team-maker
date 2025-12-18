import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  type: "email" | "text" | "password";
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
};

const FormInput = <T extends FieldValues>({
  type,
  name,
  register,
  placeholder,
  label,
  error,
  required = false,
}: FormInputProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`px-3 py-2 border rounded-lg outline-none transition-colors
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
