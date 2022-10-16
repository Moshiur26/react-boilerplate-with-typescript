import RouteList from "@/routes/Index";
import { setHeaderTitle } from "./lib/helpers/utils";


const App = () => {
  const currentPage = localStorage.getItem("seletedPage");
  setHeaderTitle(currentPage ? currentPage : "dashboard");
  console.log("currentPage", currentPage);
  return <RouteList />;
};

export default App;
