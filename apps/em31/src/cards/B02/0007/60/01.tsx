import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Label, Typography, Image, Input, IQuestionProps, List, InputStatus } from '@maidt-cntn/ui';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { B02_0007_60 } from './store';
import { isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import EM03901 from '@maidt-cntn/math/pages/EM-039-01';

const P01 = () => {
  const pageNumber = 'P01';
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B02_0007_60);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [],
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
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
            type: 'TEXT_LIST',
            value: [
              { value: cardData[pageNumber].answer[0].value },
              { value: cardData[pageNumber].answer[1].value },
              { value: cardData[pageNumber].answer[2].value },
            ],
          },
        ],
        isCorrect: isCorrectAll,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrectAll);
  };

  const handleModalInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updateAnswers = cardData[pageNumber].answer.map((ans, idx) => (idx === index ? { value: removeSpaces(e.target.value) } : ans));
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: updateAnswers } }));
    changeData(pageNumber, 1, 1, updateAnswers);
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
        <Label type='icon' size='middle' value='1' />
        <Typography>직사각형을 모두 찾아 기호를 써 보세요.</Typography>
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const imageInfo = {
    altText:
      '모눈종이 위에 가, 나, 다, 라, 마, 바 6개의 사각형이 있고, 가, 나, 라는 네 각이 모두 직각인 사각형, 다는 두 각만 직각인 사각형, 마, 바는 네 각이 모두 직각이 아닌 사각형이 그려진 그림입니다.',
    imageSrc: '/C02/0007/20/EC31232.png',
    imageWidth: '798x',
    imageHeight: '201px',
  };

  const questionNode = (
    <Box vAlign='center' flexDirection='column'>
      <Image src={imageInfo.imageSrc} width={imageInfo?.imageWidth || '100%'} height={imageInfo?.imageHeight || '100%'} alt={imageInfo.altText} />
    </Box>
  );

  const inputNode: React.ReactNode = (
    <List align='horizontal' gap={0} data={cardData[pageNumber].answer}>
      {({ value, index = 1 }) => (
        <React.Fragment key={`list-item-${index}`}>
          <Input
            type='text'
            width='52px'
            value={value?.value}
            onChange={e => handleModalInputChangeEvent(e, index - 1)}
            maxLength={1}
            ariaLabel={`${index}번 답란`}
            status={
              cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
                ? InputStatus.ERROR
                : isNotEmptyString(cardData[pageNumber].answer[index - 1]?.value)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[pageNumber].isSubmitted}
          />
          {index !== cardData[pageNumber].answer.length && <Typography>,</Typography>}
        </React.Fragment>
      )}
    </List>
  );

  const [convertedInputs, setInputs] = useState<{ [key: string]: string }>({ value1: '', value2: '', value3: '' });

  useEffect(() => {
    const originAnswer = cardData[pageNumber].answer;
    const convertedInput = originAnswer.reduce((obj: { [key: string]: string }, item, index) => {
      obj[`value${index + 1}`] = item.value;
      return obj;
    }, {});
    setInputs(convertedInput);
  }, [cardData[pageNumber].answer]);

  const commentary = '직사각형은 네 각이 모두 직각인 사각형으로 3개 있습니다.';

  return (
    <EM03901
      questionInfo={questionInfo}
      questionNode={questionNode}
      questionBoxType={null}
      answerNode={inputNode}
      answer={convertedInputs}
      solution={cardData[pageNumber].solution}
      multipleAnswer={true}
      commentary={commentary}
      isSubmitted={cardData[pageNumber].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;
