import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "@/lib/services/baseServices";
import { getRole, humanize } from "@/lib/helpers/utils";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { setHeaderTitle } from "@/lib/helpers/utils";
import _ from "lodash";

const Details = () => {
  const [adminDetails, setAdminDetails] = useState<any>({});
  const { id } = useParams();

  setHeaderTitle("admin_management");

  useEffect(() => {
    getAdminDetails();
  }, [id]);

  const getAdminDetails = async () => {
    const response = await getDetails("admins", id);

    if (response?.success) {
      setAdminDetails(_.omit(response?.data, 'id'));
    } else {
      console.log("something went wrong");
    }
  };
  return (
    <div className="bg-white rounded p-8 shadow">
      <div className="flex justify-end">
        <Link to="/admin/list" className="btn btn-outline-light">
          <BiArrowBack className="inline-block " size={15} />
          <span className="ml-1.5 relative  !text-xs">Back to list</span>
        </Link>
      </div>
      <h1 className="page-title ">Admin Details</h1>
      <div className="pb-16 mt-4">
        <table className="min-w-full divide-y divide-gray-200 table-fixed border">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={3} className="detail-header">
                General Information
              </td>
            </tr>
            {Object.entries(adminDetails).map(([key, value]: any, index) => (
              <tr className="hover:bg-gray-100 odd:bg-gray-100" key={index}>
                <td className="detail-key">{humanize(key)}</td>
                <td className="font-bold">:</td>
                <td className="detail-data">
                  {key === "role" ? humanize(value) : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
