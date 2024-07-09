import EM00401, { IMath, IAnswer } from '@maidt-cntn/math/pages/EM-004-01';
import { IQuestionProps, Input, TD, TMainHeaderInfoTypes, InputStatus } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0002_06 } from './store';
import { isNumber, isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0002_06);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: <>계산해 보세요.</>,
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (isNumber(value)) {
      // 숫자만 허용
      const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
      const newData = currentAnswer.map((row, rIndex) => (rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row));
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
      changeData('P01', 1, 1, newData);
    }
  };

  const content = (
    <>
      <TD>
        <Input
          value={cardData.p01.answer[0][2]}
          onChange={event => handleChange(0, 2, event.target.value)}
          ariaLabel='백의 자리의 값'
          maxLength={1}
          readOnly={cardData.p01.isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData.p01.answer[0][2])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][2], cardData.p01.solution[0][2])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={103}
        />
      </TD>
      <TD>
        <Input
          value={cardData.p01.answer[0][1]}
          onChange={event => handleChange(0, 1, event.target.value)}
          ariaLabel='십의 자리의 값'
          maxLength={1}
          readOnly={cardData.p01.isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData.p01.answer[0][1])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][1], cardData.p01.solution[0][1])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={102}
        />
      </TD>
      <TD>
        <Input
          value={cardData.p01.answer[0][0]}
          onChange={event => handleChange(0, 0, event.target.value)}
          ariaLabel='일의 자리의 값'
          maxLength={1}
          readOnly={cardData.p01.isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData.p01.answer[0][0])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][0], cardData.p01.solution[0][0])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={101}
        />
      </TD>
      <TD></TD>
    </>
  );

  const content2 = (
    <>
      <TD>
        <Input
          value={cardData.p01.answer[1][2]}
          onChange={event => handleChange(1, 2, event.target.value)}
          ariaLabel='백의 자리의 값'
          maxLength={1}
          readOnly={cardData.p01.isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData.p01.answer[1][2])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][2], cardData.p01.solution[1][2])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={107}
        />
      </TD>
      <TD>
        <Input
          value={cardData.p01.answer[1][1]}
          onChange={event => handleChange(1, 1, event.target.value)}
          ariaLabel='십의 자리의 값'
          maxLength={1}
          readOnly={cardData.p01.isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData.p01.answer[1][1])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][1], cardData.p01.solution[1][1])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={106}
        />
      </TD>
      <TD>
        <Input
          value={cardData.p01.answer[1][0]}
          onChange={event => handleChange(1, 0, event.target.value)}
          ariaLabel='일의 자리의 값'
          maxLength={1}
          readOnly={cardData.p01.isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData.p01.answer[1][0])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][0], cardData.p01.solution[1][0])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={105}
        />
      </TD>
      <TD></TD>
    </>
  );

  const math: IMath[] = [
    {
      caption: '세로셈',
      math: ['721', '+', '111'],
      th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
      td: [
        ['1', '2', '7', ''],
        ['1', '1', '1', '+'],
      ],
      input: content,
      typo: '103 + 661 =',
      typoInput: (
        <Input
          width='130px'
          value={cardData.p01.answer[2][0]}
          onChange={event => handleChange(2, 0, event.target.value)}
          ariaLabel='103+661의 값'
          status={
            isNotEmptyString(cardData.p01.answer[2][0])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[2][0], cardData.p01.solution[2][0])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          readOnly={cardData.p01.isSubmitted ? true : false}
          tabIndex={104}
        />
      ),
    },
    {
      caption: '세로셈',
      math: ['584', '+', '200'],
      th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
      td: [
        ['4', '8', '5', ''],
        ['0', '0', '2', '+'],
      ],
      input: content2,
      typo: '140 + 538 = ',
      typoInput: (
        <Input
          width='130px'
          value={cardData.p01.answer[3][0]}
          onChange={event => handleChange(3, 0, event.target.value)}
          ariaLabel='140+538의 값'
          status={
            isNotEmptyString(cardData.p01.answer[3][0])
              ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[3][0], cardData.p01.solution[3][0])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={108}
        />
      ),
    },
  ];

  const answers: IAnswer[] = [
    {
      answer: ['8', '3', '2'],
      description: {
        caption: '세로셈',
        math: ['721', '+', '111'],
        th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
        td: [
          ['1', '2', '7', ''],
          ['1', '1', '1', '+'],
        ],
        tfoot: ['2', '3', '8', ''],
      },
    },
    {
      answer: ['7', '8', '4'],
      description: {
        caption: '세로셈',
        math: ['584', '+', '200'],
        th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
        td: [
          ['4', '8', '5', ''],
          ['0', '0', '2', '+'],
        ],
        tfoot: ['4', '8', '7', ''],
      },
    },
    {
      answer: ['764'],
      description: {
        caption: '세로셈',
        math: ['301', '+', '166'],
        th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
        td: [
          ['3', '0', '1', ''],
          ['1', '6', '6', '+'],
        ],
        tfoot: ['4', '6', '7', ''],
      },
    },
    {
      answer: ['678'],
      description: {
        caption: '세로셈',
        math: ['140', '+', '538'],
        th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
        td: [
          ['0', '4', '1', ''],
          ['8', '3', '5', '+'],
        ],
        tfoot: ['8', '7', '6', ''],
      },
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [['', '', ''], ['', '', ''], [''], ['']],
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
    }
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

  return (
    <EM00401
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      math={math}
      value={cardData.p01.answer}
      answers={answers}
      onSubmit={onSubmit}
      submitted={cardData.p01.isSubmitted}
    />
  );
};

export default P01;
