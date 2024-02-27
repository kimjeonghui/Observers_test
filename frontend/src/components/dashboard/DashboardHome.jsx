import React, { useState } from 'react';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts';
import DashboardCalender from './DashboardCalender';

function Dashboard() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);

  const [costData, setCostData] = useState([
    { id: '0', value: 3000, label: '인건비', color: '#CC3D3D' },
    { id: '1', value: 2000, label: '경비', color: '#F15F5F' },
    { id: '2', value: 800, label: '경상투자', color: '#FFA7A7' },
    { id: '3', value: 500, label: '기타지출', color: '#FFD8D8' },
    // { id: '4', value: 2500, label: '당월잔액', color: '#cc0000' },
  ]);

  const [incomeData, setIncomeData] = useState([
    { id: '0', value: 10000, label: '전도금입금', color: '#003399' },
    { id: '1', value: 2500, label: '전월이월', color: '#4174D9' },
    { id: '2', value: 1500, label: '자금수입', color: '#6699FF' },
    { id: '3', value: 1000, label: '이자수익', color: '#B2CCFF' },
    { id: '4', value: 1500, label: '기타이익', color: '#D9E5FF' },
    // { id: '5', value: 1800, label: '경상투자', color: '#dcdcdc' },
  ]);

  const [validationData, setValidationData] = useState([
    { id: '0', value: 1000, label: '기말잔액', color: '#6B9900' },
    { id: '1', value: 1000, label: '전월이월', color: '#9FC93C' },
    { id: '2', value: 2000, label: '당월잔액', color: '#BCE55C' },
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

  const expenseCost = [
    {
      Brussels: 59,
      Argentina: 57,
      EU: 86,
      China: 21,
      month: 'Jan',
    },
    {
      Brussels: 50,
      Argentina: 52,
      EU: 78,
      China: 28,
      month: 'Fev',
    },

    {
      Brussels: 47,
      Argentina: 53,
      EU: 106,
      China: 41,
      month: 'Mar',
    },
    {
      Brussels: 54,
      Argentina: 56,
      EU: 92,
      China: 73,
      month: 'Apr',
    },
    {
      Brussels: 57,
      Argentina: 69,
      EU: 92,
      China: 99,
      month: 'May',
    },
    {
      Brussels: 60,
      Argentina: 63,
      EU: 103,
      China: 144,
      month: 'June',
    },
    {
      Brussels: 59,
      Argentina: 60,
      EU: 105,
      China: 319,
      month: 'July',
    },
    {
      Brussels: 65,
      Argentina: 60,
      EU: 106,
      China: 249,
      month: 'Aug',
    },
    {
      Brussels: 51,
      Argentina: 51,
      EU: 95,
      China: 131,
      month: 'Sept',
    },
    {
      Brussels: 60,
      Argentina: 65,
      EU: 97,
      China: 55,
      month: 'Oct',
    },
    {
      Brussels: 67,
      Argentina: 64,
      EU: 76,
      China: 48,
      month: 'Nov',
    },
    {
      Brussels: 61,
      Argentina: 70,
      EU: 103,
      China: 25,
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
          <h2>지출 구분</h2>
          <PieChart
            series={[
              {
                // arcLabel: (item) => `${item.label} (${item.value})`,
                // arcLabelMinAngle: 45,
                // data: costData,
                data: calculatePercentage(costData), // Calculate percentages
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
          <h2>수입 구분</h2>
          <PieChart
            series={[
              {
                // arcLabel: (item) => `${item.label} (${item.value})`,
                // arcLabelMinAngle: 45,
                // data: c,
                data: calculatePercentage(incomeData), // Calculate percentages
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
          <h2>기말 기초 잔액</h2>
          <PieChart
            series={[
              {
                // arcLabel: (item) => `${item.label} (${item.value})`,
                // arcLabelMinAngle: 45,
                data: validationData,
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
          <h2>연간 사무소별 지출 금액</h2>
          <BarChart
            dataset={expenseCost}
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
        <div>
          <h2>연간 KRW 환전 금액</h2>
          <LineChart
            xAxis={[
              {
                id: 'Years',
                data: years,
                scaleType: 'time',
                valueFormatter: (date) => date.getFullYear().toString(),
              },
            ]}
            series={[
              {
                id: 'USD',
                label: 'United States Dollar',
                data: USDUsage,
                stack: 'total',
                area: true,
                showMark: false,
              },
              {
                id: 'EUR',
                label: 'Euro',
                data: EURUsage,
                stack: 'total',
                area: true,
                showMark: false,
              },
              {
                id: 'ARS',
                label: 'Argentine Peso',
                data: ARSUsage,
                stack: 'total',
                area: true,
                showMark: false,
              },
            ]}
            width={600}
            height={400}
            margin={{ left: 70 }}
            {...LinechartSetting} // Include yAxis setting
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
