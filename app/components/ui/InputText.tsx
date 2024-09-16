type InputTextProps = {
  label?: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  type?: string;
  disabled?: boolean;
};

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  defaultValue,
  type = "text",
  disabled,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className="block text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        className="w-full mt-2 mb-3 py-1 px-2 border border-gray-700 rounded"
        id={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </>
  );
};

export default InputText;
