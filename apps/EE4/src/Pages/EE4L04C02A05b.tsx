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
    isValChk: Boolean(getValueInputData(mainKey, 'RECORDER-0')),
    isComplete: isSubmittedInput(mainKey, 'RECORDER-0'),
  };

  const getRecorderData = (index: number): IAudioData | null => {
    return getValueInputData(mainKey, `RECORDER-0`);
  };

  const handleRecorderSubmit = (index: number, audioData: IAudioData) => {
    changeInputData(mainKey, `RECORDER-0`, audioData);
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
            <PinchZoom>
              <Image
                src={imageList[0].src}
                alt={imageList[0].alt}
                title={imageList[0].title}
                style={{ width: 'fit-content', height: '274px', borderRadius: '8px' }}
              />
            </PinchZoom>
          </Box>
        </Box>
        <Box hAlign='center' width='600px' height='218px'>
          <List data={data} gap={24}>
            {({ value, index }) => (
              <Box hAlign='flex-start' gap={4}>
                <Box hAlign='flex-start' gap={8}>
                  <Box alignSelf='center'>
                    <Label value={value?.type || ''} type={'paint'} background={value?.color} size={'middle'} />
                  </Box>
                  <Box marginTop={value?.type === 'A' ? '50px' : ''}>
                    <Typography
                      style={{
                        fontSize: '36px',
                        lineHeight: '54px',
                        width: '342px',
                        height: value?.type === 'A' ? '124px' : '70px',
                        borderRadius: '8px',
                        padding: '8px 12px 8px 12px',
                      }}
                      weight='500'
                    >
                      {value?.content}
                    </Typography>
                  </Box>
                </Box>

                <Box hAlign='flex-start' gap={6} marginLeft='-20px'>
                  <SimpleAudioPlayer audioSrc={value?.audioSrc || ''} />
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
      </BoxWrap>
    </Container>
  );
};

export default EE4L04C02A05b;
