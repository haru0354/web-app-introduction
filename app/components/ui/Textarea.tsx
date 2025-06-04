"use client";

import TextareaAutosize from "react-textarea-autosize";

type TextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  minRows?: number;
  maxRows?: number;
  error?: string[];
};

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  placeholder,
  defaultValue,
  minRows = 5,
  maxRows = 8,
  error,
}) => {
  const borderColor = error ? "border-red-500 " : "border-gray-300 ";

  return (
    <div className="mb-2">
      <label htmlFor={name} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <TextareaAutosize
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        minRows={minRows}
        maxRows={maxRows}
        className={`w-full py-2 px-3 border rounded  
          ${borderColor}`}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
