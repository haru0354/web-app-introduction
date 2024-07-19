type InputTextProps = {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
};

const InputText: React.FC<InputTextProps> = ({ label, name, placeholder, defaultValue }) => {
  return (
    <>
      <label htmlFor={label} className="text-sm">
        {label}
      </label>
      <input
        type="text"
        className="flex flex-col w-full  mt-2 mb-3 py-1 px-2  border border-gray-700 rounded"
        id={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default InputText;
