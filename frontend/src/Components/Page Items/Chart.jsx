import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, Filler, LinearScale, PointElement, LineController, LineElement, Chart as ChartJS } from "chart.js"; 

export const ChartComponent = ({ data }) => {
  ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineController, LineElement); 

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default ChartComponent;