import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Style from './VideoPlayer.style';
import { ICommonInfo, SvgIcon, TPostVideoMutedFunc, TPostVideoSkippedFunc, TPostVideoTimeUpdatedFunc, VideoProgressBar } from '@maidt-cntn/ui';
import VolumeIcon from '@maidt-cntn/assets/videoPlayer/volume.svg';
import VolumeMuteIcon from '@maidt-cntn/assets/videoPlayer/volume_mute.svg';
import PauseIcon from '@maidt-cntn/assets/videoPlayer/pause.svg';
import FullScreenIcon from '@maidt-cntn/assets/videoPlayer/fullscreen.svg';
import PlayIcon from '@maidt-cntn/assets/videoPlayer/play.svg';
import ShowMoreIcon from '@maidt-cntn/assets/videoPlayer/showMore.svg';
import ZoomOffIcon from '@maidt-cntn/assets/videoPlayer/zoomOff.svg';

import StopIcon from '@maidt-cntn/assets/videoPlayer/stop_icon.svg';
import CaptionOnIcon from '@maidt-cntn/assets/videoPlayer/caption_on_icon.svg';
import CaptionOffIcon from '@maidt-cntn/assets/videoPlayer/caption_off_icon.svg';
import ScriptOnIcon from '@maidt-cntn/assets/videoPlayer/script_on_icon.svg';
import ScriptOffIcon from '@maidt-cntn/assets/videoPlayer/script_off_icon.svg';
import CheckIcon from '@maidt-cntn/assets/videoPlayer/play.svg';

const SPEED_MAPPER = {
  SLOW: {
    label: '느림',
    speed: 0.8,
  },
  NORMAL: {
    label: '보통',
    speed: 1,
  },
  LITTLE_FAST: {
    label: '조금 빠름',
    speed: 1.2,
  },
  FAST: {
    label: '빠름',
    speed: 3,
  },
} as const;

type TSpeedKeys = keyof typeof SPEED_MAPPER;

interface IControlBarProps {
  togglePlayback: () => void;
  toggleFullScreen: () => void;
  toggleScriptOn: () => void;
  toggleCaption: () => void;
  onProgressChange: (percent: number) => void;
  onStopVideo: () => void;
  postVideoMuted?: TPostVideoMutedFunc;
  postVideoSkipped?: TPostVideoSkippedFunc;
  commonInfo: ICommonInfo;
  cardPageId: number;
  startTime: number;
  totalTime: number;
  currentTime: number;
  isMiniVer: boolean;
  isScriptOn: boolean;
  isFullScreen: boolean;
  isVisible: boolean;
  isPlaying: boolean;
  isCaptionVisible: boolean;
  videoElement: HTMLVideoElement | null;
  currentVolume: number;
  setCurrentVolume: Dispatch<SetStateAction<number>>;
  timeFrom: number;
}

