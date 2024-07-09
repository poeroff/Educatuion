import { Box, IQuestionProps, Typography, Input, InputStatus, Label, SvgIcon } from '@maidt-cntn/ui';
import EM0100101 from '@maidt-cntn/math/pages/EM-010-01-01';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B02_0002_70 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import React, { ChangeEvent, useEffect } from 'react';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const pageNumber = 'P01';
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B02_0002_70);

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
        곧은 선은 굽은 선보다 몇 개 더 많은가요?
      </>
    ),
    mark: cardData[pageNumber].isSubmitted
      ? Object.keys(cardData[pageNumber].isCorrect).every((key: string) => cardData[pageNumber].isCorrect[key])
        ? 'correct'
        : 'incorrect'
      : 'none',
  };

  const imageInfo = {
    altText: '반듯한 선이 6개, 구부러진 선이 4개 그려진 그림입니다.',
    imageSrc: '/C02/0002/70/DIC312001.png',
    imageHeight: '300px',
    boxType: 'line',
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
  const commentary = '곧은 선은 6개이고, 굽은 선은 4개이므로 곧은 선은 굽은 선보다 $6-4=2$(개) 더 많습니다.';

  return (
    <EM0100101
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      answers={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      inputNode={inputNode}
      commentary={commentary}
      isSubmitted={cardData[pageNumber].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;
