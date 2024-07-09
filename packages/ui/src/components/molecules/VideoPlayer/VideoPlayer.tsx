import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ControlBar, ControlBackground, parseSRT, TCaptionType, Caption } from '@maidt-cntn/ui';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';
import Style from './VideoPlayer.style';
import {
  ICommonInfo,
  TPostVideoCompletedFunc,
  TPostVideoMutedFunc,
  TPostVideoPausedFunc,
  TPostVideoPlayedFunc,
  TPostVideoSkippedFunc,
  TPostVideoTimeUpdatedFunc,
} from '@/type/VideoPlayer/VideoType';

interface IVideoPlayerProps {
  videoSrc: string;
  srtFile?: string;
  width?: number;
  height?: number;

  cardPageId?: number;
  commonInfo?: ICommonInfo;
  difficulty?: number;

  postVideoPlayed?: TPostVideoPlayedFunc;
  postVideoPaused?: TPostVideoPausedFunc;
  postVideoSkipped?: TPostVideoSkippedFunc;
  postVideoMuted?: TPostVideoMutedFunc;
  postVideoTimeUpdated?: TPostVideoTimeUpdatedFunc;
  postVideoCompleted?: TPostVideoCompletedFunc;
}

const DEFAULT_COMMON_INFO = {
  accessToken: {
    token: '',
    access_id: '',
  },
  siteId: '',
  homepage: '',
  userId: 0,
  sessionId: '',
};

