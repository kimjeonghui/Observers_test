import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts';

function Dashboard() {
  const [pieChartData, setPieChartData] = useState([
    { id: 0, value: 1000, label: '전월이월' },
    { id: 1, value: 2000, label: '자금 수입' },
    { id: 2, value: 1500, label: '인건비' },
    { id: 3, value: 800, label: '경비' },
    { id: 4, value: 1200, label: '기타지출' },
    { id: 5, value: 1800, label: '경상투자' },
    { id: 6, value: 2500, label: '당월잔액' },
  ]);

  return (
    <div>
      <PieChart
        series={[
          {
            data: pieChartData,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default Dashboard;
