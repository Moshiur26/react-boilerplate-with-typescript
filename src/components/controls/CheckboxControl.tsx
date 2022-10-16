import { FC } from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "antd";

interface CheckboxControlProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  className?: string;
}

export const CheckboxControl: FC<CheckboxControlProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  className = "",
}) => {
  let errMsg = errors?.[name]?.message;

  return (
    <div className="my-select-container">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox
            {...field}
            disabled={isDisabled}
            className={`!rounded-lg !my-1 ${className}`}
          >
            Checkkkk
          </Checkbox>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
