import StopSVG from '@maidt-cntn/assets/icons/recorder/stop.svg';
import PauseSVG from '@maidt-cntn/assets/icons/recorder/pause.svg';
import { AudioVisualizer } from './AudioVisualizer';
import { ActiveStepContainer, AudioConsole, ControlButtons, PauseButton, RedDot, StopButton, TimeStamp, Timer } from './ActiveStep.style';
import { SvgIcon } from '@maidt-cntn/ui';

export interface ActiveStepProps {
  onClickPauseRecording: () => void;
  onClickStopRecording: () => void;
  audioVolumes: Array<number>;
  timeStamp: string;
}

export const ActiveStep = ({ onClickPauseRecording, onClickStopRecording, audioVolumes, timeStamp }: ActiveStepProps) => {
  return (
    <ActiveStepContainer>
      <AudioConsole>
        <AudioVisualizer audioVolumes={audioVolumes} />
        <Timer>
          <RedDot />
          <TimeStamp>{timeStamp}</TimeStamp>
        </Timer>
      </AudioConsole>
      <ControlButtons>
        <PauseButton onClick={onClickPauseRecording}>
          <SvgIcon src={PauseSVG} width='20px' height='20px' />
          잠시 멈춤
        </PauseButton>
        <StopButton onClick={onClickStopRecording}>
          <SvgIcon src={StopSVG} width='20px' height='20px' />
          그만하기
        </StopButton>
      </ControlButtons>
    </ActiveStepContainer>
  );
};
