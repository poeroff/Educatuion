import { Box, IQuestionProps, Image, BoxWrap, EStyleButtonTypes, TMainHeaderInfoTypes, IAudioData, Recorder } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useEffect, useState } from 'react';
import { initDataType } from '@maidt-cntn/api';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
}
export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export type HighlightProps = {
  text: string;
  highlightChar: string;
  color: string;
};
export interface IEEL01C03A04P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  data: HighlightProps[];
  pageInfo: IPageInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: null;
    }[][];
  }[];
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

const EEL01C03A04P02 = ({ headerInfo, questionInfo, imageInfo, data, pageInfo, getDefaultData, getCorrectData }: IEEL01C03A04P02) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const initialAudioData: IAudioData | null = getValueInputData(pageInfo.mainKey, pageInfo.subKey);

  const handleSubmit = () => {
    if (!isComplete) {
      submitPageData();
      return;
    }
  };

  const submitRecorder = (audioData: IAudioData) => {
    handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, audioData);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={initialAudioData ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      submitDisabled={!initialAudioData || isComplete}
    >
      <BoxWrap display={'flex'} flexDirection={'row'}>
        <BoxWrap display={'flex'} flexDirection={'column'} width={'780px'}>
          <Box hAlign={'center'} vAlign={'center'}>
            <Image src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} height={imageInfo.height} width={imageInfo.width}></Image>
          </Box>
          <Box hAlign={'center'} vAlign={'center'} marginTop={30}>
            {data.map((value, index = 0) => (
              <Box
                key={index}
                width={'328px'}
                fontSize={'32px'}
                fontWeight={500}
                marginLeft={'15px'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <HighlightText text={value.text} highlightChar={value.highlightChar} color={value.color} />
              </Box>
            ))}
          </Box>
        </BoxWrap>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Recorder
            recorderIndex={1}
            initialData={initialAudioData}
            onSubmit={audioData => {
              submitRecorder(audioData);
            }}
            readOnly={isComplete}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL01C03A04P02;
