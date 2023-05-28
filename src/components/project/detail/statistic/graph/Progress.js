import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['StageA', 'StageB', 'StageC', 'StageD'],
//   datasets: [
//     {
//       label: '# progress',
//       data: [100, 90, 30, 0],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.5)',
//         'rgba(54, 162, 235, 0.5)',
//         'rgba(255, 206, 86, 0.5)',
//         'rgba(153,50,204, 0.5)', // dark orchid
//         'rgba(75, 192, 192, 0.5)',
//         'rgba(219,112,147, 0.5)', // pale violet red
//         'rgba(50,205,50, 0.5)', // lime green
//         'rgba(255,215,0, 0.5)', // gold
//         'rgba(153, 102, 255, 0.5)',
//         'rgba(255, 159, 64, 0.5)',
//         'rgba(255,105,180, 0.5)', // hot pink
//         'rgba(205,133,63, 0.5)', // peru
//         'rgba(188,143,143, 0.5)', // rosy brown
//         'rgba(119,136,153, 0.5)', // light slate gray
//         'rgba(176,196,222, 0.5)', //light steel blue
//         'rgba(220,20,60, 0.5)', //crimson
//       ],
//       borderWidth: 1,
//     },
//   ],
// };


export default function Progress({ plan }) {
  const data = {
    labels: Array.from(plan, data => data.stage),
    datasets: [
      {
        label: '# progress',
        data: Array.from(plan, data => 100 * data.progress),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153,50,204, 0.5)', // dark orchid
          'rgba(75, 192, 192, 0.5)',
          'rgba(219,112,147, 0.5)', // pale violet red
          'rgba(50,205,50, 0.5)', // lime green
          'rgba(255,215,0, 0.5)', // gold
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255,105,180, 0.5)', // hot pink
          'rgba(205,133,63, 0.5)', // peru
          'rgba(188,143,143, 0.5)', // rosy brown
          'rgba(119,136,153, 0.5)', // light slate gray
          'rgba(176,196,222, 0.5)', //light steel blue
          'rgba(220,20,60, 0.5)', //crimson
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <>
      <PolarArea data={data} />
    </>
  )
}
