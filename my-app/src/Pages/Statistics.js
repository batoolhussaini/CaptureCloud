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
import Navbar from '../Layout/Navbar.js';
import Button from '../UI/button.js';
import Confirmation from '../UI/Confirmation.js'; 

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

function Statistics() {
  const [currentChart, setCurrentChart] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  useEffect(() => {
    document.title = 'Statistics'; 
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
  
  const today = new Date();
  const todaysDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const chartTitles = [
    <>Sold vs Unsold Photos of {todaysDate}</>,
    <>Most Sold Photos by Tags As of {todaysDate}</>
  ];

  const handleExport = () => {
    setIsConfirmationVisible(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar /> 
      </div>

      <div className="flex justify-center mt-2">
      <img src={logo} alt="Logo" className="mt-0 w-32 ml-32" />
      </div>

      <div className="flex flex-col items-center justify-left w-full p-8 ">
        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] -mt-3 ml-32">Statistics</h1>

        <div className="text-xl font-semibold ml-[120px] mb-9 font-[Anek Bangla]">{chartTitles[currentChart]}</div>

        <div className="flex items-center space-x-4" >
          {currentChart > 0 && (
            <button
              onClick={showFirstChart}
              className="text-black-800 border border-grey-300 p-3 rounded-full hover:bg-[#D9D9D9] hover:text-black active:bg-[#ffffff] active:text-black focus:outline-none transition"
              aria-label="Show First Chart"
              title = "Previous Chart"
              style={{
                position: 'relative', 
                left: '110px', 
              }}
            >
              &lt;
            </button>
          )}
          <div className="w-[400px] h-[400px]"style={{ marginLeft: currentChart === 1 ? '120px' : '190px' }}>
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
                    position: 'bottom',
                    marignLeft: '-75px'
                  },
                },
              }}
            />
          </div>

          {currentChart < 1 && (
            <button
              onClick={showSecondChart}
              className="text-black-800 border border-grey-300 p-3 rounded-full hover:bg-[#D9D9D9] hover:text-black active:bg-[#ffffff] active:text-black focus:outline-none transition"
              aria-label="Show Second Chart"
              title = "Next Chart"
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      <div className="fixed bottom-16 right-[190px]">
        <Button 
          color="bg-[#CEECF5] hover:bg-[#A3D3E0] text-black"
          icon={exportIcon}
          onClick={handleExport}
          className="text-lg font-[Anek Bangla]"
        >
          Export
        </Button>
      </div>

      <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium mb-4 right-94">
        Total photos: 82
      </div>

      {isConfirmationVisible && (
        <Confirmation 
          message="Chart downloaded successfully."
          onConfirm={closeConfirmation}
        />
      )}
    </div>
  );
}

export default Statistics;