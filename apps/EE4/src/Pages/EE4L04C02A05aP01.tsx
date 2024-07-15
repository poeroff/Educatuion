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
  Drawing,
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

interface IEE4L04C02A05aP01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
  data: IListenAndAnswer[];
  mainKey: number;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
  imageList: Image[];
}

const EE4L04C02A05aP01 = ({ headerInfo, questionInfo, audioInfo, data, mainKey, getDefaultData, getCorrectData, imageList }: IEE4L04C02A05aP01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const INITIAL: Props['INITIAL'] = {
    isValChk: Boolean(getValueInputData(mainKey, 'RECORDER-1') && getValueInputData(mainKey, 'RECORDER-2')),
    isComplete: isSubmittedInput(mainKey, 'RECORDER-1') && isSubmittedInput(mainKey, 'RECORDER-2'),
  };

  const getRecorderData = (index: number): IAudioData | null => {
    return getValueInputData(mainKey, `RECORDER-1`);
  };

  const handleRecorderSubmit = (index: number, audioData: IAudioData) => {
    changeInputData(mainKey, `RECORDER-1`, audioData);
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
        <Box hAlign='center' width='100%' height='218px'>
          <List data={data} gap={24}>
            {({ value, index }) => (
              <Box hAlign='flex-start' gap={250}>
                <Drawing width='400px' height='400px' useBorder></Drawing>

                <Box hAlign='flex-start' gap={6}>
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

export default EE4L04C02A05aP01;
