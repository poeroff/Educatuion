import { Box, IQuestionProps, Typography, Input, InputStatus, BoxWrap, Image, SvgIcon } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C02_0002_52 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import React, { ChangeEvent, useEffect } from 'react';
import EM03901 from '@maidt-cntn/math/pages/EM-039-01';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const pageNumber = 'P01';
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02_0002_52);

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
            answer:
              {
                value1: userSubmissionList[0].inputData[0]?.value,
                value2: userSubmissionList[0].inputData[1]?.value,
                value3: userSubmissionList[0].inputData[2]?.value,
              } || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const submitAnswer = (isCorrect: boolean[]) => {
    const isCorrectAll = isCorrect.every(value => value);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrectAll } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value1,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value2,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value3,
          },
        ],
        isCorrect: isCorrectAll,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrectAll);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

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
        굽은 선을 모두 찾아 기호를 써 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const imageInfo = {
    altText:
      '가는 반듯한 선, 나는 구부러진 선, 다는 반듯한 선, 라는 물결 모양으로 구부러진 선, 마는 s 모양으로 구부러진 선, 바는 반듯한 선으로 그려진 그림입니다.',
    imageSrc: '/C02/0002/52/DEC312004.png',
    imageWidth: '750px',
  };
  const questionNode = (
    <Box vAlign='center' flexDirection='column'>
      <Image src={imageInfo.imageSrc} width={imageInfo?.imageWidth} alt={imageInfo.altText} />
    </Box>
  );

  const inputNode: React.ReactNode = (
    <BoxWrap justifyContent={'flex-end'}>
      <Box style={{ display: 'flex', width: '1000px' }} hAlign={'flex-end'} vAlign='center'>
        <Input
          title='답 입력란'
          ariaLabel={'1번 답란'}
          marginLeft={8}
          maxLength={1}
          width='52px'
          name={'value1'}
          value={cardData[pageNumber].answer.value1}
          onChange={handleInputChangeEvent}
          status={
            cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
              ? InputStatus.ERROR
              : isNotEmptyString(cardData[pageNumber].answer.value1)
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          readOnly={cardData[pageNumber].isSubmitted}
        />
        <Typography>, </Typography>
        <Input
          title='답 입력란'
          ariaLabel={'2번 답란'}
          marginLeft={8}
          maxLength={1}
          width='52px'
          name={'value2'}
          value={cardData[pageNumber].answer.value2}
          onChange={handleInputChangeEvent}
          status={
            cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
              ? InputStatus.ERROR
              : isNotEmptyString(cardData[pageNumber].answer.value2)
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          readOnly={cardData[pageNumber].isSubmitted}
        />
        <Typography>, </Typography>
        <Input
          title='답 입력란'
          ariaLabel={'3번 답란'}
          marginLeft={8}
          maxLength={1}
          width='52px'
          name={'value3'}
          value={cardData[pageNumber].answer.value3}
          onChange={handleInputChangeEvent}
          status={
            cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
              ? InputStatus.ERROR
              : isNotEmptyString(cardData[pageNumber].answer.value3)
              ? InputStatus.ENABLE
              : InputStatus.DEFAULT
          }
          readOnly={cardData[pageNumber].isSubmitted}
        />
      </Box>
    </BoxWrap>
  );
  const commentary = '굽은 선은 구부러지거나 휘어진 선입니다.';

  return (
    <EM03901
      questionInfo={questionInfo}
      questionNode={questionNode}
      questionNodeWidth={'800px'}
      answerNode={inputNode}
      answer={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      multipleAnswer={true}
      commentary={commentary}
      isSubmitted={cardData[pageNumber].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;
