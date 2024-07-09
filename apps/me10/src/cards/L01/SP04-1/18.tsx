import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { EStyleFontSizes, IQuestionProps, TMainHeaderInfoTypes, TMarkType, Typography } from '@maidt-cntn/ui';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import HE01301API, { IApiInfo } from '@maidt-cntn/pages/HE-013-01-API';

const DEFAULT_PAGE_KEY = 'P18';

interface P18Props {
  pageKey?: string;
}

const P18 = ({ pageKey = DEFAULT_PAGE_KEY }: P18Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    pageId: pageKey,
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  const answer = 4;

  const data = [
    { text: 'She not does her homework.' },
    { text: 'She don’t do her homework.' },
    { text: 'She doesn’t does her homework.' },
    { text: 'She doesn’t do her homework.' },
    { text: 'She aren’t does her homework.' },
  ];

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerPattern: 'icon',
      iconType: 'writeENG',
      headerText: '확인문제',
    }),
    [],
  );

  const [mark, setMark] = useState<TMarkType>('none');

  const questionInfo: IQuestionProps = {
    text: '2. 다음 문장을 부정문으로 바르게 옮긴 것을 고르시오.',
    size: 'medium',
    mark: mark,
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx !== undefined ? (selectedIdx === answer - 1 ? 'correct' : 'incorrect') : 'none');
  };

  const boxContent = 'She does her homework.';

  const answerInfo = {
    answer: answer,
    explanation: (
      <Typography size={EStyleFontSizes['X-MEDIUM']}>{'주어가 3인칭 단수 She이므로 ‘doesn’t+동사원형’ 형태로 쓰는 것이 알맞다.'}</Typography>
    ),
    translation: <Typography size={EStyleFontSizes['X-MEDIUM']}>{'그녀는 그녀의 숙제를 한다.'}</Typography>,
  };

  return (
    <HE01301API
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      boxContent={boxContent}
      data={data}
      answerInfo={answerInfo}
      changeMark={handleChangeMark}
    />
  );
};

export default P18;
