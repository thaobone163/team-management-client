import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function TaskStage({doneAndUndoneTask}) {
  const data = {
    labels: Array.from(doneAndUndoneTask, data => data.stage),
    datasets: [
      {
        label: 'Completed',
        data: Array.from(doneAndUndoneTask, data => data.doneTaskCount),
        backgroundColor: 'rgba(52, 199, 89, 0.5)',
      },
      {
        label: 'Incomplete',
        data: Array.from(doneAndUndoneTask, data => data.undoneTaskCount),
        backgroundColor: 'rgba(255, 69, 58, 0.5)',
      },
    ],
  }
  return <Bar options={options} data={data} />;
}
