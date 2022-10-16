import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import AdminForm from "@/components/admins/AdminForm";
import { setHeaderTitle } from "@/lib/helpers/utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "@/lib/services/baseServices";
import * as yup from "yup";
import { Row, Col } from "antd";

const updateAdminSchema = yup
  .object({
    name: yup.string().required("Name is required").trim(),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email address is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
        "Provide valid BD phone number"
      ),
    role: yup
      .string()
      .typeError("Role is required")
      .required("Role is required"),
  })
  .required();

const Edit = () => {
  const [adminDetails, setAdminDetails] = useState<any>({});
  const { id } = useParams();

  setHeaderTitle("admin_management");

  useEffect(() => {
    getAdminDetails();
  }, [id]);

  const getAdminDetails = async () => {
    const response = await getDetails("admins", id);

    if (response?.success) {
      setAdminDetails(response?.data);
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <div className="bg-white rounded p-8 pb-16 shadow">
      <div className="flex justify-end">
        <Link to="/admin/list" className="btn btn-outline-light">
          <BiArrowBack className="inline-block" /> Back to list
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
          <h2 className="page-title text-center">Edit Admin</h2>
          <div>
            <AdminForm
              formMode="UPDATE"
              adminData={adminDetails}
              validationSchema={updateAdminSchema}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Edit;