// 기존 srtFile이 아닌 videoSrc와 같은 형식의 url path를 불러오는 방식으로 변경했습니다.
export const VideoPlayer = ({
  videoSrc,
  srtFile = '',
  width = 0,
  height,
  cardPageId = 0,
  commonInfo = DEFAULT_COMMON_INFO,
  postVideoPlayed,
  postVideoPaused,
  postVideoSkipped,
  postVideoMuted,
  postVideoTimeUpdated,
  postVideoCompleted,
}: IVideoPlayerProps) => {
  const prefix = import.meta.env.VITE_CDN_PATH;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControlBar, setShowControlBar] = useState(false);
  const [showControlBack, setShowControlBack] = useState(true);
  const [showScript, setShowScript] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isCompleted, setIsCompleted] = useState(false);

  const [timeFrom, setTimeFrom] = useState(0);

  const [scriptContent, setScriptContent] = useState<TCaptionType[]>([]);
  const [showCaption, setShowCaption] = useState(false);
  const [videoSrcHref, setVideoSrcHref] = useState<string>('');
  const [{ accessToken }] = useRecoilState(tokenAtom);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoElement = videoRef && videoRef.current;
  const totalTime = videoRef.current?.duration || 0;
  const startTime = Math.floor(0);

  const [caption, setCaption] = useState<string>('');

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // video hover 시 controlbar visibility 관련 함수
  const handleVideoHover = () => {
    if (showControlBar || !isPlaying) return;
    setShowControlBar(true);
  };

  const handleVideoHoverOut = () => {
    if (!showControlBar || !isPlaying) return;
    setShowControlBar(false);
  };

  // 동영상 프로그래스바 업데이트 함수
  const onProgressChange = (percent: number) => {
    if (!showControlBar) setShowControlBar(true);

    if (videoElement) {
      const playingTime = videoElement.duration * (percent / 100);
      setCurrentTime(playingTime);
    }
  };

  // 정지 관련 함수
  const handleStopVideo = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  // 재생, 일시정지 관련 함수
  const togglePlayback = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);

        setTimeFrom(videoElement.currentTime);

        postVideoPlayed &&
          postVideoPlayed({
            ...commonInfo,
            cardPageId,
            time: videoElement.currentTime,
            duration: videoElement.duration,
          });

        setTimeout(() => setShowControlBar(false), 200);
        setTimeout(() => setShowControlBack(false), 200);
      } else {
        videoElement.pause();
        setIsPlaying(false);
        setShowControlBar(true);
        setShowControlBack(true);

        const timeTo = videoElement.currentTime;

        postVideoPaused &&
          postVideoPaused({
            ...commonInfo,
            cardPageId,
            timeFrom: timeFrom,
            timeTo: timeTo,
            playTime: timeTo - timeFrom,
            duration: videoElement.duration,
          });
      }
    }
  };

  // 동영상 시간 업데이트 함수
  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const toggleScriptOn = () => {
    setShowScript(!showScript);
  };

  const toggleCaption = () => {
    setShowCaption(!showCaption);
  };

  // 동영상 종료시 발생하는 함수
  // const handleVideoEnd = () => {
  //   const videoElement = videoRef.current;
  //   if (!videoElement) return;
  //   const timeTo = videoElement.currentTime;
  //   postVideoCompleted &&
  //     postVideoCompleted({
  //       ...commonInfo,
  //       cardPageId,
  //       timeFrom: timeFrom,
  //       timeTo: timeTo,
  //       playTime: timeTo - timeFrom,
  //       duration: videoElement.duration,
  //     });

  //   videoElement.currentTime = 0;
  //   videoElement.pause();
  //   setIsPlaying(false);
  // };

  // 10초마다 TimeUpdate API 요청
  useEffect(() => {
    if (!postVideoTimeUpdated || !videoElement || !commonInfo) return;
    const logInterval = setInterval(() => {
      const timeTo = videoElement.currentTime;
      postVideoTimeUpdated({ ...commonInfo, cardPageId, timeFrom, timeTo, playTime: timeTo - timeFrom, duration: videoElement.duration });
    }, 10000);

    return () => clearInterval(logInterval);
  }, [videoElement, commonInfo]);

  // 재생바가 전체의 절반 이상 지났을 경우 completed 처리
  useEffect(() => {
    if (videoElement && !isCompleted && currentTime > videoElement.duration / 2) {
      setIsCompleted(true);
      const timeTo = videoElement.currentTime;
      postVideoCompleted &&
        postVideoCompleted({
          ...commonInfo,
          cardPageId,
          timeFrom: timeFrom,
          timeTo: timeTo,
          playTime: timeTo - timeFrom,
          duration: videoElement.duration,
        });
    }
  }, [currentTime]);

  // 초기 비디오 이벤트 설정
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }

    return undefined;
  }, []); //eslint-disable-line

  const getCaption = () => {
    if (srtFile === '') {
      setCaption('');
      setScriptContent([]);
      return;
    }
    fetch(getFileFromCDNWithToken(prefix + srtFile, accessToken))
      .then(res => {
        if (res.status === 200) return res.text();
        else return '';
      })
      .then(caption => {
        setCaption(caption);
        setScriptContent(parseSRT(caption) as TCaptionType[]);
      });
  };

  useEffect(() => {
    if (accessToken) {
      setVideoSrcHref(getFileFromCDNWithToken(prefix + videoSrc, accessToken));
      getCaption();
    }
  }, [accessToken]);

  return (
    <Style.VideoContainer
      width={width}
      height={height}
      isFullScreen={isFullScreen}
      isScript={showScript}
      onMouseEnter={handleVideoHover}
      onMouseMove={handleVideoHover}
      onMouseLeave={handleVideoHoverOut}
    >
      <Style.VideoWrapper>
        <video ref={videoRef} playsInline onTimeUpdate={handleTimeUpdate} onClick={togglePlayback} src={videoSrcHref} />
        {showControlBack && (
          <ControlBackground
            togglePlayback={togglePlayback}
            width={width}
            isVisible={showControlBack}
            isPlaying={isPlaying}
            videoElement={videoElement}
            postVideoSkipped={postVideoSkipped}
            commonInfo={commonInfo}
            cardPageId={cardPageId}
            timeFrom={timeFrom}
          />
        )}
      </Style.VideoWrapper>

      {showCaption && <Caption srtFile={caption} currentTime={currentTime} isControlBarVisibile={showControlBar} />}
      {showControlBar && (
        <ControlBar
          toggleFullScreen={toggleFullScreen}
          toggleScriptOn={toggleScriptOn}
          toggleCaption={toggleCaption}
          togglePlayback={togglePlayback}
          onProgressChange={onProgressChange}
          onStopVideo={handleStopVideo}
          postVideoMuted={postVideoMuted}
          postVideoSkipped={postVideoSkipped}
          commonInfo={commonInfo}
          cardPageId={cardPageId}
          totalTime={totalTime}
          currentTime={currentTime}
          startTime={startTime}
          isMiniVer={width > 0 && width < 500}
          isScriptOn={showScript}
          isFullScreen={isFullScreen}
          isVisible={showControlBar}
          isPlaying={isPlaying}
          videoElement={videoElement}
          isCaptionVisible={showCaption}
          currentVolume={currentVolume}
          setCurrentVolume={setCurrentVolume}
          timeFrom={timeFrom}
        />
      )}

      {showScript && (
        <Style.ScriptSection isFullScreen={isFullScreen}>
          {scriptContent?.map(caption => {
            const isActive = currentTime >= caption.start && currentTime <= caption.end;
            return (
              <p key={caption.start} className={isActive ? 'current-caption' : ''}>
                {caption.text}
              </p>
            );
          })}
        </Style.ScriptSection>
      )}
    </Style.VideoContainer>
  );
};

export default VideoPlayer;
