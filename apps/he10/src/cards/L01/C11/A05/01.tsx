import { EStyleFontSizes, IQuestionProps, TMainHeaderInfoTypes, Typography, Box } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import HE00301, { IApiInfo } from '@maidt-cntn/pages/HE-003-01';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C11A05 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A05);

  const apiInfo: IApiInfo = {
    userId: userId,
    pageId: 'P01',
    submitData: submitData,
    initData: initData,
    saveData: saveData,
    changeData: changeData,
    pageIds: pageIds,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'D. Writing',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write your answer using a structure you learned in this lesson.',
  };
  const question = `What is most important when \ncommunicating with others?`;
  const answer = 'We need to respond appropriately to what others are saying, focusing on their facial expressions and gestures.';
  const egAnswer = (
    <Box padding='4px 12px'>
      <Typography size={EStyleFontSizes.SMALL} useGap={false}>
        We should respect others,{' '}
        <Typography size={EStyleFontSizes.SMALL} useGap={false} color='var(--color-blue-700)'>
          embracing
        </Typography>{' '}
        the differences among individuals.
      </Typography>
    </Box>
  );

  const setValue = (value: string) => {
    setCardData(prev => ({ prev, p01: { ...prev.p01, answer: value } }));
  };

  return (
    <HE00301
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      question={question}
      answer={answer}
      egAnswer={egAnswer}
      value={cardData.p01.answer}
      setValue={setValue}
    />
  );
};

export default P01;
