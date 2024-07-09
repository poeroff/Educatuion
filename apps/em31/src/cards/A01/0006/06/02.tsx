import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { TMainHeaderInfoTypes, Label, IQuestionProps, Input, TD, InputStatus } from '@maidt-cntn/ui';
import { MathExpression } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0006_06 } from './store';
import { getMarking, isNumber } from '@maidt-cntn/util/CommonUtil';
import EM00402, { IMath, IAnswer, TBgColors } from '@maidt-cntn/math/pages/EM-004-02';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0006_06);
  const { userId } = useRecoilValue(studentAtom);

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [isDisplaySuperscript1, setDisplaySuperscript1] = useState<boolean>(false);
  const [isDisplaySuperscript2, setDisplaySuperscript2] = useState<boolean>(false);
  const [isDisplaySuperscript3, setDisplaySuperscript3] = useState<boolean>(false);
  const [bgColors, setBgColors] = useState<TBgColors[]>([]);

  const pageNumber = 'P02';
  const pageKey = 'p02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '491-218 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />
        491-218을 계산하는 방법을 알아보세요.
      </>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const handleDisabled = (index: number) => {
    if (cardData[pageKey].answer[index + 1] === cardData[pageKey].solution[index + 1]) {
      if (cardData[pageKey].answer[index] === cardData[pageKey].solution[index]) {
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
          value={cardData[pageKey].answer[2]}
          onChange={event => handleChange(2, event.target.value)}
          onClick={() => {
            !cardData[pageKey].answer[1] && cardData[pageKey].answer[2] !== cardData[pageKey].solution[2] && setBgColors(['blue']);
            setDisplaySuperscript1(true);
          }}
          title='일의자리, 답'
          maxLength={1}
          readOnly={cardData[pageKey].isSubmitted || cardData[pageKey].answer[2] === cardData[pageKey].solution[2]}
          status={
            !cardData[pageKey].isSubmitted
              ? InputStatus.DEFAULT
              : cardData[pageKey].answer[2] !== cardData[pageKey].solution[2]
              ? InputStatus.ERROR
              : InputStatus.DEFAULT
          }
        />
      </TD>
      <TD>
        <Input
          value={cardData[pageKey].answer[1]}
          onChange={event => handleChange(1, event.target.value)}
          title='십의자리, 답'
          maxLength={1}
          readOnly={cardData[pageKey].isSubmitted || handleDisabled(1)}
          inputRef={inputRef1}
          status={
            !cardData[pageKey].isSubmitted
              ? InputStatus.DEFAULT
              : cardData[pageKey].answer[1] !== cardData[pageKey].solution[1]
              ? InputStatus.ERROR
              : InputStatus.DEFAULT
          }
        />
      </TD>
      <TD>
        <Input
          value={cardData[pageKey].answer[0]}
          onChange={event => handleChange(0, event.target.value)}
          title='백의자리, 답'
          maxLength={1}
          readOnly={cardData[pageKey].isSubmitted || handleDisabled(0)}
          inputRef={inputRef2}
          status={
            !cardData[pageKey].isSubmitted
              ? InputStatus.DEFAULT
              : cardData[pageKey].answer[0] !== cardData[pageKey].solution[0]
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
    math: ['491', '-', '218'],
    bgColors: bgColors,
    th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
    td: [
      ['1', '9', '4', ''],
      ['8', '1', '2', '-'],
    ],
    input: content,
    superScript: [
      { value: '', left: '455px' },
      { value: isDisplaySuperscript2 ? '8' : '', left: '508px' },
      { value: isDisplaySuperscript1 ? '10' : '', left: '558px' },
    ],
    incorrectMark: [
      [false, isDisplaySuperscript2, false, false],
      [false, false, false, false],
    ],
  };

  const answer: IAnswer = {
    answer: cardData[pageKey].solution,
    description: [
      '- 일의 자리 수 1에서 8을 뺄 수 없으므로 십의 자리에서 받아내림하여 계산합니다. 십의 자리 수 9를 지우고 8로 표시한 다음 일의 자리 위에 10을 쓰고, $10+1=11$에서 8을 빼면 $11-8=3$이므로 일의 자리에 3을 씁니다.',
      '- 십의 자리는 9에서 일의 자리로 받아내림하고 8이 남았으므로 $8-1=7$, 십의 자리에 7을 씁니다.',
      '- 백의 자리끼리 빼면 $4-2=2$이므로 백의 자리에 2를 씁니다.',
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
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
      isSubmitted && setBgColors(['blue', 'red', 'green']);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isNumber(value)) {
      const newData = [...cardData[pageKey].answer];
      newData[index] = value;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
      changeData(pageNumber, 1, 1, newData);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (!cardData[pageKey].isSubmitted && cardData[pageKey].answer[2] === cardData[pageKey].solution[2]) {
      inputRef1.current?.focus();
      setBgColors(['blue', 'red']);
      setDisplaySuperscript2(true);
    }
    if (!cardData[pageKey].isSubmitted && cardData[pageKey].answer[1] === cardData[pageKey].solution[1]) {
      inputRef2.current?.focus();
      setBgColors(['blue', 'red', 'green']);
      setDisplaySuperscript3(true);
    }
  }, [cardData[pageKey].answer]);

  return (
    <EM00402
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      math={math}
      value={cardData[pageKey].answer}
      answer={answer}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P02;
