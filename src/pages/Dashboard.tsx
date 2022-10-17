import React from 'react'
import { useState, useEffect } from "react";
import { getDetails } from "@/lib/services/baseServices";
import { humanize } from "@/lib/helpers/utils";
import { LoadingSpiner } from "@/components/common/LoadingSpiner";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  

  if (loading) {
    return <LoadingSpiner />;
  }
  return (
    <div>
      <div className="main-content">
          <div className="page-header">
              <h2 className="page-title">Dashboard</h2>
          </div>

          <div className='bg-slate-400 p-5'>

        </div>
      </div>
    </div>
  )
};

export default Dashboard;
