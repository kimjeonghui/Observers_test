import React, { useState } from 'react';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts';
import DashboardCalender from './DashboardCalender';

function Dashboard() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);

  const [ocrAccuracy, setCostData] = useState([
    { id: '0', value: 3000, label: 'Accurate', color: '#4174D9' },
    { id: '1', value: 50, label: 'Modified', color: '#F15F5F' },
  ]);

  const [ocrCount, setValidationData] = useState([
    { id: '0', value: 1200, label: 'OCR', color: '#7E41D9' },
    { id: '1', value: 1000, label: '기타', color: '#DAD9FF' },
  ]);

  // Function to calculate percentage for each data point
  const calculatePercentage = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    return data.map((item) => ({
      ...item,
      value: (item.value / total) * 100,
    }));
  };

  const BarchartSetting = {
    yAxis: [
      {
        label: 'Expense Cost (USD)',
      },
    ],
    width: 1000,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

  const evidenceCount = [
    {
      Brussels: 220,
      Argentina: 157,
      EU: 186,
      China: 221,
      month: 'Jan',
    },
    {
      Brussels: 150,
      Argentina: 152,
      EU: 178,
      China: 128,
      month: 'Fev',
    },

    {
      Brussels: 47,
      Argentina: 204,
      EU: 106,
      China: 141,
      month: 'Mar',
    },
    {
      Brussels: 154,
      Argentina: 56,
      EU: 192,
      China: 173,
      month: 'Apr',
    },
    {
      Brussels: 57,
      Argentina: 169,
      EU: 202,
      China: 240,
      month: 'May',
    },
    {
      Brussels: 160,
      Argentina: 123,
      EU: 103,
      China: 144,
      month: 'June',
    },
    {
      Brussels: 59,
      Argentina: 60,
      EU: 105,
      China: 119,
      month: 'July',
    },
    {
      Brussels: 265,
      Argentina: 160,
      EU: 106,
      China: 200,
      month: 'Aug',
    },
    {
      Brussels: 51,
      Argentina: 151,
      EU: 95,
      China: 131,
      month: 'Sept',
    },
    {
      Brussels: 160,
      Argentina: 265,
      EU: 97,
      China: 155,
      month: 'Oct',
    },
    {
      Brussels: 117,
      Argentina: 134,
      EU: 176,
      China: 148,
      month: 'Nov',
    },
    {
      Brussels: 161,
      Argentina: 170,
      EU: 103,
      China: 125,
      month: 'Dec',
    },
  ];

  const valueFormatter = (value) => `${value}k`;

  const LinechartSetting = {
    yAxis: [
      {
        label: 'Exchanged Money (KRW)',
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-30px, 0)',
      },
    },
  };

  const years = [
    new Date(2015, 0, 1),
    new Date(2016, 0, 1),
    new Date(2017, 0, 1),
    new Date(2018, 0, 1),
    new Date(2019, 0, 1),
    new Date(2020, 0, 1),
    new Date(2021, 0, 1),
    new Date(2022, 0, 1),
    new Date(2023, 0, 1),
  ];

  const USDUsage = [
    41689, 45619.785, 46177.617, 47177, 47077, 44000, 48500, 49000, 51000,
  ];
  const EURUsage = [
    21334, 27782.83, 28058.086, 28058, 28500, 25000, 29500, 30000, 32000,
  ];
  const ARSUsage = [
    13124, 16895, 17515.918, 17516, 18000, 16500, 19000, 19500, 20000,
  ];

  return (
    <div>
      <DashboardCalender
        currentDate={currentDate}
        year={year}
        setYear={setYear}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
        <div>
          <h2>OCR 정확도</h2>
          <PieChart
            series={[
              {
                data: calculatePercentage(ocrAccuracy), // Calculate percentages
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
              },
            ]}
            width={550}
            height={250}
          />
        </div>

        <div>
          <h2>OCR 입력 횟수</h2>
          <PieChart
            series={[
              {
                data: ocrCount,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
              },
            ]}
            width={550}
            height={250}
          />
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
        <div>
          <h2>사무소별 증빙자료 개수</h2>
          <BarChart
            dataset={evidenceCount}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'Brussels', label: 'Brussels', valueFormatter },
              { dataKey: 'Argentina', label: 'Argentina', valueFormatter },
              { dataKey: 'EU', label: 'European Union', valueFormatter },
              { dataKey: 'China', label: 'China', valueFormatter },
            ]}
            {...BarchartSetting}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
