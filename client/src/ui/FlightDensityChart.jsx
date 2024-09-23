import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FlightDensityChart = ({ flightData }) => {
  // Prepare data for the chart (group by hours)
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`); // ["0:00", "1:00", ..., "23:00"]
  const flightCountByHour = Array(24).fill(0); // Create an array of 24 zeros to store flight counts

  // Populate flight count by hour
  flightData?.forEach((flight) => {
    const flightTime = new Date(flight.estimatedLandingTime);
    const hour = flightTime.getHours();
    flightCountByHour[hour] += 1; // Increment the flight count for that hour
  });

  // Data for the chart
  const chartData = {
    labels: hours,
    datasets: [
      {
        label: "Number of Flights",
        data: flightCountByHour,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Flight Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time of Day",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Flight Density by Time of Day",
      },
    },
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto p-4">
      {/* Responsive container for the chart */}
      <div className="relative h-96">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FlightDensityChart;
