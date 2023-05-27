import React, { useEffect, useState } from 'react';
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
import { stageTimeGraph } from '@/util/mics';
import { convertDataGraph } from '@/util/common';
import { useRouter } from 'next/router';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

export default function TimeTracking({ projectId }) {
  const router = useRouter()
  const [data, setData] = useState({
    labels:[],
    datasets: [
          {
            label: 'Expected',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Actual',
            data: [],
            backgroundColor: 'rgba(52, 199, 89, 0.5)',
          },
        ],
  })
  async function getData() {
    await stageTimeGraph(projectId).then((data) => {
      if (data.success) {
        setData(convertDataGraph(data.stageTimeInfo))
      }
    })
  }
  useEffect(() => {
    getData()
  },[router.asPath])

  return (
    <>
      <Bar options={options} data={data} />
    </>
  )
}
