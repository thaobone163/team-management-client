import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskProject({ totalTask }) {
  const data = {
    labels: Array.from(totalTask, data => data.stage),
    datasets: [
      {
        label: '# Number of task',
        data: Array.from(totalTask, data => data.totalTaskCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 50, 204, 0.2)', // dark orchid
          'rgba(75, 192, 192, 0.2)',
          'rgba(219, 112, 147, 0.2)', // pale violet red
          'rgba(50, 205, 50, 0.2)', // lime green
          'rgba(255, 215, 0, 0.2)', // gold
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255,105,180, 0.2)', // hot pink
          'rgba(205,133,63, 0.2)', // peru
          'rgba(188,143,143, 0.2)', // rosy brown
          'rgba(119,136,153, 0.2)', // light slate gray
          'rgba(176,196,222, 0.2)', //light steel blue
          'rgba(220,20,60, 0.2)', //crimson
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 50, 204, 1)', // dark orchid
          'rgba(75, 192, 192, 1)',
          'rgba(219, 112, 147, 1)', // pale violet red
          'rgba(50, 205, 50, 1)', // lime green
          'rgba(255, 215, 0, 1)', // gold
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,105,180, 1)', // hot pink
          'rgba(205,133,63, 1)', // peru
          'rgba(188,143,143, 1)', // rosy brown
          'rgba(119,136,153, 1)', // light slate gray
          'rgba(176,196,222, 1)', //light steel blue
          'rgba(220,20,60, 1)', //crimson
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <Pie data={data} />
    </>
  )
}
