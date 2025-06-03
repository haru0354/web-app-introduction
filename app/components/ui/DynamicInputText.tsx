"use client";

import { useState } from "react";

import InputText from "./InputText";
import Button from "./button/Button";

type DynamicInputTextProps = {
  defaultValue?: string[];
};

const DynamicInputText: React.FC<DynamicInputTextProps> = ({
  defaultValue,
}) => {
  const initialVisibleCount = 1;
  const maxVisibleCount = 5;

  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const handleAddItem = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 1, maxVisibleCount));
  };

  const renderInputFields = () => {
    const inputs = [];
    const values = defaultValue ?? [];

    for (let i = 0; i < visibleCount; i++) {
      inputs.push(
        <InputText
          key={i}
          name={`can${i}`}
          placeholder="出来ることをリストで入力してください。"
          defaultValue={values[i] ?? ""}
        />
      );
    }
    return inputs;
  };

  return (
    <div className="border border-customBlack p-4">
      <p className="font-semibold mb-2">出来ることリスト</p>
      {renderInputFields()}
      <Button
        type="button"
        color="blue"
        size="normal"
        onClick={handleAddItem}
        disabled={visibleCount >= maxVisibleCount}
      >
        追加
      </Button>
    </div>
  );
};

export default DynamicInputText;
