import Style from './VideoPlayer.style';
import { ICommonInfo, SvgIcon, TPostVideoSkippedFunc } from '@maidt-cntn/ui';
import CenterPauseIcon from '@maidt-cntn/assets/videoPlayer/center_pause.svg';
import CenterPlayIcon from '@maidt-cntn/assets/videoPlayer/center_play.svg';
import SkipBackwardIcon from '@maidt-cntn/assets/videoPlayer/skip_backward.svg';
import SkipForwardIcon from '@maidt-cntn/assets/videoPlayer/skip_forward.svg';

interface IControlBackgroundProps {
  togglePlayback: () => void;
  width?: number;
  isVisible: boolean;
  isPlaying: boolean;
  videoElement: HTMLVideoElement | null;
  postVideoSkipped?: TPostVideoSkippedFunc;
  commonInfo: ICommonInfo;
  cardPageId: number;
  timeFrom: number;
}

export const ControlBackground = ({
  togglePlayback,
  width,
  isVisible,
  isPlaying,
  videoElement,
  postVideoSkipped,
  commonInfo,
  cardPageId,
  timeFrom,
}: IControlBackgroundProps) => {
  // 앞,뒤 10초 이동 함수
  const handleSkipVideo = (time: number) => {
    if (videoElement) {
      const timeTo = videoElement.currentTime;
      videoElement.currentTime += time;
      if (videoElement.currentTime < 0) videoElement.currentTime = 0;
      if (videoElement.currentTime > videoElement.duration) videoElement.currentTime = videoElement.duration;

      postVideoSkipped &&
        postVideoSkipped({
          ...commonInfo,
          cardPageId,
          timeFrom,
          timeTo,
          skipTo: videoElement.currentTime,
          playTime: timeTo - timeFrom,
          duration: videoElement.duration,
        });
    }
  };

  return (
    <Style.ControlBackgroundContainer isVisible={isVisible} isPlaying={isPlaying} width={width}>
      <Style.ControlButton size='48px' onClick={() => handleSkipVideo(-10)} borderRadius='48px' aria-label='영상 10초 이전 버튼'>
        <SvgIcon src={SkipBackwardIcon} size='48px' />
      </Style.ControlButton>
      <Style.ControlButton size='48px' borderRadius='48px' onClick={togglePlayback} aria-label='재생 버튼'>
        <Style.PlayControl width={width}>
          {isPlaying ? <SvgIcon height='24px' width='24px' src={CenterPauseIcon} size='24px' /> : <SvgIcon src={CenterPlayIcon} size='48px' />}
        </Style.PlayControl>
      </Style.ControlButton>
      <Style.ControlButton size='48px' onClick={() => handleSkipVideo(10)} borderRadius='48px' aria-label='영상 10초 이후 버튼'>
        <SvgIcon src={SkipForwardIcon} size='48px' />
      </Style.ControlButton>
    </Style.ControlBackgroundContainer>
  );
};

export default ControlBackground;
