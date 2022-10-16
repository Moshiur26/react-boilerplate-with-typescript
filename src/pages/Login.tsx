import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputControl, PasswordControl } from "@/components/common/FormControl";
import genocide_logo from "@/assets/logo/genocide_logo_original.png";
import { postData } from "@/lib/services/baseServices";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
interface IFormInputs {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required").trim(),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: IFormInputs) => {
    const res = await postData("login", { ...data });

    if (res?.success) {
      Cookies.set("token", res?.data?.token, { expires: 1 }),
        Cookies.set("role", res?.data?.role, { expires: 1 }),
        Cookies.set("email", res?.data?.email, { expires: 1 }),
        Cookies.set("name", res?.data?.name, { expires: 1 }),
        Cookies.set("expiry", res?.data?.expiry);
      navigate("/", { replace: true });
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="h-screen bg-login">
      <div className=" bg-gray-900 bg-opacity-50 h-screen">
        <Row className="h-screen pt-20">
          <Col
            xs={{ span: 18, offset: 3 }}
            sm={{ span: 14, offset: 5 }}
            lg={{ span: 10, offset: 7 }}
            xl={{ span: 8, offset: 8 }}
            xxl={{ span: 6, offset: 9 }}
          >
            <div
              className="bg-white bg-opacity-50 shadow-xl rounded "
              // style={{ height: "550px" }}
            >
              <div className="flex justify-center">
                <div className="mt-8">
                  <img
                    src={genocide_logo}
                    width="200"
                    height="200"
                    alt="Genocide logo"
                  />
                  <h2 className="mt-12 font-semibold text-emerald-800">
                    Login to continue to admin panel
                  </h2>
                </div>
              </div>
              <div className="px-16 mt-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                    <InputControl
                      control={control}
                      name="email"
                      type="email"
                      placeholder="e.g. admin@misfit.tech"
                      errors={errors}
                    />
                  </div>
                  <div className="mb-5">
                    <PasswordControl
                      control={control}
                      name="password"
                      placeholder="e.g. *******"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <Button
                      type="primary"
                      block
                      danger
                      size="large"
                      htmlType="submit"
                      className="rounded-lg uppercase"
                    >
                      Login
                    </Button>
                  </div>
                  <div className="text-right mt-2">
                    <span className=" text-emerald-700 cursor-pointer border-b border-emerald-700 pb-1 sha">
                      Forget your password?
                    </span>
                  </div>
                </form>
              </div>
              <div className="text-center relative top-6">
                <p className="text-center text-white text-xs">
                  Developed by Misfit &copy; 2022
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
