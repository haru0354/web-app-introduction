"use client";

import TextareaAutosize from "react-textarea-autosize";

type TextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  minRows?: number;
  maxRows?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  placeholder,
  defaultValue,
  minRows = 3,
  maxRows = 6,
}) => {
  return (
    <>
      <label htmlFor={label} className="block text-sm">
        {label}
      </label>
      <TextareaAutosize
        className="w-full mt-2 mb-3 py-1 px-2 border border-customBlack rounded"
        id={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        minRows={minRows}
        maxRows={maxRows}
      />
    </>
  );
};

export default Textarea;
