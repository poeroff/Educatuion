import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import EM00402, { IMath, IAnswer, TBgColors } from '@maidt-cntn/math/pages/EM-004-02';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0003_06 } from './store';
import { IQuestionProps, Label, TMainHeaderInfoTypes, TD, Input, InputStatus } from '@maidt-cntn/ui';
import { isNumber, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { MathExpression } from '@maidt-cntn/ui/math';

const P02 = () => {
  const pageNo = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0003_06);
  const { userId } = useRecoilValue(studentAtom);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [isDisplaySuperscript, setDisplaySuperscript] = useState<boolean>(false);
  const [bgColors, setBgColors] = useState<TBgColors[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$492+194$ 계산하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='var(--color-grey-600)' />
        <MathExpression equation={'$492+194$ 를 계산하는 방법을 알아보세요.'} />
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleDisabled = (index: number) => {
    if (cardData.p02.answer[index + 1] === cardData.p02.solution[index + 1]) {
      if (cardData.p02.answer[index] === cardData.p02.solution[index]) {
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
          value={cardData.p02.answer[2]}
          onChange={event => handleChange(2, event.target.value)}
          onClick={() => {
            !cardData.p02.answer[1] && cardData.p02.answer[2] !== cardData.p02.solution[2] && setBgColors(['blue']);
          }}
          ariaLabel='일의자리, 답'
          maxLength={1}
          readOnly={cardData.p02.isSubmitted || cardData.p02.answer[2] === cardData.p02.solution[2] ? true : false}
          status={
            isNotEmptyString(cardData.p02.answer[2])
              ? cardData.p02.isSubmitted && cardData.p02.answer[2] !== cardData.p02.solution[2]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
        />
      </TD>
      <TD>
        <Input
          value={cardData.p02.answer[1]}
          onChange={event => handleChange(1, event.target.value)}
          ariaLabel='십의자리, 답'
          maxLength={1}
          readOnly={cardData.p02.isSubmitted || handleDisabled(1)}
          inputRef={inputRef1}
          status={
            isNotEmptyString(cardData.p02.answer[1])
              ? cardData.p02.isSubmitted && cardData.p02.answer[1] !== cardData.p02.solution[1]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
        />
      </TD>
      <TD>
        <Input
          value={cardData.p02.answer[0]}
          onChange={event => handleChange(0, event.target.value)}
          ariaLabel='백의자리, 답'
          maxLength={1}
          readOnly={cardData.p02.isSubmitted || handleDisabled(0)}
          inputRef={inputRef2}
          status={
            isNotEmptyString(cardData.p02.answer[0])
              ? cardData.p02.isSubmitted && cardData.p02.answer[0] !== cardData.p02.solution[0]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
        />
      </TD>
      <TD></TD>
    </>
  );

  const math: IMath = {
    caption: '세로셈',
    math: ['492', '+', '194'],
    bgColors: bgColors,
    th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
    td: [
      ['2', '9', '4', ''],
      ['4', '9', '1', '+'],
    ],
    input: content,
    superScript: [
      { value: isDisplaySuperscript ? '1' : '', left: '455px' },
      { value: '', left: '508px' },
      { value: '', left: '558px' },
    ],
  };

  const answer: IAnswer = {
    answer: cardData.p02.solution,
    description: [
      '- 일의 자리끼리 더하면 $2+4=6$이므로 일의 자리에 6을 씁니다.',
      '- 십의 자리끼리 더하면 $9+9=18$이므로 십의 자리에 8을 쓰고, 백의 자리에 1을 받아올림합니다.',
      '- 백의 자리끼리 더할 때 십의 자리에서 받아올림한 1도 더하면 $1+4+1=6$이므로 백의 자리에 6을 씁니다.',
    ],
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
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
      isSubmitted && setBgColors(['blue', 'red', 'green']);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isNumber(value)) {
      const newData = [...cardData.p02.answer];
      newData[index] = value;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: newData } }));
      changeData(pageNo, 1, 1, newData);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (!cardData.p02.isSubmitted && cardData.p02.answer[2] === cardData.p02.solution[2]) {
      inputRef1.current?.focus();
      setBgColors(['blue', 'red']);
    }
    if (!cardData.p02.isSubmitted && cardData.p02.answer[1] === cardData.p02.solution[1]) {
      inputRef2.current?.focus();
      setBgColors(['blue', 'red', 'green']);
      setDisplaySuperscript(true);
    }
  }, [cardData.p02.answer]);

  return (
    <EM00402
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      math={math}
      value={cardData.p02.answer}
      answer={answer}
      submitted={cardData.p02.isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P02;
