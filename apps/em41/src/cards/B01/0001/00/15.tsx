import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, IQuestionProps, Input, InputStatus, Label, Typography } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';
import EM04101 from '@maidt-cntn/math/pages/EM-041-01';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P15 = () => {
  const pageKey = 'P15';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  type IImageInfoType = {
    margin: string;
    imageSrc: string;
    alt: string;
    width: string;
    height: string;
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='15' type='icon' />
        지름은 몇 cm인가요?
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect.every(value => value) ? 'correct' : 'incorrect') : 'none',
  };

  const imageInfo: IImageInfoType[] = [
    {
      margin: '',
      imageSrc: cardData[pageKey].imageSrc,
      alt: cardData[pageKey].imageAlt,
      width: '200px',
      height: '200px',
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageKey, mainKey, subKey, userInputs);
  };

  const answerNode = (
    <Box>
      <Input
        type='number'
        width='120px'
        ariaLabel='답의 입력란'
        marginLeft={8}
        name={'value'}
        value={cardData[pageKey].answer.value.toString()}
        onChange={handleInputChangeEvent}
        readOnly={cardData[pageKey].isSubmitted}
        status={
          cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect[0]
            ? InputStatus.ERROR
            : cardData[pageKey].isSubmitted
            ? InputStatus.ENABLE
            : isNotEmptyString(cardData[pageKey].answer.value)
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
      />
      <Typography>cm</Typography>
    </Box>
  );
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
  const submitAnswer = (state: boolean[]) => {
    const isCorrect = state.every(val => val);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: state } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answer.value,
            isAnswer: true,
            isCorrect: state[0],
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: {
              value: userSubmissionList[0].inputData[0].value,
            },
            isCorrect: [userSubmissionList[0].inputData[0].isCorrect],
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <EM04101
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      answerNode={answerNode}
      answer={cardData[pageKey].answer}
      solution={cardData[pageKey].solution}
      commentary={cardData[pageKey].commentary}
      onSubmit={submitAnswer}
      submitType={'marking'}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P15;
