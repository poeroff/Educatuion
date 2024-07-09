import useCurrentPageData from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import { Box, PinchZoom, Image, Textarea, EStyleButtonTypes, TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  pageNumber: number;
  mainKey: number;
  subKey: string;
  images: { src: string | string[]; alt: string; title: string };
};

const Component = (pageInfo: PageProps) => {
  const { headerInfo, questionInfo, getCorrectData, getDefaultData, pageNumber, mainKey, subKey, images } = pageInfo;

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const isComplete: boolean = isSubmittedInput(mainKey, subKey);
  const currentAnswer = getValueInputData(mainKey, subKey);

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
      <Box useFull>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom='32px'>
          <PinchZoom>
            <Image src={images.src} alt={images.alt} height='360px' width='480px' title={images.title} style={{ borderRadius: '8px' }} />
          </PinchZoom>
          <Box width='480px' height='394px' hAlign='center' gap='24px'>
            <Textarea
              placeholder='내용을 넣어주세요.'
              value={currentAnswer as string}
              onChange={e => {
                handleChangeInputData(mainKey, subKey, e.target.value);
              }}
              width='480px'
              height='180px'
              disabled={isComplete}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Component;
