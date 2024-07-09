import { useState, useEffect } from 'react';
import Style from './VideoPlayer.style';

interface ICaptionProps {
  srtFile: string;
  currentTime: number;
  isControlBarVisibile: boolean;
}

export type TCaptionType = {
  start: number;
  end: number;
  text: string;
};

export const parseSRT = (srtContent: string): TCaptionType[] | string => {
  if (srtContent === '') return [];

  const captionBlocks = srtContent
    .trim()
    .split('\n')
    .map(line => line.replace(/\r/g, ''));

  const parsedCaptions: string[][] = [];
  let currentBlock: string[] = [];

  captionBlocks.forEach(line => {
    if (/^\d+$/.test(line)) {
      if (currentBlock.length > 0) {
        parsedCaptions.push(currentBlock);
        currentBlock = [];
      }
    }
    currentBlock.push(line);
  });
  if (currentBlock.length > 0) parsedCaptions.push(currentBlock);

  const parseTime = (timecode: string): number => {
    const parts = timecode.split(':').map(parseFloat);
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const renderedCaptions = parsedCaptions.map(caption => {
    const [startString, endString] = caption[1].split(' --> ');
    const start = parseTime(startString);
    const end = parseTime(endString);
    const text = caption.slice(2).join(' ');
    return { start, end, text };
  });

  return renderedCaptions;
};

export const Caption = ({ srtFile, currentTime, isControlBarVisibile }: ICaptionProps) => {
  const [currentCaption, setCurrentCaption] = useState<string>('');

  useEffect(() => {
    const subtitles = parseSRT(srtFile);

    const handleTimeUpdate = () => {
      if (Array.isArray(subtitles)) {
        const currentCaption = subtitles.find(subtitle => {
          return currentTime >= subtitle.start && currentTime <= subtitle.end;
        });

        if (currentCaption) setCurrentCaption(currentCaption.text);
        else setCurrentCaption('');
      } else {
        setCurrentCaption('');
      }
    };

    handleTimeUpdate();
  }, [currentTime]);

  return (
    <Style.CaptionContainer>
      <span>{currentCaption}</span>
    </Style.CaptionContainer>
  );
};

export default Caption;
