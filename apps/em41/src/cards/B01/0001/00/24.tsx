import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, IQuestionProps, Input, Label, InputStatus, BoxWrap, Typography } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import EMA03602, { renderIcon } from '@maidt-cntn/math/pages/EMA-036-02';
const P24 = () => {
  const pageNumber = 'P24';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='24' type='icon' />
        {cardData[pageNumber].questionText}
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect.every(value => value) ? 'correct' : 'incorrect') : 'none',
  };

  const iconInfo = {
    bigIconSrc: '/B00/DJC410014-1.png',
    bigIconAlt: '10개를 나타내는 큰 곰인형 그림입니다.',
    bigIconW: '39px',
    bigIconH: '48px',
    smallIconSrc: '/B00/DJC410014-2.png',
    smallIconAlt: '1개를 나타내는 작은 곰인형 그림입니다.',
    smallIconW: '23px',
    smallIconH: '29px',
  };
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNumber(value)) {
      return;
    }
    const userInputs = {
      ...cardData[pageNumber].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const questionData = [
    ['반', '인형 수'],
    [
      '1반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderIcon(iconInfo, 'big', 1)}
        {renderIcon(iconInfo, 'small', 6)}
      </BoxWrap>,
    ],
    [
      '2반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderIcon(iconInfo, 'big', 3)}
      </BoxWrap>,
    ],
    [
      '3반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderIcon(iconInfo, 'big', 2)}
        {renderIcon(iconInfo, 'small', 3)}
      </BoxWrap>,
    ],
    [
      '4반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderIcon(iconInfo, 'big', 1)}
        {renderIcon(iconInfo, 'small', 2)}
      </BoxWrap>,
    ],
  ];
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];
  const submitAnswer = (state: boolean[]) => {
    const isCorrect = state.every(val => val);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: state } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value1,
            isAnswer: true,
            isCorrect: state[0],
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
            answer: {
              value1: userSubmissionList[0].inputData[0].value,
            },
            isCorrect: [userSubmissionList[0].inputData[0].isCorrect],
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const answerNode = (
    <Box>
      <Input
        width='98px'
        ariaLabel='입력란'
        marginLeft={8}
        maxLength={4}
        name={'value1'}
        value={cardData[pageNumber].answer.value1.toString()}
        onChange={handleInputChangeEvent}
        readOnly={cardData[pageNumber].isSubmitted}
        status={
          cardData[pageNumber].isSubmitted
            ? !cardData[pageNumber].isCorrect[0]
              ? InputStatus.ERROR
              : InputStatus.ENABLE
            : !isNotEmptyString(cardData[pageNumber].answer.value1)
            ? InputStatus.DEFAULT
            : InputStatus.ENABLE
        }
      />
      <Typography useGap={false}>반</Typography>
    </Box>
  );
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
    <EMA03602
      questionInfo={questionInfo}
      questionData={questionData}
      dataTitle={cardData[pageNumber].dataTitle}
      iconInfo={iconInfo}
      answerNode={answerNode}
      answer={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
      submitType={'marking'}
      isSubmitted={cardData[pageNumber].isSubmitted}
    />
  );
};

export default P24;
