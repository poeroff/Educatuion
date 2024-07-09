import MicCircleSVG from '@maidt-cntn/assets/icons/recorder/micCircle.svg';
import { SvgIcon } from '@maidt-cntn/ui';
import { InactiveStepContainer, Instruction, RecordingButton } from './InactiveStep.style';

export interface IInactiveStepProps {
  onClickRecording: () => void;
  label?: string;
}

export const InactiveStep = ({ onClickRecording, label = '힘차게 따라 읽어볼까요?' }: IInactiveStepProps) => {
  return (
    <InactiveStepContainer>
      <Instruction>{label}</Instruction>
      <RecordingButton onClick={onClickRecording}>시작하기</RecordingButton>
    </InactiveStepContainer>
  );
};
