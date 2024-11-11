import React, { useEffect, useState } from 'react'; 
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

function Statistics() {
  const navigate = useNavigate();
  const [currentChart, setCurrentChart] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fixedData = () => {
      const labels1 = ['Sold', 'Unsold'];
      const data1 = [37, 63];

      const labels2 = ['Nature', 'Wedding', 'Flower', 'Sunset', 'Garden'];
      const data2 = [15, 30, 25, 10, 20];

      setChartData({
        chart1: {
          labels: labels1,
          datasets: [
            {
              data: data1,
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        },
        chart2: {
          labels: labels2,
          datasets: [
            {
              data: data2,
              backgroundColor: ['#FF5733', '#33FF57', '#5733FF', '#FFD433', '#33D7FF'],
              hoverBackgroundColor: ['#FF5733', '#33FF57', '#5733FF', '#FFD433', '#33D7FF'],
            },
          ],
        },
      });
    };
    fixedData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const nextChart = () => {
    setCurrentChart((prev) => (prev === 0 ? 1 : 0));
  };

  const prevChart = () => {
    setCurrentChart((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed w-full top-0">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center mt-20">
        <img src={logo} alt="Logo" className="mt-2 w-32" />
        <h1 className="text-4xl text-center mt-4">Statistics</h1>
      </div>

      <div className="flex justify-center mt-12 w-50">
        <Pie data={chartData[`chart${currentChart + 1}`]} />
      </div>

      <div className="arrows-container flex justify-between w-full mt-4">
        <button
          onClick={prevChart}
          className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &lt;
        </button>

        <button
          onClick={nextChart}
          className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Statistics;
