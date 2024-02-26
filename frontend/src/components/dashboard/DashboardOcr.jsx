import * as React from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts';

function dashboardOcr() {
  const chartSetting = {
    yAxis: [
      {
        label: '입력 횟수',
      },
    ],
    width: 700,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const dataset = [
    {
      Total: 159,
      OCR: 57,
      month: 'Jan',
    },
    {
      Total: 150,
      OCR: 52,
      month: 'Fev',
    },
    {
      Total: 147,
      OCR: 53,
      month: 'Mar',
    },
    {
      Total: 154,
      OCR: 56,
      month: 'Apr',
    },
    {
      Total: 157,
      OCR: 69,
      month: 'May',
    },
    {
      Total: 160,
      OCR: 63,
      Argentina: 103,
      month: 'June',
    },
    {
      Total: 159,
      OCR: 60,
      month: 'July',
    },
    {
      Total: 165,
      OCR: 60,
      month: 'Aug',
    },
    {
      Total: 151,
      OCR: 51,
      month: 'Sept',
    },
    {
      Total: 160,
      OCR: 65,
      month: 'Oct',
    },
    {
      Total: 167,
      OCR: 64,
      month: 'Nov',
    },
    {
      Total: 161,
      OCR: 70,
      month: 'Dec',
    },
  ];

  const valueFormatter = (value) => `${value}건`;

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px' }}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            {
              dataKey: 'Total',
              label: 'Total',
              valueFormatter,
              color: '#66CC99',
            },
            { dataKey: 'OCR', label: 'OCR', valueFormatter, color: '#FF6666' },
          ]}
          {...chartSetting}
        />
      </div>

      <div>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 45, label: 'Accurate', color: '#6666FF' },
                {
                  id: 1,
                  value: 86,
                  label: 'Modified',
                  color: '#CCCCCC',
                },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
}

export default dashboardOcr;
