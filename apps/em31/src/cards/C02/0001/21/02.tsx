import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  IQuestionProps,
  List,
  Radio,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C02000121_store } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import isCorrect from '@maidt-cntn/assets/icons/checkSymbol_O.svg';
import isWrong from '@maidt-cntn/assets/icons/checkSymbol_X.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNumber = 'P02';
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02000121_store);

  const [isShow, setIsShow] = useState<boolean>(false);
  const isDisabled = Object.keys(cardData[pageNumber].answer).some(key => !cardData[pageNumber].answer[key]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isCorrect: false,
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
              { value1: userSubmissionList[0].inputData[0]?.value, value2: userSubmissionList[0].inputData[1]?.value } || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted
              ? { value1: userSubmissionList[0].inputData[0]?.isCorrect, value2: userSubmissionList[0].inputData[1]?.isCorrect }
              : { value1: false, value2: false },
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const submitAnswer = () => {
    if (cardData[pageNumber].isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const result = isCorrectAnswer(cardData[pageNumber].answer, cardData[pageNumber].solution);

    setCardData(prev => ({
      ...prev,
      [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: { value1: result[0], value2: result[1] } },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value1,
            isCorrect: result[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value2,
            isCorrect: result[1],
          },
        ],
        isCorrect: result.every((correct: boolean) => correct),
      },
    ];
    submitDataWithResult(
      pageNumber,
      userSubmission,
      result.every((correct: boolean) => correct),
    );
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
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size={'36px'} />
        <Typography>그림을 보고 알맞은 말을 고르세요.</Typography>
      </Box>
    ),
    mark: cardData[pageNumber].isSubmitted
      ? Object.keys(cardData[pageNumber].isCorrect).every((key: string) => cardData[pageNumber].isCorrect[key])
        ? 'correct'
        : 'incorrect'
      : 'none',
  };

  const imageInfo = {
    altText: '사각형에서 기억은 두 곧은 선이 만나는 점을, 니은은 곧은 선을 가리키고 있는 그림입니다.',
    imageSrc: '/C02/0001/21/DEC312I04.png',
    imageHeight: '150px',
  };

  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
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

  const isCorrectAnswer = (inputs: { [key: string]: string }, answers: { [key: string]: string }) => {
    return Object.keys(inputs).map(key => isAnswer(removeSpaces(inputs[key]), removeSpaces(answers[key])));
  };

  const commentary = '사각형에서 곧은 선은 변, 두 곧은 선이 만나는 점은 꼭짓점입니다.';

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={submitAnswer}
      useRound
    >
      <Box useRound tabIndex={101} useFull>
        <Box vAlign='center' flexDirection='column'>
          <Box marginTop={'20px'} padding='24px 12px' type='line' justifyContent='space-between' hAlign='center' useRound>
            <Image src={imageInfo.imageSrc} height={imageInfo?.imageHeight} alt={imageInfo.altText} />
          </Box>
        </Box>
        <Box hAlign='center' marginTop='20px' flexDirection='column' marginBottom='20px'>
          <Box width={'100%'} marginTop={24} padding='20px 2px 20px 2px' type='dashed' useRound useFull>
            <Typography usePre>
              위의 도형에서 ㉠을 (
              <Box display={'inline-block'}>
                <List
                  align={'horizontal'}
                  data={['꼭짓점', '변']}
                  row={val => (
                    <>
                      <Radio
                        name='value1'
                        type='box'
                        label={val.value}
                        value={val.value === cardData[pageNumber].answer.value1}
                        onClick={handleChange}
                        readOnly={cardData[pageNumber].isSubmitted}
                        ariaLabel={`1번째 답의 ${val.index}번 보기`}
                        isError={cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value1}
                      >
                        {val.value}
                      </Radio>
                      {val.index === 1 && <Typography useGap={false}>,</Typography>}
                    </>
                  )}
                />
              </Box>
              &nbsp;) 이라 하고, ㉡을 (&nbsp;
              <Box display={'inline-block'}>
                <List
                  align={'horizontal'}
                  data={['꼭짓점', '변']}
                  row={val => (
                    <>
                      <Radio
                        name='value2'
                        type='box'
                        label={val.value}
                        value={val.value === cardData[pageNumber].answer.value2}
                        onClick={handleChange}
                        readOnly={cardData[pageNumber].isSubmitted}
                        ariaLabel={`2번째 답의 ${val.index}번 보기`}
                        isError={cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value2}
                      >
                        {val.value}
                      </Radio>
                      {val.index === 1 && <Typography useGap={false}>,</Typography>}
                    </>
                  )}
                />
              </Box>
              &nbsp;) <br /> 이라고 합니다.
            </Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {Object.keys(cardData[pageNumber].solution)
                .map(key => cardData[pageNumber].solution[key])
                .join(', ')}
            </Typography>
          </Box>
          <Box marginTop={'40px'}>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop='12px'>
              <Typography usePre>{commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
