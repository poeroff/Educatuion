import { Box, IQuestionProps, Image, BoxWrap, SimpleAudioPlayer, TMainHeaderInfoTypes, ISimpleAudioPlayerRef } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRef, useState, useEffect } from 'react';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
}

export type HighlightProps = {
  text: string;
  highlightChar: string;
  color: string;
};

export interface IEEL01C03A04P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  data: HighlightProps[];
  audioList: Array<{ audioSrc: string }>;
}

const HighlightText: React.FC<HighlightProps> = ({ text, highlightChar, color }) => {
  const getHighlightedText = (text: string, highlightChar: string, color: string) => {
    const regex = new RegExp(`(${highlightChar})`, 'g');
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex}>
        {word.split('').map((char, index) =>
          char === highlightChar && word.length > 1 ? (
            <span key={index} style={{ color }}>
              {char}
            </span>
          ) : (
            char
          ),
        )}
        {wordIndex < text.split(' ').length - 1 && ' '}
      </span>
    ));
  };

  return <span>{getHighlightedText(text, highlightChar, color)}</span>;
};

const EEL01C03A04P01 = ({ headerInfo, questionInfo, imageInfo, data, audioList }: IEEL01C03A04P01) => {
  const audioPlayerRefs = useRef<ISimpleAudioPlayerRef[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const setRef = (index: number, ref: ISimpleAudioPlayerRef | null) => {
    if (ref) {
      audioPlayerRefs.current[index] = ref;
    }
  };

  const handleChangeStatus = (index: number, isPlaying: boolean) => {
    if (isPlaying) {
      setPlayingIndex(index);
    } else if (playingIndex === index) {
      setPlayingIndex(null);
    }
  };

  useEffect(() => {
    audioPlayerRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index !== playingIndex) {
          ref.changePlayStatus(false);
        }
      }
    });
  }, [playingIndex]);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box useFull hAlign={'center'} vAlign={'center'} marginTop={40}>
          <Image src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} height={imageInfo.height}></Image>
        </Box>
        <Box useFull hAlign={'center'} vAlign={'center'} marginTop={20}>
          {data.map((value, index = 0) => (
            <Box key={index} width={'420px'} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
              <SimpleAudioPlayer
                audioSrc={audioList[index]?.audioSrc}
                onChangeStatus={isPlaying => handleChangeStatus(index, isPlaying)}
                ref={ref => setRef(index, ref)}
              />
              <Box fontSize={'32px'} fontWeight={500} marginLeft={'15px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <HighlightText text={value.text} highlightChar={value.highlightChar} color={value.color} />
              </Box>
            </Box>
          ))}
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL01C03A04P01;
