import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar.js'; // Import Navbar component

// Chart.js components 등록
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

function Statistics() {
  const navigate = useNavigate();

  // State for tracking the current chart index
  const [currentChart, setCurrentChart] = useState(0);

  // State for chart data
  const [chartData, setChartData] = useState(null);

  // Use fixed data for the pie charts
  useEffect(() => {
    const fixedData = () => {
      // Data for the first pie chart (2 variables)
      const labels1 = ['Sold', 'Unsold'];
      const data1 = [37, 63]; // Fixed values for the first pie chart

      // Data for the second pie chart (5 variables)
      const labels2 = ['Nature', 'Wedding', 'Flower', 'Sunset', 'Garden'];
      const data2 = [15, 30, 25, 10, 20]; // Fixed values for the second pie chart

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

  // chartData가 null이면 로딩 상태를 보여주고, 차트가 준비되면 차트를 렌더링
  if (!chartData) {
    return <div>Loading...</div>;
  }

  // Function to handle right arrow click (show next chart)
  const nextChart = () => {
    setCurrentChart((prev) => (prev === 0 ? 1 : 0)); // Toggle between 0 and 1
  };

  // Function to handle left arrow click (show previous chart)
  const prevChart = () => {
    setCurrentChart((prev) => (prev === 1 ? 0 : 1)); // Toggle between 0 and 1
  };

  return (
    <div className="bg-loginPage-bg h-screen flex flex-col items-center justify-center font-[Anek Bangla]">
      <Navbar /> {/* Insert Navbar here */}

      <img src={logo} alt="Logo" className="w-56 mb-16" />
      <h1 className="text-4xl text-center mb-6">Statistics</h1>

      <div className="bg-ccBlue p-16 rounded-3xl border border-black w-2/5 mx-auto shadow-lg">
        <h2 className="text-xl text-center mb-4">Fixed Pie Chart</h2>

        <div className="pie-chart-container" style={{ backgroundColor: 'transparent' }}>
          {/* Show the pie chart based on the currentChart state */}
          <Pie data={chartData[`chart${currentChart + 1}`]} />
        </div>
      </div>

      <div className="arrows-container flex justify-between mt-4 w-2/5 mx-auto">
        {/* Left Arrow (Previous Chart) */}
        <button
          onClick={prevChart}
          className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
          style={{ position: 'absolute', top: '400px', left: '200px' }}
        >
          &lt;
        </button>

        {/* Right Arrow (Next Chart) */}
        <button
          onClick={nextChart}
          className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
          style={{ position: 'absolute', top: '400px', right: '100px' }}
        >
          &gt;
        </button>
      </div>

      <p className="mt-6 text-center">
        Don’t have an account? <a href="/signup" className="text-sky-500 hover:text-sky-600 underline">Sign up here!</a>
      </p>
    </div>
  );
}

export default Statistics;