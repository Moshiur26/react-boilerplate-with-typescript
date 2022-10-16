import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import {
  MdMuseum,
  MdTransform,
  MdOutlineNewReleases,
  MdCategory,
  MdModelTraining,
  MdReportGmailerrorred,
  MdPayment,
} from "react-icons/md";
import {
  RiRegisteredLine,
  RiFilePaper2Line,
  RiSlideshowLine,
  RiGalleryLine,
  RiShoppingBasketLine,
  RiGalleryUploadFill,
  RiSecurePaymentLine,
} from "react-icons/ri";
import { HiViewGrid, HiUserGroup } from "react-icons/hi";
import { FaListAlt, FaMapMarkedAlt, FaBlog } from "react-icons/fa";
import {
  GiPapers,
  GiNotebook,
  GiReceiveMoney,
  GiVerticalBanner,
  GiNewspaper,
} from "react-icons/gi";
import {
  BsPeople,
  BsBook,
  BsNewspaper,
  BsArchiveFill,
  BsFillJournalBookmarkFill,
  BsFillCalendarEventFill,
  BsShop,
  BsCollectionPlay,
} from "react-icons/bs";
import {
  BiCategory,
  BiLocationPlus,
  BiMessageAltEdit,
  BiCurrentLocation,
  BiLibrary,
  BiSlideshow,
  BiDonateBlood,
  BiRegistered,
} from "react-icons/bi";
import genocide_logo from "@/assets/logo/genocide_logo.png";
import genocide_logo_sm from "@/assets/logo/genocide_logo_sm.png";
import { AiOutlineNotification, AiOutlineVideoCamera, AiOutlineAudit, AiOutlineShoppingCart } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";

import { useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";
import { roleBasedPermissions as RBP } from "@/lib/constants/roles";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: FC<SidebarProps> = ({ collapsed }) => {
  const { global } = useAppSelector((state) => state);
  const role: any = Cookies.get("role" || "");

  const items: any = [
    {
      label: <NavLink to="/">Dashboard</NavLink>,
      key: "dashboard",
      icon: <HiViewGrid />,
      disabled: RBP?.dashboard.includes(role) ? false : true,
    },
    {
      label: <NavLink to="/admin/list">Admins</NavLink>,
      key: "admin_management",
      icon: <HiUserGroup />,
      disabled: RBP?.admin.list.includes(role) ? false : true,
    },
  ];

  const filteredItems = items.filter((item: any) => !item?.disabled);

  console.log("role", role);
  return (
    <>
      <div className="h-44 flex justify-center items-center ">
        <div className="">
          {collapsed ? (
            <img src={genocide_logo_sm} alt="Genocide small logo" />
          ) : (
            <img src={genocide_logo} alt="Genocide logo" />
          )}
        </div>
      </div>
      <div style={{ height: "200px" }}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          selectedKeys={[`${global.seletedPage}`]}
          mode="inline"
          items={filteredItems}
          style={{ paddingBottom: 50 }}
        />
      </div>
    </>
  );
};

export default Sidebar;
