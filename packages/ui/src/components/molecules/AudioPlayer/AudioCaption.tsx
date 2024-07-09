import { useEffect, useState } from 'react';
import { parseSRT } from '../../atoms/VideoPlayer/Caption';
import Style from './AudioPlayer.style';

interface AudioCaptionProps {
  caption: string;
  currentTime: number;
}

export const AudioCaption = ({ caption, currentTime }: AudioCaptionProps) => {
  const [currentCaption, setCurrentCaption] = useState<string>('');

  // srt 불러오는 함수

  // 현재 자막 setting 함수
  const handleTimeUpdate = () => {
    if (caption === '') return;

    const captionList = parseSRT(caption);

    if (Array.isArray(captionList)) {
      const currentCaption = captionList.find(caption => {
        return currentTime >= caption.start && currentTime <= caption.end;
      });

      setCurrentCaption(currentCaption ? currentCaption.text : '');
    } else {
      setCurrentCaption('');
    }
  };

  useEffect(() => {
    handleTimeUpdate();
  }, [caption, currentTime]);

  return (
    <Style.CaptionContainer hasCaption={currentCaption !== ''}>
      <span>{currentCaption}</span>
    </Style.CaptionContainer>
  );
};

export default AudioCaption;
