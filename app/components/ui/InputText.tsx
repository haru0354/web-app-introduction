type InputTextProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string[];
};

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
  disabled,
  error,
}) => {
  const borderColor = error ? "border-red-500 " : "border-gray-300 ";

  return (
    <div className="mb-2">
      <label htmlFor={name} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full py-2 px-3 border rounded  
          ${borderColor}`}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputText;
