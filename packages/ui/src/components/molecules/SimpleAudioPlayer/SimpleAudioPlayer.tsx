import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { RecordButton } from '@maidt-cntn/ui';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';

export interface ISimpleAudioPlayer {
  id?: string;
  tabIndex?: number;
  audioSrc: string;
  ariaLabel?: string;
  simpleIcon?: boolean;
  onEnded?: () => void;
  onChangeStatus?: (state: boolean) => void;
}

export interface ISimpleAudioPlayerRef {
  changePlayStatus: (status: boolean, reset?: boolean) => void;
}

export const SimpleAudioPlayer = forwardRef<ISimpleAudioPlayerRef, ISimpleAudioPlayer>(
  ({ id, tabIndex, audioSrc, ariaLabel, simpleIcon = false, onEnded, onChangeStatus }, ref) => {
    const prefix = import.meta.env.VITE_CDN_PATH;
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [simpleAudioSrcHref, setSimpleAudioSrcHref] = useState<string>('');
    const [{ accessToken }] = useRecoilState(tokenAtom);

    const labelState = simpleIcon ? (isPlaying ? 'simpleWait' : 'simpleListen') : isPlaying ? 'wait' : 'listen';

    const onClickPlayButton = () => {
      setIsPlaying(state => !state);
      onChangeStatus?.(!isPlaying);
    };

    const onEndedAudio = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    useImperativeHandle(ref, () => {
      const changePlayStatus = (status: boolean, reset = false) => {
        setIsPlaying(status);
        if (reset) audioRef.current!.currentTime = 0;
      };

      return {
        changePlayStatus,
      };
    });

    useEffect(() => {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying]);

    useEffect(() => {
      if (accessToken) {
        setSimpleAudioSrcHref(getFileFromCDNWithToken(prefix + audioSrc, accessToken));
      }
    }, [accessToken]);

    return (
      <>
        <audio tabIndex={tabIndex} onEnded={onEndedAudio} id={id} ref={audioRef} autoPlay={false} src={simpleAudioSrcHref} controls={false} />
        <RecordButton tabIndex={tabIndex} label={labelState} simpleIcon={simpleIcon} ariaLabel={ariaLabel} onClick={onClickPlayButton} />
      </>
    );
  },
);

export default SimpleAudioPlayer;
