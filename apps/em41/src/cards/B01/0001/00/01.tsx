import EM00401, { IMath, IAnswer } from '@maidt-cntn/math/pages/EM-004-01';
import { IQuestionProps, Input, TD, TMainHeaderInfoTypes, InputStatus, Label } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B01_0001_00 } from './store';
import { isNumber, isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const pageNumber = 'P01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        계산해 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (isNumber(value)) {
      // 숫자만 허용
      const currentAnswer = Array.isArray(cardData[pageNumber].answer) ? cardData[pageNumber].answer : [];
      const newData = currentAnswer.map((row, rIndex) => (rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row));
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: newData } }));
      changeData(pageNumber, 1, 1, newData);
    }
  };

  const content = (
    <>
      <TD>
        <Input
          value={cardData[pageNumber].answer[0][2]}
          onChange={event => handleChange(0, 2, event.target.value)}
          ariaLabel='일의 자리의 값'
          maxLength={1}
          readOnly={cardData[pageNumber].isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData[pageNumber].answer[0][2])
              ? !cardData[pageNumber].isSubmitted || isAnswer(cardData[pageNumber].answer[0][2], cardData[pageNumber].solution[0][2])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={101}
        />
      </TD>
      <TD>
        <Input
          value={cardData[pageNumber].answer[0][1]}
          onChange={event => handleChange(0, 1, event.target.value)}
          ariaLabel='십의 자리의 값'
          maxLength={1}
          readOnly={cardData[pageNumber].isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData[pageNumber].answer[0][1])
              ? !cardData[pageNumber].isSubmitted || isAnswer(cardData[pageNumber].answer[0][1], cardData[pageNumber].solution[0][1])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={102}
        />
      </TD>
      <TD>
        <Input
          value={cardData[pageNumber].answer[0][0]}
          onChange={event => handleChange(0, 0, event.target.value)}
          ariaLabel='백의 자리의 값'
          maxLength={1}
          readOnly={cardData[pageNumber].isSubmitted ? true : false}
          status={
            isNotEmptyString(cardData[pageNumber].answer[0][0])
              ? !cardData[pageNumber].isSubmitted || isAnswer(cardData[pageNumber].answer[0][0], cardData[pageNumber].solution[0][0])
                ? InputStatus.ENABLE
                : InputStatus.ERROR
              : InputStatus.DEFAULT
          }
          tabIndex={103}
        />
      </TD>
      <TD></TD>
    </>
  );

  const math: IMath[] = [
    {
      caption: '세로셈',
      math: ['635', '+', '229'],
      th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
      td: [
        ['5', '3', '6', ''],
        ['9', '2', '2', '+'],
      ],
      input: content,
    },
  ];

  const answers: IAnswer[] = [
    {
      answer: ['8', '6', '4'],
      description: {
        caption: '세로셈',
        math: ['635', '+', '229'],
        th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
        td: [
          ['', '1', '', ''],
          ['5', '3', '6', ''],
          ['9', '2', '2', '+'],
        ],
        tfoot: ['4', '6', '8', ''],
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
          value: [['', '', '']],
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = (result: boolean) => {
    const isCorrect = result;
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageNumber].answer,
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
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
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

  return (
    <EM00401
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      math={math}
      value={cardData[pageNumber].answer}
      answers={answers}
      onSubmit={onSubmit}
      submitted={cardData[pageNumber].isSubmitted}
      from={'EM41'}
    />
  );
};

export default P01;
