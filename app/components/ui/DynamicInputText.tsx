"use client";

import { useState } from "react";

import InputText from "./InputText";
import Button from "./button/Button";

type DynamicInputTextProps = {
  label: string;
  defaultValue?: string[];
  error?: string[];
};

const DynamicInputText: React.FC<DynamicInputTextProps> = ({
  label,
  defaultValue,
  error,
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
    <div className="mb-2">
      <p className="mb-1 text-sm font-medium">{label}</p>
      <div className="mb-2 p-4 border rounded border-gray-300">
        {renderInputFields()}
        <div className="flex items-center justify-center">
          <Button
            type="button"
            color="gray"
            size="small"
            onClick={handleAddItem}
            disabled={visibleCount >= maxVisibleCount}
            className="rounded "
          >
            リストの追加
          </Button>
        </div>
        <p className="text-center text-sm">
          最大でリストは5つまで記載できます。
        </p>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DynamicInputText;
