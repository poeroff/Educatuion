import { useEffect, useRef, useState } from 'react';
import { mergeWavBlobs } from './merger';
import {
  DurationTime,
  EmptyProgressWaves,
  EmptyWave,
  PlaybackTime,
  PlayedProgressWaves,
  PlayedWave,
  ProgressWaves,
  RecorderPlayerContainer,
  TogglePlayButton,
} from './RecordPlayer.style';
import { SvgIcon } from '@maidt-cntn/ui';
import pauseIconSrc from '@maidt-cntn/assets/icons/recorder/pause_circle.svg';
import playIconSrc from '@maidt-cntn/assets/icons/recorder/play.svg';

export interface RecorderPlayerProps {
  progressWavesValues: number[];
  audioBlobs: React.MutableRefObject<Blob[]>;
  recordingTime: number;
}

const RecorderPlayer = ({ progressWavesValues, audioBlobs, recordingTime }: RecorderPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const playbackTimerIntervalId = useRef<number | null>(null);

  const handleClickTogglePlay = () => {
    setIsPlaying(prev => !prev);
    if (!isPlaying) {
      if (playbackTime >= recordingTime) {
        setPlaybackTime(0);
      }
      bindAudioURLToPlayer();
      startPlaybackTimer();
    } else {
      audioPlayerRef.current?.pause();
      stopPlaybackTimerInterval();
    }
  };

  const bindAudioURLToPlayer = async () => {
    if (audioPlayerRef.current) {
      const mergedAudioBlob = await mergeWavBlobs(audioBlobs.current);
      const audioURL = URL.createObjectURL(mergedAudioBlob);

      const sourceElement = audioPlayerRef.current.getElementsByTagName('source')[0];
      if (playbackTime === 0 || playbackTime === recordingTime) {
        sourceElement!.src = audioURL;
        sourceElement!.type = mergedAudioBlob!.type;
      }
      audioPlayerRef.current.load();
      audioPlayerRef.current.onloadeddata = () => {
        audioPlayerRef.current?.play();
      };
    }
  };

  const startPlaybackTimer = () => {
    const intervalId = window.setInterval(() => {
      setPlaybackTime(prev => prev + 100);
    }, 100);
    playbackTimerIntervalId.current = intervalId;
  };

  const stopPlaybackTimerInterval = () => {
    if (playbackTimerIntervalId.current) {
      window.clearInterval(playbackTimerIntervalId.current);
    }
  };

  const getPlayedProgressWavesWidth = () => {
    if (recordingTime && playbackTime !== 0) {
      return (playbackTime / recordingTime) * 158;
    }
    return 0;
  };

  const getTimeStamp = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes < 10 ? '0' : ''}${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (recordingTime === playbackTime) {
      setIsPlaying(false);
      stopPlaybackTimerInterval();
    }
  }, [recordingTime, playbackTime]);

  return (
    <RecorderPlayerContainer>
      <audio ref={audioPlayerRef}>
        <source src='' />
      </audio>
      <TogglePlayButton onClick={handleClickTogglePlay}>
        {isPlaying ? <SvgIcon src={pauseIconSrc} width='24px' height='24px' /> : <SvgIcon src={playIconSrc} width='24px' height='24px' />}
      </TogglePlayButton>
      <PlaybackTime>{getTimeStamp(playbackTime)}</PlaybackTime>
      <ProgressWaves>
        <EmptyProgressWaves>
          {progressWavesValues.map((value, index) => (
            <EmptyWave key={index} $waveValue={value} />
          ))}
        </EmptyProgressWaves>
        <PlayedProgressWaves $playedProgressWaveWidth={getPlayedProgressWavesWidth()} $playbackTime={playbackTime}>
          {progressWavesValues.map((value, index) => (
            <PlayedWave key={index} $waveValue={value} />
          ))}
        </PlayedProgressWaves>
      </ProgressWaves>
      <DurationTime>{getTimeStamp(recordingTime)}</DurationTime>
    </RecorderPlayerContainer>
  );
};

export default RecorderPlayer;
