import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import Style from './AudioPlayer.style';

import PlaySVG from '@maidt-cntn/assets/audioPlayer/play.svg';
import PauseSVG from '@maidt-cntn/assets/audioPlayer/pause.svg';
import AudioClosedSVG from '@maidt-cntn/assets/audioPlayer/audio_closed.svg';
import AudioOpenedSVG from '@maidt-cntn/assets/audioPlayer/audio_opened.svg';

import { SvgIcon, TAudioSpeedType, DetailAudioOptionBar, EStyleIndex } from '@maidt-cntn/ui';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';

export interface IAudioPlayerProps {
  audioSrc: string;
  captionSrc?: string;
  id?: string;
  top?: number;
  right?: number;
  opened?: boolean;
  startTime?: number;
  audioState?: number;
  tabIndex?: number;
  onChangeStatus?: (state: boolean) => void;
}

export const AudioPlayer = ({
  audioSrc,
  captionSrc = '',
  id = '',
  top = 0,
  opened = false,
  right = -16,
  startTime = 0,
  audioState = 0,
  tabIndex = 0,
  onChangeStatus,
}: IAudioPlayerProps) => {
  const prefix = import.meta.env.VITE_CDN_PATH;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioSrcHref, setAudioSrcHref] = useState<string>('');
  const [isDetailView, setIsDetailView] = useState<boolean>(opened);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(audioState);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isVolumeProgressView, setIsVolumeProgressView] = useState<boolean>(false);
  const [speed, setSpeed] = useState<TAudioSpeedType>(1);
  const [isSpeedDetailView, setIsSpeedDetailView] = useState<boolean>(false);
  const [isCaptionActive, setIsCaptionActive] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>('');
  const [{ accessToken }] = useRecoilState(tokenAtom);

  const playStopRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const togglePlaying = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) audioElement.pause();
      else audioElement.play();

      onChangeStatus?.(!isPlaying);

      setIsPlaying(!isPlaying);
    }
  };

  const toggleDetailView = () => {
    setIsDetailView(state => !state);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const handleProgressBarMouseDown = () => {
    setIsDragging(true);
    pauseAudio();
  };

  const handleProgressbarMouseOver = () => {
    setIsDragging(false);
  };

  const handleProgressBarMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (audioRef.current) {
      const rect = progressBarContainerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const offsetX = event.clientX - rect.left;
      const percent = offsetX / rect.width;
      const newTime = duration * percent;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      resumeAudio();
    }
  };

  const handleProgressBarMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && audioRef.current) {
      const rect = progressBarContainerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const offsetX = event.clientX - rect.left;
      const percent = Math.min(1, Math.max(0, offsetX / rect.width));
      const newTime = duration * percent;
      setCurrentTime(newTime);
    }
  };

  const handleProgressBarKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      if (event.key === 'ArrowRight') {
        if (currentTime + duration * 0.01 < duration) {
          setCurrentTime(currentTime + duration * 0.01);
        } else {
          setCurrentTime(duration);
        }
      }
      if (event.key === 'ArrowLeft') {
        if (currentTime - duration * 0.01 > 0) {
          setCurrentTime(currentTime - duration * 0.01);
        } else {
          setCurrentTime(0);
        }
      }
    }
  };

  const pauseAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement) audioElement.pause();
  };

  const resumeAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement && isPlaying) audioElement.play();
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) setIsVolumeProgressView(false);
    };
    const updateTime = () => {
      if (audioElement) {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
      }
    };
    const updateDuration = () => {
      if (audioElement) setDuration(audioElement.duration);
    };
    const handleAudioEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    if (audioElement) {
      setCurrentTime(startTime);
      audioElement.addEventListener('timeupdate', updateTime);
      audioElement.addEventListener('loadedmetadata', updateDuration);
      audioElement.addEventListener('ended', handleAudioEnded);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateTime);
        audioElement.removeEventListener('loadedmetadata', updateDuration);
        audioElement.removeEventListener('ended', handleAudioEnded);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  const getCaption = () => {
    if (captionSrc === '') {
      setCaption('');
      return;
    }
    fetch(getFileFromCDNWithToken(prefix + captionSrc, accessToken))
      .then(res => {
        if (res.status === 200) return res.text();
        else return '';
      })
      .then(caption => {
        setCaption(caption);
      });
  };

  useEffect(() => {
    if (accessToken) {
      setAudioSrcHref(getFileFromCDNWithToken(prefix + audioSrc, accessToken));
      getCaption();
    }
  }, [accessToken]);

  return (
    <Style.AudioPlayerContainer top={top} right={right} zIndex={EStyleIndex.AUDIO}>
      <Style.AudioPlayerSection isDetailView={isDetailView}>
        <Style.PlayingFigure type='button' aria-label={isPlaying ? '일시정지' : '재생'} onClick={togglePlaying} tabIndex={tabIndex} ref={playStopRef}>
          {isPlaying ? <SvgIcon src={PauseSVG} width='32px' height='32px' /> : <SvgIcon src={PlaySVG} width='32px' height='32px' />}
        </Style.PlayingFigure>

        <audio id={id} ref={audioRef} controls={false} autoPlay={false} src={audioSrcHref} />

        {isDetailView && (
          <>
            <Style.TimeViewSection>
              <Style.ProgressBarContainer
                ref={progressBarContainerRef}
                onMouseDown={handleProgressBarMouseDown}
                onMouseUp={handleProgressBarMouseUp}
                onMouseMove={handleProgressBarMouseMove}
                onMouseOver={handleProgressbarMouseOver}
                onKeyDown={handleProgressBarKeyDown}
              >
                <Style.ProgressBarTrack value={currentTime} max={duration} tabIndex={tabIndex} />
                {isPlaying && <Style.ProgressBarHandle ref={handleRef} left={(currentTime / duration) * 100} />}
              </Style.ProgressBarContainer>
              <Style.TimeDisplaySection>
                <Style.TimeDisplay current={true}>{formatTime(currentTime)}</Style.TimeDisplay>
                <Style.TimeDisplay>{formatTime(duration)}</Style.TimeDisplay>
              </Style.TimeDisplaySection>
            </Style.TimeViewSection>
            <DetailAudioOptionBar
              isDragging={isDragging}
              isVolumeProgressView={isVolumeProgressView}
              isSpeedDetailView={isSpeedDetailView}
              isCaptionActive={isCaptionActive}
              volumeRef={volumeRef}
              volume={volume}
              speed={speed}
              tabIndex={tabIndex}
              caption={caption}
              currentTime={currentTime}
              setIsVolumeProgressView={setIsVolumeProgressView}
              setIsSpeedDetailView={setIsSpeedDetailView}
              setIsCaptionActive={setIsCaptionActive}
              setIsDragging={setIsDragging}
              setVolume={setVolume}
              setSpeed={setSpeed}
            />
          </>
        )}
        <Style.AudioOpenButton
          type='button'
          size={52}
          isDetailView={isDetailView}
          onClick={() => {
            if (isDragging) return;
            else if (!isDragging) toggleDetailView();

            if (playStopRef.current) {
              playStopRef.current.focus();
            }
          }}
          aria-label={!isDetailView ? '음성 재생 컨트롤 열기' : '음성 재생 컨트롤 닫기'}
        >
          <SvgIcon height='52px' width='52px' src={!isDetailView ? AudioClosedSVG : AudioOpenedSVG} />
        </Style.AudioOpenButton>
      </Style.AudioPlayerSection>
    </Style.AudioPlayerContainer>
  );
};

export default AudioPlayer;
