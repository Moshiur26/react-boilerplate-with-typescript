import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Space, Pagination } from "antd";
import { setHeaderTitle, getRole } from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services/baseServices";
import { AiOutlineEye } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import AdminDelete from "@/components/admins/AdminDelete";
import { LoadingSpiner } from "@/components/common/LoadingSpiner";
import { roleBasedPermissions as RBP } from "@/lib/constants/roles";
import { humanize } from "@/lib/helpers/utils";
import Cookies from "js-cookie";

const List = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [adminId, setAdminId] = useState(0);
  const [userName, setUsername] = useState("");
  const role: any = Cookies.get("role" || "");

  useEffect(() => {
    getAllAdmins(page, perPage);
  }, []);

  const getAllAdmins = async (page?: number, perPage?: number) => {
    setLoading(true);
    const res = await getPaginatedData("admins", {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    console.log("admins list", res);
    if (res?.data?.success) {
      setAdmins(res?.data?.data);
      setPage(+res?.headers["x-page"]);
      setTotalPages(+res?.headers["x-total-pages"]);
      setTotal(+res?.headers["x-total"]);
    } else {
      console.log("Something went wrong");
    }
  };

  const handlePageChange = (page: number) => {
    getAllAdmins(page, perPage);
  };

  const showHideModal = (id?: number, username?: string) => {
    id && setAdminId(id);
    username && setUsername(username);
    setIsModalVisible(!isModalVisible);
  };

  setHeaderTitle("admin_management");

  const columns: any = [
    {
      title: "#",
      key: "id",
      align: "left",
      render: (text: any, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      align: "left",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (name: string) => <span className="break-all">{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "id",
      align: "left",
      render: (email: string) => <span className="break-all">{email}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "id",
      align: "left",
      render: (phone: string) => <span className="break-all">{phone}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "id",
      align: "left",
      render: (role: string) => (
        <span className="break-all">{humanize(role)}</span>
      ),
    },

    {
      title: "Action",
      align: "left",
      key: "id",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link to={`/admin/details/${record.id}`}>
            <AiOutlineEye className="text-sky-700 text-lg" />
          </Link>

          {RBP?.admin?.edit.includes(role) && (
            <Link to={`/admin/edit/${record.id}`}>
              <MdModeEditOutline className="text-yellow-400 text-lg" />
            </Link>
          )}

          {/* <button onClick={() => showHideModal(record?.id, record?.username)}>
            <RiDeleteBinLine className="text-red-700 text-lg" />
          </button> */}
        </Space>
      ),
    },
  ];
  if (loading) {
    return <LoadingSpiner />;
  }
  return (
    <div className="bg-white rounded p-8 shadow">
      <div className="flex justify-between items-baseline mb-4 pt-4">
        <h2 className=" page-title relative top-2 ">Admin List</h2>

        {RBP?.admin?.create.includes(role) && (
          <div className="flex justify-end">
            <Link
              to="/admin/add"
              className="btn btn-outline-primary flex justify-center"
            >
              <IoAdd className=" whitespace-nowrap" size={18} />
              <span className="ml-1  ">Add Admin</span>
            </Link>
          </div>
        )}
      </div>

      <div className="mb-6">
        <Table
          columns={columns}
          dataSource={admins}
          rowKey={"id"}
          pagination={false}
          bordered
          size="small"
        />
      </div>
      <div className="flex justify-end">
        <Pagination
          defaultCurrent={1}
          current={page}
          defaultPageSize={perPage}
          total={total}
          onChange={handlePageChange}
          responsive
        />
      </div>
      {adminId ? (
        <AdminDelete
          id={adminId}
          name={userName}
          isModalVisible={isModalVisible}
          showHideModal={showHideModal}
          getAllClients={getAllAdmins}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default List;