export const ControlBar = ({
  togglePlayback,
  toggleFullScreen,
  toggleScriptOn,
  toggleCaption,
  onProgressChange,
  onStopVideo,
  postVideoMuted,
  postVideoSkipped,
  commonInfo,
  cardPageId,
  isMiniVer,
  startTime,
  totalTime,
  currentTime,
  isScriptOn,
  isFullScreen,
  isVisible,
  isPlaying,
  videoElement,
  isCaptionVisible,
  currentVolume,
  setCurrentVolume,
  timeFrom,
}: IControlBarProps) => {
  const [popupType, setPopupType] = useState<'speed' | 'volume' | ''>('');
  const [currentSpeed, setCurrentSpeed] = useState<TSpeedKeys>('NORMAL');
  const [is3dotClicked, setIs3dotClicked] = useState(false);

  // 외부 클릭 감지용 ref
  const divRef = useRef<HTMLDivElement>(null);

  // 동영상 소리 관련 함수
  const handleVolumeClicked = () => {
    if (popupType === 'volume') setPopupType('');
    else setPopupType('volume');
  };

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVolume(parseFloat(event.target.value));
    if (videoElement) {
      if (currentVolume > 0.03) {
        videoElement.volume = currentVolume;
        if (videoElement.muted === true) {
          postVideoMuted && postVideoMuted({ ...commonInfo, cardPageId, time: currentTime, volume: 0 });
          videoElement.muted = false;
        }
      } else {
        videoElement.volume = currentVolume;
        if (videoElement.muted === false) {
          postVideoMuted && postVideoMuted({ ...commonInfo, cardPageId, time: currentTime, volume: 1 });
          videoElement.muted = true;
        }
      }
    }
  };

  // 동영상 속도 관련 함수
  const handleSpeedClicked = () => {
    if (popupType === 'speed') setPopupType('');
    else setPopupType('speed');
  };

  const changeVideoSpeed = (speed: number) => {
    if (videoElement) videoElement.playbackRate = speed;
  };

  const handleChangeSpeed = (speed: TSpeedKeys) => {
    setCurrentSpeed(speed);

    changeVideoSpeed(SPEED_MAPPER[speed].speed);
  };

  // 동영상 progress bar 관련 함수
  const onMouseUp = () => {
    if (videoElement) {
      const timeTo = videoElement.currentTime;
      videoElement.currentTime = currentTime;

      postVideoSkipped &&
        postVideoSkipped({
          ...commonInfo,
          cardPageId,
          timeFrom,
          timeTo: timeTo,
          skipTo: currentTime,
          playTime: timeTo - timeFrom,
          duration: videoElement.duration,
        });

      if (isPlaying) videoElement.play();
      else videoElement.pause();
    }
  };

  const onMouseDown = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (videoElement) videoElement.pause();
  };

  // 00:00 시간 표기 관련 함수
  const toTimeString = (second: number) => {
    const date = new Date(second * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getSeconds();
    const formattedMinute = `${mm}:`;
    const formattedSecond = (ss < 10 ? '0' : '') + ss;

    return formattedMinute + formattedSecond;
  };

  const detectClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isNotOutSide = target.tagName === 'BUTTON' || target.tagName === 'svg' || target.tagName === 'path';

    if (divRef.current && !divRef.current.contains(target) && !isNotOutSide) {
      setPopupType('');
    }
  };

  useEffect(() => {
    const findKeyBySpeed = (speed: number): TSpeedKeys | undefined => {
      return (Object.keys(SPEED_MAPPER) as TSpeedKeys[]).find(key => SPEED_MAPPER[key].speed === speed);
    };

    const nowSpeed = videoElement?.playbackRate ?? 0;
    setCurrentSpeed(findKeyBySpeed(nowSpeed) ?? 'NORMAL');

    window.addEventListener('mousedown', detectClickOutside);
    return () => window.removeEventListener('mousedown', detectClickOutside);
  }, [divRef]);

  return (
    <Style.ControlBarContainer isMiniVer={isMiniVer} isVisible={isVisible} isPlaying={isPlaying} isScript={isScriptOn}>
      <Style.PlayStopIconSection>
        <Style.ControlButton onClick={togglePlayback}>
          {isPlaying ? <SvgIcon src={PauseIcon} size='20px' /> : <SvgIcon src={PlayIcon} size='20px' />}
        </Style.ControlButton>
        <Style.ControlButton onClick={onStopVideo}>
          <SvgIcon src={StopIcon} size='20px' />
        </Style.ControlButton>
      </Style.PlayStopIconSection>
      <span className='startTime'>{toTimeString(currentTime)}</span>
      <VideoProgressBar max={totalTime} value={currentTime} onChange={onProgressChange} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
      <span className='endTime'>{toTimeString(totalTime)}</span>
      {isMiniVer ? (
        <>
          <SvgIcon src={ShowMoreIcon} onClick={() => setIs3dotClicked(!is3dotClicked)} size='40px' />
          {is3dotClicked && (
            <Style.MiniFloatingMenu>
              <Style.SpeedButton type='button' onClick={handleSpeedClicked}>
                {SPEED_MAPPER[currentSpeed].label}
              </Style.SpeedButton>
              {popupType === 'speed' && (
                <Style.MiniSpeedWrapper ref={divRef}>
                  {Object.entries(SPEED_MAPPER).map(([key, value], index) => {
                    return (
                      <Style.Option
                        value={key}
                        key={index}
                        isSelected={key === currentSpeed}
                        onClick={event => {
                          handleChangeSpeed((event.target as any).value);
                        }}
                      >
                        <span className='speed' style={{ pointerEvents: 'none' }}>
                          {key === currentSpeed && <SvgIcon src={CheckIcon} />} {value.label}
                        </span>
                      </Style.Option>
                    );
                  })}
                </Style.MiniSpeedWrapper>
              )}
              {currentVolume > 0.03 ? (
                <Style.ControlButton onClick={handleVolumeClicked}>
                  <SvgIcon src={VolumeIcon} size='30px' />
                </Style.ControlButton>
              ) : (
                <Style.ControlButton onClick={handleVolumeClicked}>
                  <SvgIcon src={VolumeMuteIcon} size='30px' />
                </Style.ControlButton>
              )}
              {popupType === 'volume' && (
                <Style.MiniVolumeBarWrapper ref={divRef}>
                  <Style.VolumeBar type='range' min='0' max='1' step='0.01' onChange={handleChangeVolume} value={currentVolume} />
                </Style.MiniVolumeBarWrapper>
              )}
              {!isCaptionVisible ? <SvgIcon src={CaptionOffIcon} onClick={toggleCaption} /> : <SvgIcon src={CaptionOnIcon} onClick={toggleCaption} />}
              {!isScriptOn ? <SvgIcon src={ScriptOffIcon} onClick={toggleScriptOn} /> : <SvgIcon src={ScriptOnIcon} onClick={toggleScriptOn} />}
              {!isFullScreen ? (
                <SvgIcon src={FullScreenIcon} onClick={toggleFullScreen} />
              ) : (
                <SvgIcon src={FullScreenIcon} onClick={toggleFullScreen} /> // ZoomOffIcon
              )}
            </Style.MiniFloatingMenu>
          )}
        </>
      ) : (
        <Style.IconSection>
          <Style.SpeedButton type='button' onClick={handleSpeedClicked}>
            {SPEED_MAPPER[currentSpeed].label}
          </Style.SpeedButton>
          {popupType === 'speed' && (
            <Style.SpeedWrapper>
              {Object.entries(SPEED_MAPPER).map(([key, value], index) => {
                return (
                  <Style.Option
                    value={key}
                    key={index}
                    isSelected={key === currentSpeed}
                    onClick={event => {
                      handleChangeSpeed((event.target as any).value);
                    }}
                  >
                    <span style={{ pointerEvents: 'none' }}>
                      {key === currentSpeed && <SvgIcon src={CheckIcon} width='20px' />} {value.label}
                    </span>
                  </Style.Option>
                );
              })}
            </Style.SpeedWrapper>
          )}
          {currentVolume > 0.03 ? (
            <Style.ControlButton onClick={handleVolumeClicked}>
              <SvgIcon src={VolumeIcon} size='30px' />
            </Style.ControlButton>
          ) : (
            <Style.ControlButton>
              <SvgIcon src={VolumeMuteIcon} size='30px' />
            </Style.ControlButton>
          )}
          {popupType === 'volume' && (
            <Style.VolumeBarWrapper ref={divRef}>
              <Style.VolumeBar type='range' min='0' max='1' step='0.01' onChange={handleChangeVolume} value={currentVolume} />
            </Style.VolumeBarWrapper>
          )}
          <Style.ControlButton onClick={toggleCaption}>
            {!isCaptionVisible ? <SvgIcon src={CaptionOffIcon} size='20px' /> : <SvgIcon src={CaptionOnIcon} size='20px' />}
          </Style.ControlButton>
          <Style.ControlButton onClick={toggleScriptOn}>
            {!isScriptOn ? <SvgIcon src={ScriptOffIcon} size='20px' /> : <SvgIcon src={ScriptOnIcon} size='20px' />}
          </Style.ControlButton>
          <Style.ControlButton onClick={toggleFullScreen}>
            {!isFullScreen ? (
              <SvgIcon src={FullScreenIcon} onClick={toggleFullScreen} size='20px' />
            ) : (
              <SvgIcon src={ZoomOffIcon} onClick={toggleFullScreen} size='20px' />
            )}
          </Style.ControlButton>
        </Style.IconSection>
      )}
    </Style.ControlBarContainer>
  );
};

export default ControlBar;
