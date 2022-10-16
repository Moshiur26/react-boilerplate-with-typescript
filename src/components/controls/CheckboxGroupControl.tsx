import { FC } from "react";
import { Controller } from "react-hook-form";
import { Checkbox, Space } from "antd";

interface CheckboxGroupControlProps {
  name: string;
  control: any;
  items: any[];
  errors?: any;
  isDisabled?: boolean;
  direction?: "horizontal" | "vertical";
  className?: string;
}

export const CheckboxGroupControl: FC<CheckboxGroupControlProps> = ({
  name,
  control,
  items,
  errors,
  isDisabled = false,
  direction = "vertical",
  className = "",
}) => {
  let errMsg = errors?.[name]?.message;

  return (
    <div className="my-select-container">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox.Group
            {...field}
            disabled={isDisabled}
            className={`!rounded-lg !my-1 ${className}`}
          >
            <Space direction={direction}>
              <Checkbox value="1">A</Checkbox>
              <Checkbox value="2">B</Checkbox>
              <Checkbox value="3">C</Checkbox>
              <Checkbox value="4">D</Checkbox>
            </Space>
          </Checkbox.Group>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
