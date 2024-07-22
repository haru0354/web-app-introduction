import { useState } from "react";
import InputText from "./InputText";
import Button from "./Button";

const DynamicInputText = () => {
  const initialVisibleCount = 1;
  const maxVisibleCount = 5;

  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const handleAddItem = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 1, maxVisibleCount));
  };

  const renderInputFields = () => {
    const inputs = [];
    for (let i = 0; i < visibleCount; i++) {
      inputs.push(
        <InputText
          key={i}
          name={`can${i}`}
          placeholder="出来ることをリストで入力してください。"
        />
      );
    }
    return inputs;
  };

  return (
    <div className="border border-gray-700 p-4">
      <p className="font-semibold mb-2">出来ることリスト</p>
      {renderInputFields()}
      <Button
        color="blue"
        size="normal"
        type="button"
        onClick={handleAddItem}
        disabled={visibleCount >= maxVisibleCount}
      >
        追加
      </Button>
    </div>
  );
};

export default DynamicInputText;
