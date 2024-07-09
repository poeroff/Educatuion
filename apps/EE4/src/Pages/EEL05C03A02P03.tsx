import { Container } from '@maidt-cntn/ui/en';
import {
  TMainHeaderInfoTypes,
  SimpleAudioPlayer,
  Box,
  Recorder,
  Image,
  IQuestionProps,
  BoxWrap,
  EStyleButtonTypes,
  IAudioData,
} from '@maidt-cntn/ui';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { currentPageSubmittedData } from '@/stores';
import { correctDataType, initDataType } from '@maidt-cntn/api';

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

type Audio = {
  audioSrc: string;
};

interface IEEL05C03A02P03 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  mainKey: number;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
  imageList: Image[];
  audioList: Audio[];
  boxWidth: string;
  boxHeight: string;
  boxGap: number;
  highlightColor: string;
}

const EEL05C03A02P03 = ({
  headerInfo,
  questionInfo,
  mainKey,
  getDefaultData,
  getCorrectData,
  imageList,
  audioList,
  boxWidth,
  boxHeight,
  boxGap,
  highlightColor,
}: IEEL05C03A02P03) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const [images] = useState<Image[]>(imageList);
  const [audios] = useState<Audio[]>(audioList);

  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const getRecorderData = (index: number): IAudioData | null => {
    const data = getValueInputData(mainKey, `RECORDER-${index + 1}`);
    return data && data !== '' ? data : null;
  };

  const isRecorded = (): boolean => {
    const initialDataList = Array.from({ length: audios.length }, (_, index) => getRecorderData(index));
    return initialDataList.every(data => data !== null);
  };

  const handleRecorderSubmit = (index: number, audioData: IAudioData) => {
    changeInputData(mainKey, `RECORDER-${index + 1}`, audioData);
  };

  const handleSubmit = () => {
    submitPageData();
  };

  const highlightLetter = (text: string, letter: string) => {
    return text.split(letter).map((part, i) =>
      i < text.split(letter).length - 1 ? (
        <React.Fragment key={i}>
          {part && <span>{part}</span>}
          <HighlightedText highlightColor={highlightColor}>{letter}</HighlightedText>
        </React.Fragment>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <Container
      vAlign='top'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={'완료하기'}
      submitBtnColor={isRecorded() ? (isSubmit ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isRecorded() || isSubmit}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull justifyContent={'center'} alignItems='center'>
        {images.map((image, index) => {
          return (
            <StyledBox key={index} width={boxWidth} height={boxHeight} gap={boxGap}>
              <Box>
                <Image src={image.src} alt={image.alt} width={'100%'} height={'266px'} />
                <Box>
                  <Box
                    hAlign='center'
                    vAlign='center'
                    width={'100%'}
                    height={'64px'}
                    padding={'8px 12px 8px 12px'}
                    borderRadius={' 8px 0px 0px 0px'}
                    opacity={' 0px'}
                  >
                    {highlightLetter(image.value || '', 'o')}
                  </Box>
                  <Box hAlign='end' gap={4} width={'100%'} height={'44px'}>
                    <SimpleAudioPlayer audioSrc={audios[index as number].audioSrc} />
                    <Recorder
                      recorderIndex={index as number}
                      initialData={getRecorderData(index as number)}
                      onSubmit={audioData => handleRecorderSubmit(index as number, audioData)}
                    />
                  </Box>
                </Box>
              </Box>
            </StyledBox>
          );
        })}
      </BoxWrap>
    </Container>
  );
};

const StyledBox = styled(Box)<{ width: string; height: string; gap: number }>`
  width: ${({ width }) => width};
  min-height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
`;

const HighlightedText = styled.span<{ highlightColor: string }>`
  color: ${({ highlightColor }) => highlightColor};
`;

export default EEL05C03A02P03;
