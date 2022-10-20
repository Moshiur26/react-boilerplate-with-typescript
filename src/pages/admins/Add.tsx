import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import AdminForm from "@/components/admins/AdminForm";
import { setHeaderTitle } from "@/lib/helpers/utils";
import * as yup from "yup";
import { Row, Col } from "antd";

const createAdminSchema = yup
  .object({
    name: yup.string().required("Name is required").trim(),
    username: yup
      .string()
      .required("Username address is required"),
    email: yup
      .string()
      .email("Invalid email address"),
    phone: yup
      .string()
      .matches(
        /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
        "Provide valid BD phone number"
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /(?=.*\d)([a-zA-Z0-9]).{5,}/,
        "Minimum six characters with one number required"
      ),
    confirmPassword: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup.string().typeError('Role is required').required("Role is required"),
  })
  .required();

const Add = () => {
  setHeaderTitle("admin_management");

  return (
    <div className="bg-white rounded p-8 pb-16 shadow-sm">
      <div className="flex justify-end">
        <Link to="/admin/list" className="btn btn-outline-light">
          <BiArrowBack className="inline-block" size={15} />
          <span className="ml-1.5 relative !text-xs">Back to list</span>
        </Link>
      </div>
      <Row className="mt-8">
      <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 22, offset: 1 }}
          md={{ span: 22, offset: 1 }}
          lg={{ span: 22, offset: 2 }}
          xl={{ span: 13, offset: 4 }}
          xxl={{ span: 13, offset: 5 }}
        >
          <h2 className=" page-title relative top-2 text-center mb-8">
            Create New Admin
          </h2>
          <div>
            <AdminForm formMode="CREATE" validationSchema={createAdminSchema} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Add;
