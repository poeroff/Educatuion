import { Container } from '@maidt-cntn/ui/en';
import { Box, Textarea, VideoPlayer, EStyleButtonTypes, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { correctDataType, initDataType } from '@maidt-cntn/api';

interface IVideoPlayerProps {
  videoSrc: string;
  srtFile: string;
  width?: string;
  height?: string;
}

interface IDataKey {
  mainKey: number;
  subKey: string;
}

interface IEEL01C01A02P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  videoInfo: IVideoPlayerProps;
  dataKey: IDataKey;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
  textareaWidth?: string;
  textareaHeight?: string;
}

const EEL01C01A02P01 = ({
  headerInfo,
  questionInfo,
  videoInfo,
  dataKey,
  getDefaultData,
  getCorrectData,
  textareaWidth,
  textareaHeight,
}: IEEL01C01A02P01) => {
  const { mainKey, subKey } = dataKey;

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const isComplete: boolean = isSubmittedInput(mainKey, subKey);
  const currentAnswer = getValueInputData(mainKey, subKey);

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const validationCheck = () => {
    return currentAnswer === null || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0);
  };

  const completeQnA = () => {
    if (!isComplete) {
      submitPageData();
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      submitLabel={'완료하기'}
      submitBtnColor={!validationCheck() ? (isComplete ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isComplete}
      onSubmit={completeQnA}
    >
      <Box hAlign={'center'}>
        <Box width={videoInfo.width} height={videoInfo.height}>
          <VideoPlayer srtFile={videoInfo.srtFile} videoSrc={videoInfo.videoSrc || ''} />
        </Box>
      </Box>
      <Box hAlign={'center'} marginTop='18px'>
        <Box>
          <Textarea
            placeholder='내용을 넣어 주세요.'
            value={currentAnswer as string}
            onChange={e => handleChangeInputData(mainKey, subKey, e.target.value)}
            width={textareaWidth || '680px'}
            height={textareaHeight || '64px'}
            disabled={isComplete}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default EEL01C01A02P01;
