import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IntonationChartContainer } from './IntonationChart.style';

interface IntonationChartProps {
  data: number[];
}

ChartJS.register(...registerables);

const IntonationChart = ({ data }: IntonationChartProps) => {
  const chartData = {
    labels: Array.from({ length: data.length }).fill(0),

    datasets: [
      {
        label: 'intonation',
        data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <IntonationChartContainer>
      <Line
        data={chartData}
        options={{
          scales: {
            x: { ticks: { display: false }, grid: { display: false } },
            y: { ticks: { display: false } },
          },
        }}
      />
    </IntonationChartContainer>
  );
};

export default IntonationChart;
