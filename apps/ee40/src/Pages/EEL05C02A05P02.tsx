import { Container } from '@maidt-cntn/ui/en';
import {
  TMainHeaderInfoTypes,
  Box,
  IQuestionProps,
  EStyleButtonTypes,
  BoxWrap,
  PinchZoom,
  Image,
  List,
  Label,
  Typography,
  SimpleAudioPlayer,
  IAudioPlayerProps,
  Recorder,
  IAudioData,
} from '@maidt-cntn/ui';
import { useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';
import { correctDataType, initDataType } from '@maidt-cntn/api';

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

export type IListenAndAnswer = {
  type: string;
  color: string;
  content: React.ReactNode;
  audioSrc: string;
};

interface IEEL05C02A05P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
  data: IListenAndAnswer[];
  mainKey: number;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
  imageList: Image[];
}

const EEL05C02A05P02 = ({ headerInfo, questionInfo, audioInfo, data, mainKey, getDefaultData, getCorrectData, imageList }: IEEL05C02A05P02) => {
  const { getValueInputData, changeInputData, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const [images] = useState<Image[]>(imageList);

  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const getRecorderData = (index: number): IAudioData | null => {
    const data = getValueInputData(mainKey, `RECORDER-${index + 1}`);
    return data && data !== '' ? data : null;
  };

  const isRecorded = (): boolean => {
    const initialDataList = Array.from({ length: data.length }, (_, index) => getRecorderData(index));
    return initialDataList.every(data => data !== null);
  };

  const handleRecorderSubmit = (index: number, audioData: IAudioData) => {
    changeInputData(mainKey, `RECORDER-${index + 1}`, audioData);
  };

  const handleSubmit = () => {
    submitPageData();
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      submitLabel={'완료하기'}
      onSubmit={handleSubmit}
      submitBtnColor={isRecorded() ? (isSubmit ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isRecorded() || isSubmit}
      audioInfo={audioInfo}
    >
      <BoxWrap>
        <Box hAlign={'center'}>
          <PinchZoom>
            <Image src={images[0].src} alt={images[0].alt} title={images[0].title} width='360px' height='274px' style={{ borderRadius: '8px' }} />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} width='600px' height='218px'>
          <List data={data} gap={24}>
            {({ value, index = 1 }) => (
              <Box hAlign='flex-start' gap={4}>
                <Box hAlign='flex-start' gap={8}>
                  <Box alignSelf='center'>
                    <Label value={value?.type || ''} type={'paint'} background={value?.color} size={'middle'} />
                  </Box>
                  <Typography
                    style={{
                      fontSize: '36px',
                      lineHeight: '54px',
                      width: '342px',
                      height: '70px',
                      borderRadius: '8px',
                      padding: '8px 12px 8px 12px',
                    }}
                    weight='500'
                  >
                    {value?.content}
                  </Typography>
                </Box>
                <Box hAlign='flex-start' gap={6}>
                  <SimpleAudioPlayer audioSrc={value?.audioSrc || ''} />
                  <Recorder
                    recorderIndex={index - 1}
                    initialData={getRecorderData(index - 1)}
                    onSubmit={audioData => handleRecorderSubmit(index - 1, audioData)}
                  />
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL05C02A05P02;
