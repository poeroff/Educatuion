import refreshIconSrc from '@maidt-cntn/assets/icons/recorder/refresh.svg';
import checkIconSrc from '@maidt-cntn/assets/icons/recorder/check.svg';
import loadingIconSrc from '@maidt-cntn/assets/icons/recorder/loading_circle.svg';
import { IAudioPlayerProps, SvgIcon } from '@maidt-cntn/ui';

import {
  Arum2Image,
  ControlButtons,
  ConvertedText,
  LoadingStepContainer,
  LoadingText,
  RefreshRecordingButton,
  ResultStepContainer,
  SubmitButton,
} from './ResultStep.style';
import RecorderPlayer, { RecorderPlayerProps } from './RecordPlayer';

export interface IResultStepProps extends RecorderPlayerProps {
  convertedText: string;
  onClickRefresh: () => void;
  onClickSubmit: () => void;
  readOnly?: boolean;
}

export const ResultStep = ({
  progressWavesValues,
  audioBlobs,
  recordingTime,
  convertedText,
  readOnly = false,
  onClickRefresh,
  onClickSubmit,
}: IResultStepProps) => {
  return convertedText ? (
    <ResultStepContainer>
      <ConvertedText>{convertedText}</ConvertedText>
      <RecorderPlayer progressWavesValues={progressWavesValues} audioBlobs={audioBlobs} recordingTime={recordingTime} />
      {!readOnly && (
        <ControlButtons>
          <RefreshRecordingButton onClick={onClickRefresh}>
            <SvgIcon src={refreshIconSrc} width='20px' height='20px' />
            다시 하기
          </RefreshRecordingButton>
          <SubmitButton onClick={onClickSubmit}>
            <SvgIcon src={loadingIconSrc} width='20px' height='20px' />
            제출하기
          </SubmitButton>
        </ControlButtons>
      )}
    </ResultStepContainer>
  ) : (
    <LoadingStepContainer>
      <Arum2Image />
      <LoadingText>녹음된 대답을 받아쓰고 있어요...</LoadingText>
    </LoadingStepContainer>
  );
};
