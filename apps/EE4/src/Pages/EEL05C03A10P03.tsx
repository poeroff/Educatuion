import useCurrentPageData from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import { Box, Textarea, EStyleButtonTypes, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  pageNumber: number;
  mainKey: number;
  subKey: string;
  textareaWidth?: string;
  textareaHeight?: string;
};

const Component = (pageInfo: PageProps) => {
  const { headerInfo, questionInfo, getCorrectData, getDefaultData, pageNumber, mainKey, subKey, textareaWidth, textareaHeight } = pageInfo;

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
        <Box display='flex' justifyContent='center' alignItems='center' marginBottom='32px'>
        <Textarea
              placeholder='내용을 넣어주세요.'
              value={currentAnswer as string}
              onChange={e => {
                handleChangeInputData(mainKey, subKey, e.target.value);
              }}
              width={textareaWidth || '952px'}
              height={textareaHeight || '394px'}
              disabled={isComplete}
            />
        </Box>
      </Box>
    </Container>
  );
};

export default Component;
