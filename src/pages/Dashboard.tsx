import React from 'react'
import { useState, useEffect } from "react";
import { getDetails } from "@/lib/services/baseServices";
import { humanize } from "@/lib/helpers/utils";
import { LoadingSpiner } from "@/components/common/LoadingSpiner";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [orderStats, setOrderStats] = useState<any>({});
  const [registrationStats, setRegistrationStats] = useState<any>({});
  const [paymentStats, setPaymentStats] = useState<any>({});
  const [numberOfSubscription, setNumberOfSubscription] = useState<number>();
  const [totalDonation, setTotalDonation] = useState<number>();


  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    setLoading(true);
    const response = await getDetails("dashboards/report_of_30_days");
    setLoading(false);

    if (response?.success) {
      setOrderStats(response?.data?.orders);
      setRegistrationStats(response?.data?.registrations);
      setPaymentStats(response?.data?.payments);
      setNumberOfSubscription(response?.data?.newsletter_subscriptions?.number_of_subscriptions);
      setTotalDonation(response?.data?.donations?.amount);
    } else {
      console.log("something went wrong");
    }
  };

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
            <h1 className='text-sky-900 text-xl text-center font-bold uppercase m-5'>Order Stats</h1>
            <div className="grid grid-cols-4 gap-4">
              {Object.keys(orderStats).map( (key) => (
                  <div className="bg-white text-tahiti-100 h-30 p-3 rounded-md">
                      <h1 className='text-sky-900 text-xl text-center font-bold uppercase'>{humanize(key)}</h1>
                      <h1 className='text-sky-900 text-xl text-center font-bold'>{orderStats && orderStats[key]}</h1>
                  </div>
                )) }
            </div>
            <br/>

            <h1 className='text-sky-900 text-xl text-center font-bold uppercase m-5'>Registration Stats</h1>
            <div className="grid grid-cols-4 gap-4">
              {Object.keys(registrationStats).map( (key) => (
                  <div className="bg-white text-tahiti-100 h-30 p-3 rounded-md">
                      <h1 className='text-sky-900 text-xl text-center font-bold uppercase'>{humanize(key)}</h1>
                      <h1 className='text-sky-900 text-xl text-center font-bold'>{registrationStats && registrationStats[key]}</h1>
                  </div>
                )) }
            </div>
            <br/>

            <h1 className='text-sky-900 text-xl text-center font-bold uppercase m-5'>Payment Stats</h1>
            <div className="grid grid-cols-4 gap-4">
            {Object.keys(paymentStats).map( (key) => (
                <div className="bg-white text-tahiti-100 h-30 p-3 rounded-md">
                    <h1 className='text-sky-900 text-xl text-center font-bold uppercase'>{humanize(key)}</h1>
                    <h1 className='text-sky-900 text-xl text-center font-bold'>{paymentStats && paymentStats[key]}</h1>
                </div>
              )) }
          </div>
          <br/>

          <h1 className='text-sky-900 text-xl text-center font-bold uppercase m-5'>Newsletter Subscriptions</h1>
          <div className="flex flex-row justify-center">
            <div className="basis-1/4 bg-white text-tahiti-100 h-30 p-3 rounded-md">
                <h1 className='text-sky-900 text-xl text-center font-bold uppercase'>Number Of Subscription</h1>
                <h1 className='text-sky-900 text-xl text-center font-bold'>{numberOfSubscription}</h1>
            </div>
          </div>
          <br/>

          <h1 className='text-sky-900 text-xl text-center font-bold uppercase m-5'>Donation</h1>
          <div className="flex flex-row justify-center">
            <div className="basis-1/4 bg-white text-tahiti-100 h-30 p-3 rounded-md">
                <h1 className='text-sky-900 text-xl text-center font-bold uppercase'>Amount</h1>
                <h1 className='text-sky-900 text-xl text-center font-bold'>{totalDonation}</h1>
            </div>
          </div>
          <br/>

        </div>
      </div>
    </div>
  )
};

export default Dashboard;
