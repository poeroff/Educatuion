import { useState, useEffect, useCallback } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  PinchZoom,
  Image,
  Typography,
  IQuestionProps,
  IAudioPlayerProps,
  List,
  Label,
  Recorder,
  SimpleAudioPlayer,
  ListHeader,
  ToggleButton,
  EStyleButtonTypes,
  IAudioData,
} from '@maidt-cntn/ui';
import styled from 'styled-components';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';

import { initDataType, correctDataType } from '@maidt-cntn/api';

type IListenAndAnswer = {
  type: string;
  content: React.ReactNode;
  interpret: React.ReactNode;
  color: string;
};

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

type pageData = {
  pageNumber: number;
  mainKey: number;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
};

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    srtFile?: string;
    audioInfo?: IAudioPlayerProps;
  };
  data: IListenAndAnswer[];
  imgArr: Image[];
  audioArr: string[];
  pageData: pageData;
}

const EEL01C01A05P07 = ({ layout, data, imgArr, audioArr, pageData }: Props) => {
  const CONST = { ...layout };
  const { pageNumber, mainKey, getDefaultData, getCorrectData } = pageData;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [images] = useState<Image[]>(imgArr);
  const [audios] = useState<string[]>(audioArr);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const { changeInputData, getValueInputData, submitPageData, currentPageInputStates } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleRecoderSubmit = (index: number, data: IAudioData) => {
    changeInputData(mainKey, `RECORDER-${index}`, data);
  };

  const handleSubmit = () => {
    submitPageData();
  };

  const isCompletedAll = useCallback(() => {
    const data = currentPageInputStates.filter(item => item.mainKey === mainKey);
    const isCompleted = data.every(item => item.inputData.every(item => item.value));
    return isCompleted;
  }, [currentPageInputStates, mainKey]);

  useEffect(() => {
    setIsCompleted(isCompletedAll());
  }, [currentPageInputStates, isCompletedAll]);

  return (
    <Container
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      useExtend
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitBtnColor={isCompleted || isSubmit ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={isSubmit || !isCompleted ? true : false}
      audioInfo={CONST.audioInfo}
    >
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>

      <BoxWrap>
        <Box hAlign={'center'}>
          <PinchZoom
          //  tabIndex={102}
          >
            <Image src={images[0].src} width='360px' height='274px' alt={images[0].alt} title={images[0].alt} style={{ borderRadius: '8px' }} />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} width='600px' height='100%'>
          <List<IListenAndAnswer>
            gap={24}
            data={data}
            row={({ value, index }) => (
              <Box hAlign='space-between' gap={4}>
                <Box hAlign='flex-start' gap={8}>
                  <Box alignSelf='center'>
                    <Label value={value?.type || ''} type={'paint'} background={value?.color} />
                  </Box>
                  <TextBox>
                    <Typography
                      style={{
                        fontSize: '32px',
                        lineHeight: '48px',
                        width: '300px',
                        height: '70px',
                        borderRadius: '8px',
                        padding: '8px 12px 8px 12px',
                      }}
                      weight='500'
                    >
                      {value?.content}
                    </Typography>
                    {isOpen && (
                      <Box>
                        <Typography weight={600} color={'#2F38C7'} {...{ fontFamily: 'Lexend' }}>
                          {value?.interpret}
                        </Typography>
                      </Box>
                    )}
                  </TextBox>
                </Box>
                <Box hAlign='end' gap={6}>
                  <SimpleAudioPlayer audioSrc={audios[(index as number) - 1]} />
                  <Recorder
                    recorderIndex={index as number}
                    initialData={getValueInputData(mainKey, `RECORDER-${index}`)}
                    readOnly={isCompleted}
                    onSubmit={data => {
                      handleRecoderSubmit(index as number, data);
                    }}
                  />
                </Box>
              </Box>
            )}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

const TextBox = styled.div`
  height: 126px;
  transform: translateY(40px);
`;

export default EEL01C01A05P07;
