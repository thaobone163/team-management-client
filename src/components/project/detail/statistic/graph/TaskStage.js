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

const labels = ['StageA', 'StageB', 'StageC', 'StageD'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Completed',
      data: [30, 60, 22, 7],
      backgroundColor: 'rgba(52, 199, 89, 0.5)',
    },
    {
      label: 'Incomplete',
      data: [27, 60, 25, 7],
      backgroundColor: 'rgba(255, 69, 58, 0.5)',
    },
  ],
};

export default function TaskStage() {
  return <Bar options={options} data={data} />;
}
