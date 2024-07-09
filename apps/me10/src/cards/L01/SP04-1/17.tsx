import { TMainHeaderInfoTypes, Typography, IQuestionProps, EStyleFontSizes } from '@maidt-cntn/ui';
import { useState } from 'react';
import HE00401, { IApiInfo, IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue } from 'recoil';

const DEFAULT_PAGE_KEY = 'P17';

interface P17Props {
  pageKey?: string;
}

const P17 = ({ pageKey = DEFAULT_PAGE_KEY }: P17Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [mark, setMark] = useState<string>('none');
  const answer = 5;

  const apiInfo: IApiInfo = {
    pageId: pageKey,
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        {`1. 빈칸에 들어갈 말이 나머지와 `}
        <Typography useGap={false} fontSize={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
          다른
        </Typography>
        {` 것을 고르시오.`}
      </>
    ),
    size: 'medium',
    mark: mark,
  };

  const data: IHE00401Data[] = [
    {
      text: 'We ______ nervous.',
      textTypo: (
        <Typography>
          We <Typography type='blank' width='70px' title='빈칸' boxColor='var(--color-black)' /> nervous.
        </Typography>
      ),
    },
    {
      text: 'You ______ a teacher.',
      textTypo: (
        <Typography>
          You <Typography type='blank' width='70px' title='빈칸' boxColor='var(--color-black)' /> a teacher.
        </Typography>
      ),
    },
    {
      text: 'They ______ on the table.',
      textTypo: (
        <Typography>
          They <Typography type='blank' width='70px' title='빈칸' boxColor='var(--color-black)' /> on the table.
        </Typography>
      ),
    },
    {
      text: 'These cookies ______ sweet.',
      textTypo: (
        <Typography>
          These cookies <Typography type='blank' width='70px' title='빈칸' boxColor='var(--color-black)' /> sweet.
        </Typography>
      ),
    },
    {
      text: 'He ______ a good student.',
      textTypo: (
        <Typography>
          He <Typography type='blank' width='70px' title='빈칸' boxColor='var(--color-black)' /> a good student.
        </Typography>
      ),
    },
  ];

  const explanation = '5번은 be동사 is가 적절하며 나머지는 are이 적절하다.';

  const translation = `1. 우리는 긴장된다.
  2. 너는 선생님이다.
  3. 그것들은 탁자 위에 있다.
  4. 이 쿠키들은 달콤하다.
  5. 그는 좋은 학생이다.
  `;

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === answer - 1 ? 'correct' : 'incorrect');
  };

  return (
    <HE00401
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      data={data}
      answer={answer}
      explanation={explanation}
      translation={translation}
      changeMark={handleChangeMark}
    />
  );
};

export default P17;
