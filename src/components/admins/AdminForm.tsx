import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postData, updateData } from "@/lib/services/baseServices";
import { toast } from "react-toastify";
import { LoadingSpiner } from "@/components/common/LoadingSpiner";
import {
  FieldLabel,
  InputControl,
  PasswordControl,
  SelectControl,
} from "@/components/common/FormControl";
import { Button } from "antd";
import { humanize } from "@/lib/helpers/utils";

interface AdminFormProps {
  formMode: "CREATE" | "UPDATE";
  adminData?: any;
  validationSchema: any;
}

interface IFormInputs {
  name: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  role: string;
}

const roleOptions = [
  // { id: 1, value: 'member', label: "Member" },
  { id: 2, value: 'admin', label: "Admin" },
  // { id: 3, value: 'super_admin', label: "Super Admin" },
  // { id: 4, value: 'manager', label: "Manager" },
];

const AdminForm: FC<AdminFormProps> = ({
  formMode,
  adminData,
  validationSchema,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (formMode === "UPDATE") {
      reset({
        name: adminData?.name,
        username: adminData?.username,
        email: adminData?.email,
        phone: adminData?.phone,
        role: adminData?.role
      });
    }
  }, [adminData]);

  const onSubmit = async (data: IFormInputs) => {
    const formData = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
      password_confirmation: data.confirmPassword,
      role: data.role,
    };
    console.log(formData);
    if (formMode === "CREATE") {
      setLoading(true);
      const res = await postData("admins", formData);

      console.log("admin create", res);
      setLoading(false);

      if (res?.success) {
        toast.success(res?.message);
        navigate("/admin/list");
      } else {
        toast.error(res?.message);
      }
    } else {
      setLoading(true);
      const res = await updateData("admins", formData, adminData?.id);
      console.log(" update admin response", res);
      setLoading(false);

      if (res?.success) {
        toast.success(res?.message);
        navigate("/admin/list");
      } else {
        toast.error(res?.message);
      }
    }
  };

  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="my-5 ">
        <FieldLabel
          name="name"
          label="Name"
          required
          className="relative bottom-0.5  text-gray-500"
        />
        <InputControl
          control={control}
          name="name"
          errors={errors}
          placeholder="e.g. john doe"
          className="!text-xs"
        />
      </div>

      <div className="mb-5">
        <FieldLabel
          name="email"
          label="Email"
          required
          className="relative bottom-0.5 text-gray-500"
        />
        <InputControl
          control={control}
          name="email"
          type="email"
          errors={errors}
          placeholder="e.g. john@gmail.com"
        />
      </div>

      <div className="mb-5">
        <FieldLabel
          name="phone"
          label="Phone"
          required
          className="relative bottom-0.5 text-gray-500"
        />

        <InputControl
          control={control}
          name="phone"
          errors={errors}
          placeholder="e.g. 01715123456"
        />
      </div>

      {formMode === "CREATE" && (
        <>
          <div className="mb-5">
            <FieldLabel
              name="password"
              label="Password"
              required
              className="relative bottom-0.5 text-gray-500"
            />
            <PasswordControl
              control={control}
              name="password"
              errors={errors}
              placeholder="e.g. *************"
            />
          </div>
          <div className="mb-5">
            <FieldLabel
              name="confirmPassword"
              label=" Password Confirmation"
              required
              className="relative bottom-0.5 text-gray-500"
            />

            <PasswordControl
              control={control}
              name="confirmPassword"
              errors={errors}
              placeholder="e.g. *************"
            />
          </div>
        </>
      )}

      <div className="mb-5">
        <FieldLabel
          name="role"
          label="Role"
          required
          className=" text-gray-500"
        />

        <SelectControl
          control={control}
          name="role"
          options={roleOptions}
          placeholder="Please select a role"
          errors={errors}
        />
      </div>

      <div className="mt-6">
        <Button
          className="bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 hover:border-emerald-500 rounded-lg uppercase  px-10"
          type="primary"
          size="large"
          htmlType="submit"
        >
          {formMode === "CREATE" ? "create" : "update"}
        </Button>

        <Button
          className="bg-gray-500 hover:bg-gray-400 border border-gray-500 hover:border-gray-400 rounded-lg uppercase ml-4 px-10"
          type="primary"
          size="large"
          onClick={() => navigate("/admin/list")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminForm;
