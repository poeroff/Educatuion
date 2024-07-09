import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

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

import { correctDataType, initDataType } from '@maidt-cntn/api';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { currentPageSubmittedData } from '@/stores';

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

type Audio = {
  audioSrc: string;
};

interface IEEL01C03A02P03 {
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

const EEL01C03A02P03 = ({
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
}: IEEL01C03A02P03) => {
  const { getValueInputData, changeInputData, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const getRecorderData = (index: number): IAudioData | null => {
    const data = getValueInputData(mainKey, `RECORDER-${index + 1}`);
    return data && data !== '' ? data : null;
  };

  const isRecorded = (): boolean => {
    const initialDataList = Array.from({ length: audioList.length }, (_, index) => getRecorderData(index));
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
        {imageList.map((image, index) => {
          return (
            <StyledBox key={index} width={boxWidth} height={boxHeight} gap={boxGap}>
              <Box>
                <Box hAlign='center' vAlign='center' width='220px' height='266px' borderRadius='8px'>
                  <Image src={image.src} alt={image.alt} width='220px' height='fit-content' />
                </Box>
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
                    {highlightLetter(image.value || '', 'a')}
                  </Box>
                  <Box hAlign='end' gap={4} width={'100%'} height={'44px'}>
                    <SimpleAudioPlayer audioSrc={audioList[index as number].audioSrc} />
                    <Recorder
                      recorderIndex={index as number}
                      initialData={getRecorderData(index as number)}
                      onSubmit={audioData => handleRecorderSubmit(index as number, audioData)}
                      readOnly={isSubmit}
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

export default EEL01C03A02P03;
