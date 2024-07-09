import styled from 'styled-components';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SyntheticChartContainer } from './SyntheticChart.style';

interface SyntheticChartProps {
  data: {
    holisticScore: number;
    intonationScore: number;
    pitchScore: number;
  };
}

ChartJS.register(...registerables);

const SyntheticChart = ({ data }: SyntheticChartProps) => {
  const chartData = {
    type: 'bar',
    labels: ['종합', '억양', '강세&리듬'],
    datasets: [
      {
        label: 'score',
        data: [data.holisticScore, data.intonationScore, data.pitchScore],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <SyntheticChartContainer>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: { ticks: { autoSkip: false } },
          },
        }}
      />
    </SyntheticChartContainer>
  );
};

export default SyntheticChart;
