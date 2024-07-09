import { Chart as ChartJS, registerables } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { StressChartContainer } from './StressChart.style';

interface StressChartProps {
  data: WordLevelBatch[];
}

export interface WordLevelBatch {
  endTimeInSec: number;
  index: number;
  proficiencyScore: [];
  startTimeInSec: number;
  stress: number;
  text: string;
}

ChartJS.register(...registerables);

const StressChart = ({ data }: StressChartProps) => {
  const chartData = {
    datasets: [
      {
        label: 'stress&rythm',
        data: data.map((score, index) => ({ x: index + 0.2, y: 0, r: score.stress + 5 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <StressChartContainer>
      <Bubble
        data={chartData}
        options={{
          scales: {
            x: {
              ticks: { display: false, maxTicksLimit: 20 },
              max: data.length,
              min: 0,
            },
            y: {
              ticks: { display: false },
            },
          },
        }}
      />
    </StressChartContainer>
  );
};

export default StressChart;
