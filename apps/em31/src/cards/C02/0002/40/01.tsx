import { Box, IQuestionProps, Typography, Input, InputStatus, Label, SvgIcon } from '@maidt-cntn/ui';
import EM0100101 from '@maidt-cntn/math/pages/EM-010-01-01';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C02_0002_40 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useEffect } from 'react';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const pageNumber = 'P01';
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02_0002_40);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: { value1: userSubmissionList[0].inputData[0]?.value } || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? { value1: userSubmissionList[0].inputData[0]?.isCorrect } : { value1: false },
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const submitAnswer = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: { value1: isCorrect } } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value1,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!isNumber(value)) return;

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
        <SvgIcon src={headerIcon} size='36px' />
        그림에서 곧은 선은 모두 몇 개인가요?
      </>
    ),
    mark: cardData[pageNumber].isSubmitted
      ? Object.keys(cardData[pageNumber].isCorrect).every((key: string) => cardData[pageNumber].isCorrect[key])
        ? 'correct'
        : 'incorrect'
      : 'none',
  };

  const imageInfo = {
    altText:
      '바다 위의 배가 그려진 그림입니다. 바다는 구불구불한 물결 모양, 배의 하단과 상단은 각각 3개의 반듯한 선으로 그려져 있고, 배의 창문들은 원으로 그려진 그림입니다.',
    imageSrc: '/C02/0002/40/DEC312005.png',
    imageHeight: '360px',
  };
  const inputNode: React.ReactNode = (
    <Box style={{ display: 'flex', width: '1000px' }} hAlign={'flex-end'} vAlign='center'>
      <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
      <Input
        title='답 입력란'
        ariaLabel={'답란'}
        marginLeft={8}
        maxLength={3}
        width='80px'
        name={'value1'}
        value={cardData[pageNumber].answer.value1}
        onChange={handleInputChangeEvent}
        status={
          cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value1
            ? InputStatus.ERROR
            : isNotEmptyString(cardData[pageNumber].answer.value1)
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        readOnly={cardData[pageNumber].isSubmitted}
      />
      <Typography>개</Typography>
    </Box>
  );
  const commentImageInfo = {
    altText: '배의 하단에 있는 3개의 반듯한 선과 상단에 있는 3개의 반듯한 선에 빨간 선으로 표시된 그림입니다.',
    imageSrc: '/C02/0002/40/DEC312005(sol).png',
    imageHeight: '150px',
  };
  const commentary = '구부러지거나 휘어지지 않고 반듯한 선을 모두 찾습니다.';

  return (
    <EM0100101
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      answers={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      inputNode={inputNode}
      commentImageInfo={commentImageInfo}
      commentary={commentary}
      isSubmitted={cardData[pageNumber].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;
