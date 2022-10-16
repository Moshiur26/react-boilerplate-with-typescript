import React from "react";
import  {setHeaderTitle } from "@/lib/helpers/utils"
import Dashboard from "@/pages/Dashboard"

const Home = () => {
  setHeaderTitle("dashboard");

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Home;
