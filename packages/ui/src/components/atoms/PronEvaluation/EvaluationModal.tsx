import EvaluationChart from './EvaluationChart';
import { EvaluationProps } from '@maidt-cntn/ui';
import { CloseButton, EvaluationModalContainer, EvaluationResult, Header, Title } from './EvaluationModal.style';

interface EvaluationModalProps {
  evaluations: EvaluationProps;
  onClickClose: () => void;
}

export const EvaluationModal = ({ evaluations, onClickClose }: EvaluationModalProps) => {
  return (
    <EvaluationModalContainer>
      <Header />
      <Title>발음평가</Title>
      <CloseButton onClick={onClickClose}>닫기</CloseButton>
      <Header />
      <EvaluationResult>
        {evaluations &&
          Object.values(evaluations)
            .sort((prevEvaluationData, nextEvaluationData) => prevEvaluationData.recorderIndex - nextEvaluationData.recorderIndex)
            .map(evaluationData => <EvaluationChart data={evaluationData} key={evaluationData.recorderIndex} />)}
      </EvaluationResult>
    </EvaluationModalContainer>
  );
};

export default EvaluationModal;
