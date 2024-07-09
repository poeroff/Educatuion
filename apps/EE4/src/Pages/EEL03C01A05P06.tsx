import { useState, useEffect } from 'react';
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
} from '@maidt-cntn/ui';
import styled from 'styled-components';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';

import { initDataType, correctDataType } from '@maidt-cntn/api';

type IListenAndAnswer = {
  type: string;
  content: string;
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

const EEL03C01A05P06 = ({ layout, data, imgArr, audioArr, pageData }: Props) => {
  const CONST = { ...layout };
  const { pageNumber, mainKey, getDefaultData, getCorrectData } = pageData;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [images] = useState<Image[]>(imgArr);
  const [audios] = useState<string[]>(audioArr);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const { changeInputData, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleRecoderSubmit = (index: number) => {
    changeInputData(mainKey, `RECORDER-${index}`, true);
  };

  const handleSubmit = () => {
    submitPageData();
  };

  useEffect(() => {
    isSubmit && setIsCompleted(true);
  }, [isSubmit]);

  return (
    <Container
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      useExtend
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitBtnColor={isSubmit ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={isSubmit && !isCompleted ? true : false}
      audioInfo={CONST.audioInfo}
    >
      <BoxWrap>
        <Box hAlign={'center'}>
          <PinchZoom
          //  tabIndex={102}
          >
            <Image src={images[0].src} width='389px' height='394px' alt={images[0].alt} title={images[0].alt} style={{ borderRadius: '8px' }} />
          </PinchZoom>
        </Box>
        <Box height={424} width='571px' useFull>
          <ListHeader>
            <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
          </ListHeader>
          <Box hAlign={'center'}>
            <List<IListenAndAnswer>
              // gap={24}
              data={data}
              row={({ value, index }) => (
                <Box hAlign='space-between' gap={4} width={532}>
                  <Box hAlign='center' gap={8} height={value?.content.includes('\n') ? '176px' : '128px'} alignItems='flex-start'>
                    <Box alignSelf='flex-start' marginTop={50}>
                      <Label value={value?.type || ''} type={'paint'} background={value?.color} />
                    </Box>
                    <Box>
                      <TextBox>
                        <Typography
                          style={{
                            fontSize: '32px',
                            lineHeight: '48px',
                            width: '301px',
                            height: '64px',
                            borderRadius: '8px',
                            padding: '8px 12px 8px 12px',
                          }}
                          weight='500'
                        >
                          {value?.content}
                        </Typography>
                        {isOpen && (
                          <Box width={355} position='absolute'>
                            <Typography weight={600} color={'#2F38C7'} {...{ fontFamily: 'Lexend' }}>
                              {value?.interpret}
                            </Typography>
                          </Box>
                        )}
                      </TextBox>
                    </Box>
                  </Box>
                  <Box hAlign='end' gap={6}>
                    <SimpleAudioPlayer audioSrc={audios[(index as number) - 1]} />
                    <Recorder
                      recorderIndex={index as number}
                      onSubmit={() => {
                        handleRecoderSubmit(index as number);
                      }}
                    />
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const TextBox = styled.div`
  height: 128px;
  transform: translateY(40px);
`;

export default EEL03C01A05P06;
