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
  Radio,
} from '@maidt-cntn/ui';

import { correctDataType, initDataType } from '@maidt-cntn/api';
import useCurrentPageData from '@/hooks/useCurrentPageData';

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

interface Props {
  INITIAL: {
    isValChk: boolean;
    isComplete: boolean;
  };
}

export type IListenAndAnswer = {
  type: string;
  color: string;
  content: React.ReactNode;
  audioSrc: string;
};

interface IEEL01C02A05P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;

  data: IListenAndAnswer[];
  mainKey: number;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
  imageList: Image[];
}

const EE4L04C02A05b = ({ headerInfo, questionInfo, data, mainKey, getDefaultData, getCorrectData, imageList }: IEEL01C02A05P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const INITIAL: Props['INITIAL'] = {
    isValChk: Boolean(getValueInputData(mainKey, 'RECORDER-1') && getValueInputData(mainKey, 'RECORDER-2')),
    isComplete: isSubmittedInput(mainKey, 'RECORDER-1') && isSubmittedInput(mainKey, 'RECORDER-2'),
  };

  const getRecorderData = (index: number): IAudioData | null => {
    return getValueInputData(mainKey, `RECORDER-${index}`);
  };

  const handleRecorderSubmit = (index: number, audioData: IAudioData) => {
    changeInputData(mainKey, `RECORDER-${index}`, audioData);
  };

  const handleSubmit = () => {
    if (!INITIAL.isComplete) {
      submitPageData();
      return;
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      submitLabel={'완료하기'}
      onSubmit={handleSubmit}
      submitBtnColor={INITIAL.isValChk ? (INITIAL.isComplete ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!INITIAL.isValChk || INITIAL.isComplete}
    >
      <BoxWrap marginTop='30px'>
        <Box hAlign='center'>
          <Box hAlign='center' vAlign='center' width='360px' height='274px'>
            <Image
              src={imageList[0].src}
              alt={imageList[0].alt}
              title={imageList[0].title}
              style={{ width: 'fit-content', height: '274px', borderRadius: '8px' }}
            />
          </Box>
        </Box>
        <Box display='block' marginLeft={120}>
          <Box display='flex' flexDirection='column' gap='30px' marginBottom='32px' width='100%'>
            <Box display='flex' gap='30px' width='100%'>
              {[1, 2].map(item => (
                <Box display='flex'>
                  <Radio type='circle'></Radio>
                  <Box
                    key={item}
                    display='block'
                    width='150px'
                    background={item === 1 ? '#fff0cc' : '#fbe4d4'}
                    padding={'4px 12px 4px 12px'}
                    height={'48px'}
                    borderRadius={'8px'}
                    fontSize={'28px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    whiteSpace='nowrap'
                    fontWeight={500}
                    color={'black'}
                    textAlign={'center'}
                  >
                    {item === 1 ? '농구' : '야구'}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box display='flex' gap='30px' width='100%'>
              {[3, 4].map(item => (
                <Box display='flex'>
                  <Radio type='circle'></Radio>
                  <Box
                    key={item}
                    display='block'
                    width='150px'
                    background={item === 3 ? '#fbe4d4' : '#fff0cc'}
                    padding={'4px 12px 4px 12px'}
                    height={'48px'}
                    borderRadius={'8px'}
                    fontSize={'28px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    whiteSpace='nowrap'
                    fontWeight={500}
                    color={'black'}
                    textAlign={'center'}
                  >
                    {item === 3 ? '배트민턴' : '축구'}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box hAlign='center' width='600px' height='218px' marginLeft={174}>
            <List data={data} gap={24}>
              {({ value, index }) => (
                <Box hAlign='flex-start' gap={4}>
                  <Box hAlign='flex-start' gap={6} marginLeft='-20px'>
                    <Recorder
                      recorderIndex={index as number}
                      initialData={getRecorderData(index as number)}
                      onSubmit={audioData => handleRecorderSubmit(index as number, audioData)}
                      readOnly={INITIAL.isComplete}
                    />
                  </Box>
                </Box>
              )}
            </List>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EE4L04C02A05b;
