import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import logo from '../Assets/Logo/Logo.png';
import exportIcon from '../Assets/Icons/export_icon.png';
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
              backgroundColor: ['#9ED7E6', '#A9C7EE'],
              hoverBackgroundColor: ['#7AA2C4', '#7AA2C4'],
            },
          ],
        },
        chart2: {
          labels: labels2,
          datasets: [
            {
              data: data2,
              backgroundColor: ['#93D7E6', '#BBF2F0', '#8DBBCC', '#A9C7EE', '#93C7EE'],
              hoverBackgroundColor: ['#7AA2C4', '#7AA2C4', '#7AA2C4', '#7AA2C4', '#7AA2C4'],
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

  const showFirstChart = () => setCurrentChart(0);
  const showSecondChart = () => setCurrentChart(1);

  const chartTitles = [
    <>Sold vs Unsold Photos of December 6, 2024</>,
    <>Most Sold Photos by Tags As of December 6, 2024</>
  ];

  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar /> 
      </div>

      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>

      <div className="flex flex-col items-center justify-center w-full p-2 ml-20"> 
        <h1 className="text-6xl text-center mb-6 text-[#6AABD2] mt-4 ml-25">Statistics</h1>

        <div className="text-2xl font-semibold mb-2 font-[Anek Bangla]">{chartTitles[currentChart]}</div>

        <div className="flex items-center space-x-4">
          {currentChart > 0 && (
            <button
              onClick={showFirstChart}
              className="text-blue-800 border border-blue-800 p-3 rounded-full hover:bg-blue-800 hover:text-white active:bg-blue-900 active:text-white focus:outline-none transition"
              aria-label="Show First Chart"
            >
              &lt;
            </button>
          )}

          <div className="w-80 h-80">
            <Pie 
              data={chartData[`chart${currentChart + 1}`]} 
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);
                        const value = dataset.data[tooltipItem.dataIndex];
                        const percentage = ((value / total) * 100).toFixed(2);
                        return tooltipItem.label + ': ' + percentage + '%';
                      },
                    },
                  },
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>

          {currentChart < 1 && (
            <button
              onClick={showSecondChart}
              className="text-blue-800 border border-blue-800 p-3 rounded-full hover:bg-blue-800 hover:text-white active:bg-blue-900 active:text-white focus:outline-none transition"
              aria-label="Show Second Chart"
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button
          className="flex items-center justify-center bg-[#CEECF5] text-black font-[Anek Bangla] text-lg p-3 rounded-full shadow-lg hover:bg-[#A3D3E0] focus:outline-none transition"
          aria-label="Export"
        >
          <img src={exportIcon} alt="Export Icon" className="w-6 h-6 ml-2 mr-2" />
          Export <span className="ml-3"></span>
        </button>
      </div>

      <div className="absolute bottom-8 left-8 text-sm text-black font-[Anek Bangla] ml-36">
        Total photos: 82
      </div>
    </div>
  );
}

export default Statistics;
