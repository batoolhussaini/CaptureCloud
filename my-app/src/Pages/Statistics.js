import React from 'react';
import { Pie } from 'react-chartjs-2';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from 'react-router-dom';

function Statistics() {
    const navigate = useNavigate();

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Sample Data',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`
                }
            }
        },
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={logo} alt="Logo" className="w-56 mb-8" />
            <h1 className="text-3xl font-bold mb-6">Statistics</h1>
            <div className="w-1/2">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
}

export default Statistics;
