import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, List, Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { avatarFormatter, humanize } from "@/lib/helpers/utils";
import { deleteData } from "@/lib/services/baseServices";
import { useAppSelector } from "@/store/hooks";

const Header = () => {
  const navigate = useNavigate();
  const email = Cookies.get("email" || "");
  const role = Cookies.get("role" || "");
  const name = Cookies.get("name" || "");

  const { global } = useAppSelector((state) => state);

  const handleLogout = async () => {
    const res = await deleteData("logout");

    if (res?.success) {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("email");
      Cookies.remove("name");
      Cookies.remove("expiry");
      localStorage.setItem("seletedPage", "");
      navigate("/login", { replace: true });
    }

    console.log("logout", res);
  };

  const userMenu = (
    <List
      dataSource={[1]}
      className=" rounded"
      renderItem={(item) => (
        <List.Item className="flex-col justify-start p-10 py-6">
          <div className="mb-6">
            <div className="flex justify-center">
              <FaUserCircle size={80} className="text-gray-300" />
            </div>
            <h2 className="uppercase  font-medium text-emerald-700 text-center pt-2">
              {role} user
            </h2>
            <p className="text-gray-500">{email}</p>
          </div>
          <div>
            <Button
              icon={<PoweroffOutlined className="relative -top-0.5" />}
              ghost
              danger
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </List.Item>
      )}
    />
  );

  return (
    <div className="flex justify-between items-baseline">
      <div className="hidden lg:block mt-2 text-gray-400 text-sm  uppercase ">
        {humanize(global?.seletedPage)}
      </div>
      <div className="ml-auto">
        <Dropdown overlay={userMenu}>
          <Avatar className="bg-emerald-700" size="large">
            {avatarFormatter(name)}
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
