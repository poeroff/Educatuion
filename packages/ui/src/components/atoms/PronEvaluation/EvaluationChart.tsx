import IntonationChart from './IntonationChart';
import StressChart, { WordLevelBatch } from './StressChart';
import SyntheticChart from './SyntheticChart';
import { FailDescription, HolisticScore, Intonation, Score, ScoreChartContainer, Sentence, Stress, Synthetic } from './EvaluationChart.style';

interface EvaluationChartProps {
  data: {
    intonation?: number[];
    wordLevelBatchs?: WordLevelBatch[];
    holisticScore?: number;
    reference?: string;
    intonationScore?: number;
    pitchScore?: number;
    isFail: boolean;
  };
}

const EvaluationChart = ({ data }: EvaluationChartProps) => {
  const getRank = (rawScore: number) => {
    if (rawScore >= 4) {
      return 'A';
    }
    if (rawScore >= 3) {
      return 'B';
    }
    if (rawScore >= 2) {
      return 'C';
    }
    if (rawScore >= 1) {
      return 'D';
    }
    return 'E';
  };

  const convertTo100Scale = (rawScore: number) => {
    const convertedScore = (rawScore / 5) * 100;
    const finalScore = (convertedScore * 1.2).toFixed(1);
    return Number(finalScore);
  };

  const getRankAndScore = (rawScore: number) => {
    const rank = getRank(rawScore);
    const score = convertTo100Scale(rawScore);

    return `${rank}등급 (${score}점)`;
  };

  const summaryData = () => {
    return {
      holisticScore: convertTo100Scale(data.holisticScore!),
      intonationScore: convertTo100Scale(data.intonationScore!),
      pitchScore: convertTo100Scale(data.pitchScore!),
    };
  };

  return (
    <ScoreChartContainer>
      {data.isFail ? (
        <FailDescription>
          주어진 내용을 모두 녹음하지 않고 발음 평가를 요청하셨습니다. 정확한 평가를 위해서는 주어진 내용을 모두 녹음해야 합니다.
        </FailDescription>
      ) : (
        <>
          <Sentence>평가문장: {data.reference}</Sentence>
          <HolisticScore>종합점수: {getRankAndScore(data.holisticScore!)}</HolisticScore>
          <Synthetic>
            <SyntheticChart data={summaryData()} />
          </Synthetic>
          <Intonation>
            <Score>억양점수: {getRankAndScore(data.intonationScore!)}</Score>
            <IntonationChart data={data.intonation!} />
          </Intonation>
          <Stress>
            <Score>강세&리듬 점수: {getRankAndScore(data.pitchScore!)}</Score>
            <StressChart data={data.wordLevelBatchs!} />
          </Stress>
        </>
      )}
    </ScoreChartContainer>
  );
};

export default EvaluationChart;
