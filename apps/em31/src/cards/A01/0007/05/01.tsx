import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { TMainHeaderInfoTypes, Label, IQuestionProps, Input, TD, InputStatus } from '@maidt-cntn/ui';
import { MathExpression } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getMarking, isNumber } from '@maidt-cntn/util/CommonUtil';
import EM00402, { IMath, IAnswer, TBgColors } from '@maidt-cntn/math/pages/EM-004-02';
import { A01_0007_05 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0007_05);
  const { userId } = useRecoilValue(studentAtom);

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [isDisplaySuperscript1, setDisplaySuperscript1] = useState<boolean>(false);
  const [isDisplaySuperscript2, setDisplaySuperscript2] = useState<boolean>(false);
  const [bgColors, setBgColors] = useState<TBgColors[]>([]);

  const pageNumber = 'P01';
  const pageKey = 'p01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$325 - 168$ 계산하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />
        <MathExpression equation={'$325 - 168$ 을 계산하는 방법을 알아보세요.'} />
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
          ariaLabel='일의자리, 답'
          maxLength={1}
          readOnly={cardData[pageKey].isSubmitted || cardData[pageKey].answer[2] === cardData[pageKey].solution[2]}
          status={!cardData[pageKey].isSubmitted ? InputStatus.ENABLE : cardData[pageKey].isCorrect ? InputStatus.DEFAULT : InputStatus.ERROR}
        />
      </TD>
      <TD>
        <Input
          value={cardData[pageKey].answer[1]}
          onChange={event => handleChange(1, event.target.value)}
          ariaLabel='십의자리, 답'
          maxLength={1}
          readOnly={cardData[pageKey].isSubmitted || handleDisabled(1)}
          inputRef={inputRef1}
          status={!cardData[pageKey].isSubmitted ? InputStatus.ENABLE : cardData[pageKey].isCorrect ? InputStatus.DEFAULT : InputStatus.ERROR}
        />
      </TD>
      <TD>
        <Input
          value={cardData[pageKey].answer[0]}
          onChange={event => handleChange(0, event.target.value)}
          ariaLabel='백의자리, 답'
          maxLength={1}
          readOnly={cardData[pageKey].isSubmitted || handleDisabled(0)}
          inputRef={inputRef2}
          status={!cardData[pageKey].isSubmitted ? InputStatus.ENABLE : cardData[pageKey].isCorrect ? InputStatus.DEFAULT : InputStatus.ERROR}
        />
      </TD>
      <TD></TD>
    </>
  );

  const math: IMath = {
    caption: '세로셈',
    math: ['325', '-', '168'],
    bgColors: bgColors,
    th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
    td: [
      ['5', '2', '3', ''],
      ['8', '6', '1', '-'],
    ],
    input: content,
    superScript: isDisplaySuperscript1
      ? [
          { value: isDisplaySuperscript2 ? '2' : '', left: '455px' },
          { value: isDisplaySuperscript2 ? '11' : '1', left: '508px' },
          { value: isDisplaySuperscript1 ? '10' : '', left: '558px' },
        ]
      : [
          { value: '', left: '' },
          { value: '', left: '' },
          { value: '', left: '' },
        ],
    incorrectMark: isDisplaySuperscript1
      ? [
          [false, true, isDisplaySuperscript2 ? true : false, false],
          [false, false, false, false],
        ]
      : [
          [false, false, false],
          [false, false, false],
        ],
  };

  const answer: IAnswer = {
    answer: cardData[pageKey].solution,
    description: [
      '- 일의 자리 수 5에서 8을 뺄 수 없으므로 십의 자리에서 받아내림하여 계산합니다. 십의 자리 수 2을 지우고 1을 표시한 다음 일의 자리 위에 10을 쓰고, $10+5=15$에서 8을 빼면 $13-8=7$이므로 일의 자리에 7을 씁니다.',
      '- 십의 자리는 남은 1에서 6을 뺄 수 없으므로 백의 자리에서 받아내림하여 계산합니다. 백의 자리 수 3을 지우고 2를 표시한 다음 십의 자리 위에 10을 쓰고, $10+1=11$에서 6을 빼면 $11-6=5$이므로 십의 자리에 5를 씁니다.',
      '- 백의 자리는 3에서 십의 자리로 받아내림하고 2가 남았으므로 $2-1=1$, 백의 자리에 1을 씁니다.',
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

        setDisplaySuperscript1(userSubmissionList[0].inputData[0]?.value[2]);
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

export default P01;
