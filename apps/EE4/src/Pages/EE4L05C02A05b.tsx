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
  audioInfo: IAudioPlayerProps;
  data: IListenAndAnswer[];
  mainKey: number;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
  imageList: Image[];
}

const EE4L05C02A05b = ({ headerInfo, questionInfo, audioInfo, data, mainKey, getDefaultData, getCorrectData, imageList }: IEEL01C02A05P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const INITIAL: Props['INITIAL'] = {
    isValChk: Boolean(getValueInputData(mainKey, 'RECORDER-1') && getValueInputData(mainKey, 'RECORDER-2')),
    isComplete: isSubmittedInput(mainKey, 'RECORDER-1') && isSubmittedInput(mainKey, 'RECORDER-2'),
  };

  const getRecorderData = (index: number): IAudioData | null => {
    return getValueInputData(mainKey, `RECORDER-${index + 1}`);
  };

  const handleRecorderSubmit = (index: number, audioData: IAudioData) => {
    changeInputData(mainKey, `RECORDER-${index + 1}`, audioData);
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
      audioInfo={audioInfo}
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
                        padding: '8px 8px 8px 8px',
                        whiteSpace: 'nowrap',
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

export default EE4L05C02A05b;
