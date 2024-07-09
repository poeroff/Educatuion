import { Box, Input, InputStatus, IQuestionProps, Label, Typography } from '@maidt-cntn/ui';
import EM04101 from '@maidt-cntn/math/pages/EM-041-01';
import { ChangeEvent, useEffect } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const pageNumber = 'P06';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  type IImageInfoType = {
    margin: string;
    imageSrc: string;
    alt: string;
    width: string;
    height: string;
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];
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
    changeData(pageNumber, mainKey, subKey, userInputs);
  };

  const submitAnswer = (state: boolean[]) => {
    const isCorrect = state.every(val => val);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: mainKey,
        inputData: [
          {
            subKey: subKey,
            type: 'TEXT',
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='6' type='icon' />
        재민이는 감 14 개를 2 명에게 똑같이 나누어 주려고 합니다. 한 명에게 나누어 줄 수 있는 감은 몇 개인지 구해 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const answerNode = (
    <Box>
      <Input
        key={'value1'}
        name={'value1'}
        value={cardData[pageNumber].answer.value1}
        onChange={handleInputChangeEvent}
        width='150px'
        maxLength={15}
        ariaLabel='답란'
        readOnly={cardData[pageNumber].isSubmitted}
        status={
          cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
            ? InputStatus.ERROR
            : cardData[pageNumber].isSubmitted
            ? InputStatus.ENABLE
            : isNotEmptyString(cardData[pageNumber].answer.value1)
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
      />
      <Typography>개</Typography>
    </Box>
  );

  const imageInfo: IImageInfoType[] = [
    {
      imageSrc: '/B00/DJC410007.png',
      alt: '감이 14 개 들어있는 상자 그림입니다.',
      width: '200px',
      height: '200px',
      margin: '24px',
    },
  ];

  return (
    <EM04101
      questionInfo={questionInfo}
      answer={cardData[pageNumber].answer}
      imageInfo={imageInfo}
      answerNode={answerNode}
      solution={cardData[pageNumber].solution}
      isSubmitted={cardData[pageNumber].isSubmitted}
      submitType={'marking'}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
    />
  );
};

export default P06;
