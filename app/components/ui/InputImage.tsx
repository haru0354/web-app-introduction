type InputImageProps = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
};

const InputImage: React.FC<InputImageProps> = ({
  label,
  name,
  placeholder,
  defaultValue,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className="block text-sm">
          {label}
        </label>
      )}
      <input
        type="file"
        className="w-full mt-2 mb-3 py-1 px-2 border border-customBlack rounded"
        id={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default InputImage;
