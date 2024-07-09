import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import EM01001, { IEM01001Info, TAnswers } from '@maidt-cntn/math/pages/EM-010-01';
import { Box, EStyleFontSizes, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0002_07 } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { isAnswer, isEquationAnswer } from '@maidt-cntn/util/CommonUtil';
import { MathExpression } from '@maidt-cntn/ui/math';

const P01 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A01_0002_07);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    }
    const isCorrect1 = isEquationAnswer(cardData.p01.answer1, cardData.p01.solution1);
    const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
    const isCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, cardData.p01.isCorrect);
  };

  const handleInputChange = (index: number, value: string) => {
    if (index === 0) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (index === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, index, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box>
        드론은 산불을 예방하거나 불을 끄는 데에도 사용되고 있습니다. 어느 소방 본부에 감시 드론이 112 대, 산불{' '}
        <Typography color={'var(--color-blue-400)'} useGap={false}>
          진화*
        </Typography>{' '}
        드론이 124대 있다면 드론은 모두 몇 대인가요?
      </Box>
    ),
    size: 'small',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const help = (
    <>
      <Typography color={'var(--color-blue-400)'}>*진화: 불이 난 것을 끔.</Typography>
    </>
  );

  const initialData: TAnswers[] = [
    { value: cardData.p01.answer1, answer: cardData.p01.solution1 },
    { value: cardData.p01.answer2, answer: cardData.p01.solution2 },
  ];

  const unit = '대';

  const info: IEM01001Info = {
    altText: '드론이 날고 있는 모습',
    imageSrc: '/A01/0002/07/MA31101-1.png',
    imageWidth: '234px',
    imageHeight: '176px',
  };

  const answer = <MathExpression equation='$112+124=236$ 또는 $124+112=236$ 또는 $124+112$ 또는 $112+124$, 236' />;

  const explanation = (
    <Box marginTop='12px'>
      <MathExpression equation='$(모든 드론 수)=(산불 감시 드론 수)+(산불 진화 드론 수)=112+124=236$ (대)' />
    </Box>
  );

  return (
    <EM01001
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      help={help}
      initialData={initialData}
      unit={unit}
      info={info}
      answer={answer}
      explanation={explanation}
      isSubmitted={cardData.p01.isSubmitted}
      handleInputChange={handleInputChange}
      onSubmit={onSubmit}
    ></EM01001>
  );
};

export default P01;
