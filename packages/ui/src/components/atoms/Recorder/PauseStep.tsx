import { AudioPlayer, SvgIcon } from '@maidt-cntn/ui';
import microphoneIconSrc from '@maidt-cntn/assets/icons/recorder/microphone.svg';
import StopSVG from '@maidt-cntn/assets/icons/recorder/stop.svg';
import { ControlButtons, PauseStepContainer, ResumeRecordingButton, StopRecordingButton } from './PauseStep.style';
import RecorderPlayer from './RecordPlayer';

export interface IPauseStepProps {
  onClickResumeRecording: () => void;
  onClickStopRecording: () => void;
  progressWavesValues: number[];
  audioBlobs: React.MutableRefObject<Blob[]>;
  recordingTime: number;
}

export const PauseStep = ({ onClickResumeRecording, onClickStopRecording, progressWavesValues, audioBlobs, recordingTime }: IPauseStepProps) => {
  return (
    <PauseStepContainer>
      <RecorderPlayer progressWavesValues={progressWavesValues} audioBlobs={audioBlobs} recordingTime={recordingTime} />
      <ControlButtons>
        <ResumeRecordingButton onClick={onClickResumeRecording}>
          <SvgIcon src={microphoneIconSrc} width='20px' height='20px' />
          계속하기
        </ResumeRecordingButton>
        <StopRecordingButton onClick={onClickStopRecording}>
          <SvgIcon src={StopSVG} width='20px' height='20px' />
          그만하기
        </StopRecordingButton>
      </ControlButtons>
    </PauseStepContainer>
  );
};
