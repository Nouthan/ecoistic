import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEnergyData } from './features/energy/energySlice';
// import { fetchSeasonalTips } from './features/seasonalTips/seasonalTipsSlice';
// import { fetchPersonalTips } from './features/personalTips/personalTipsSlice';
import { Line } from 'react-chartjs-2';
import SeasonalTips from '../components/SeasonalTips';
import PersonalizedTips from '../components/PersonalTips';
import 'chart.js/auto';

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const energyData = useSelector((state) => state.energy.data);
  // const seasonalTips = useSelector((state) => state.seasonalTips.data);
  // const personalTips = useSelector((state) => state.personalTips.data);
  const [season, setSeason] = useState('Summer'); // Default season
  const personalTips = [
    "Unplug appliances when not in use to save energy.",
    "Switch to LED bulbs to reduce electricity consumption.",
    "Use a programmable thermostat to better control your home's temperature.",
    "Set your water heater to 120°F to save on energy costs.",
    "Perform regular maintenance on HVAC systems to ensure efficiency."
  ];

  const seasonalTips = [
    "Air Conditioner: Current Temperature 30°C, Optimal AC Temperature 24°C.",
    "Ventilation: Current Temperature 28°C, Optimal Temperature 22°C.",
    "Use ceiling fans to help circulate cool air more efficiently.",
    "Close blinds or curtains during the day to reduce heat gain from the sun.",
    "Avoid using the oven; opt for the microwave or outdoor grilling to keep indoor temperatures cooler."
  ];

  const energyData = [
    { date: '2024-07-01', consumption: 20 },
    { date: '2024-07-02', consumption: 22 },
    { date: '2024-07-03', consumption: 18 },
    { date: '2024-07-04', consumption: 25 },
    { date: '2024-07-05', consumption: 30 },
    { date: '2024-07-06', consumption: 28 },
    { date: '2024-07-07', consumption: 24 },
  ];

  // useEffect(() => {
  //   dispatch(fetchEnergyData());
  //   dispatch(fetchSeasonalTips(season));
  //   dispatch(fetchPersonalTips());
  // }, [dispatch, season]);

  const energyConsumptionData = {
    labels: energyData.map((entry) => entry.date),
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: energyData.map((entry) => entry.consumption),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="h-full py-3">
    <h1 className="text-center underline font-bold text-xl md:text-3xl mb-4">Energy Consumption by Day</h1>
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 h-screen">
      <div className="container w-full h-72 md:h-3/4">
        <Line data={energyConsumptionData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-1/4">
        <div className="container mx-auto p-4 w-full h-full">
          <SeasonalTips tips={seasonalTips} />
        </div>
        <div className="container mx-auto p-4 w-full h-full">
          <PersonalizedTips tips={personalTips} />
        </div>
      </div>
    </div>
  </div>  
  );
};

export default Dashboard;
