import { EStyleFontSizes, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

import HE00301, { IApiInfo } from '@maidt-cntn/pages/HE-003-01';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C11A05 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A05);

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
    text: 'Write your answer using a structure you learned in this lesson.',
  };
  const question = `What do you suggest we do to \nbecome wise consumers?`;
  const egAnswer = (
    <Typography size={EStyleFontSizes.SMALL} useGap={false}>
      I{' '}
      <Typography size={EStyleFontSizes.SMALL} useGap={false} color='var(--color-blue-700)'>
        suggest
      </Typography>{' '}
      that we carefully{' '}
      <Typography size={EStyleFontSizes.SMALL} useGap={false} color='var(--color-blue-700)'>
        check
      </Typography>{' '}
      the information and reviews about goods and services, comparing their quality and prices.
    </Typography>
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
      egAnswer={egAnswer}
      value={cardData.p01.answer}
      setValue={setValue}
    />
  );
};

export default P01;
