import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import EM00402, { IMath, IAnswer, ITooltip, TBgColors } from '@maidt-cntn/math/pages/EM-004-02';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0002_05 } from './store';
import { IQuestionProps, Label, TMainHeaderInfoTypes, TD, Input, InputStatus } from '@maidt-cntn/ui';
import { MathExpression } from '@maidt-cntn/ui/math';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0002_05);
  const { userId } = useRecoilValue(studentAtom);
  const inputRef0 = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [bgColors, setBgColors] = useState<TBgColors[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$351+246$ 계산하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='var(--color-grey-600)' />
        <MathExpression equation={'$351+246$ 을 계산하는 방법을 알아보세요.'} />
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleDisabled = (index: number) => {
    if (cardData.p01.answer[index + 1] === cardData.p01.solution[index + 1]) {
      if (cardData.p01.answer[index] === cardData.p01.solution[index]) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const content = (
    <>
      <TD>
        <Input
          value={cardData.p01.answer[2]}
          onChange={event => handleChange(2, event.target.value)}
          ariaLabel='일의자리, 답'
          maxLength={1}
          type='number'
          disabled={cardData.p01.answer[2] === cardData.p01.solution[2] ? true : false}
          status={
            !cardData.p01.isSubmitted
              ? InputStatus.ENABLE
              : cardData.p01.answer[2] !== cardData.p01.solution[2]
              ? InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          inputRef={inputRef2}
          onClick={() => setBgColors(['blue'])}
        />
      </TD>
      <TD>
        <Input
          value={cardData.p01.answer[1]}
          onChange={event => handleChange(1, event.target.value)}
          ariaLabel='십의자리, 답'
          maxLength={1}
          type='number'
          disabled={handleDisabled(1)}
          inputRef={inputRef1}
          status={
            !cardData.p01.isSubmitted
              ? InputStatus.ENABLE
              : cardData.p01.answer[1] !== cardData.p01.solution[1]
              ? InputStatus.ERROR
              : InputStatus.DEFAULT
          }
        />
      </TD>
      <TD>
        <Input
          value={cardData.p01.answer[0]}
          onChange={event => handleChange(0, event.target.value)}
          ariaLabel='백의 자리, 답'
          maxLength={1}
          type='number'
          disabled={handleDisabled(0) || cardData.p01.isSubmitted}
          inputRef={inputRef0}
          status={
            !cardData.p01.isSubmitted
              ? InputStatus.ENABLE
              : cardData.p01.answer[0] !== cardData.p01.solution[0]
              ? InputStatus.ERROR
              : InputStatus.DEFAULT
          }
        />
      </TD>
      <TD></TD>
    </>
  );

  const math: IMath = {
    caption: '세로셈',
    math: ['351', '+', '246'],
    bgColors: bgColors,
    th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
    td: [
      ['1', '5', '3', ''],
      ['6', '4', '2', '+'],
    ],
    input: content,
  };

  const answer: IAnswer = {
    answer: ['5', '9', '7'],
    description: [
      '- 일의 자리끼리 더하면 $1+6=7$이므로 일의 자리에 7을 씁니다.',
      '- 십의 자리끼리 더하면 $5+4=9$이므로 십의 자리에 9를 씁니다.',
      '- 백의 자리끼리 더하면 $3+2=5$이므로 백의 자리에 5를 씁니다.',
      '- (형식화의 과정을 이해하며 일의 자리부터 차례로 나타냅니다.)',
    ],
  };

  const tooltip: ITooltip = {
    isBearBalloon: true,
    content: (
      <>
        각 자리 수를
        <br />
        맞추어 쓰고
        <br />
        같은 자리끼리 더해요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = (result: boolean) => {
    const isCorrect = result;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
      isSubmitted && setBgColors(['blue', 'red', 'green']);
    }
  };

  const handleChange = (index: number, value: string) => {
    const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
    const newData = [...currentAnswer];
    newData[index] = value; // 새로운 값을 인덱스에 할당합니다.
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
    changeData('P01', 1, 1, newData);
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

  useEffect(() => {
    if (cardData.p01.answer[2] === cardData.p01.solution[2]) {
      inputRef1.current?.focus();
      setBgColors(['blue', 'red']);
    }
    if (cardData.p01.answer[1] === cardData.p01.solution[1]) {
      inputRef0.current?.focus();
      setBgColors(['blue', 'red', 'green']);
    }
  }, [cardData.p01.answer]);

  return (
    <EM00402
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      math={math}
      value={cardData.p01.answer}
      answer={answer}
      onSubmit={onSubmit}
      tooltip={tooltip}
      submitted={cardData.p01.isSubmitted}
    />
  );
};

export default P01;
