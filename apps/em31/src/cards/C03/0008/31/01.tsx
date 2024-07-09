import { useEffect, useState } from 'react';
import {
  Image,
  Box,
  Typography,
  Input,
  IQuestionProps,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  SvgIcon,
  TextView,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNumber, isAnswer, isNotEmptyString, areArraysEqualIgnoringCaseAndWhitespace } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0008_31 } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0008_31);
  const [isShow, setShow] = useState<boolean>(false);
  const valueArray = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [[]];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        <Typography>그림을 보고 곱셈식과 나눗셈식으로 나타내 보세요.</Typography>
      </Box>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
          ],
          isAnswer: true,
        },
      ],
    },
  ];

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (isNumber(value)) {
      const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
      const newData = currentAnswer.map((row, rIndex) => (rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row));
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
      changeData('P01', 1, 1, newData);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
    } else if (cardData.p01.answer.every(subArray => subArray.every(isNotEmptyString))) {
      const isCorrect = cardData.p01.answer.every((subArray, rowIndex) => {
        if (subArray.length !== cardData.p01.solution[rowIndex].length) {
          return false;
        }
        return areArraysEqualIgnoringCaseAndWhitespace(subArray, cardData.p01.solution[rowIndex]);
      });
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
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
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
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitBtnColor={
        valueArray.every(subArray => subArray.every(isNotEmptyString))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.GRAY
      }
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!valueArray.every(subArray => subArray.every(isNotEmptyString))}
      onSubmit={handleSubmit}
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='20px 44px' type='line' useRound>
          <Image src='/C03/0008/31/DEC313M02.png' alt='야구공이 7개씩 3줄 그려진 그림입니다.' width={'590px'} height={'215px'} />
        </Box>
        <Box useFull flexDirection='row'>
          <Box vAlign='center' alignItems='center' marginTop='24px' flexDirection='column'>
            <TextView title='곱셈식'>
              <Box flexDirection='row' hAlign='space-between' width={650}>
                <Box padding='8px 20px' hAlign='center' key={'multBox' + 1}>
                  <Typography>7 ×</Typography>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[0][0]}
                    onChange={e => {
                      handleChange(0, 0, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[0][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][0], cardData.p01.solution[0][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='곱셈식 첫번째 답안'
                  />
                  <Typography>=</Typography>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[0][1]}
                    onChange={e => {
                      handleChange(0, 1, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[0][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][1], cardData.p01.solution[0][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='곱셈식 두번째 답안'
                  />
                </Box>
                <Box padding='8px 20px' hAlign='center' key={'multBox' + 1}>
                  <Typography>3 ×</Typography>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[1][0]}
                    onChange={e => {
                      handleChange(1, 0, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[1][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][0], cardData.p01.solution[1][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='곱셈식 세번째 답안'
                  />
                  <Typography> = </Typography>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[1][1]}
                    onChange={e => {
                      handleChange(1, 1, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[1][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][1], cardData.p01.solution[1][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='곱셈식 네번째 답안'
                  />
                </Box>
              </Box>
            </TextView>
          </Box>
          <Box display='flex' flexDirection='column' marginTop='24px' alignItems='center'>
            <TextView title='나눗셈식'>
              <Box flexDirection='row' hAlign='space-between' width={650}>
                <Box padding='8px 20px' hAlign='center' key={'divBox' + 2}>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[2][0]}
                    onChange={e => {
                      handleChange(2, 0, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[2][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[2][0], cardData.p01.solution[2][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='나눗셈식 첫번째 답안'
                  />
                  <Typography>÷ 7 = </Typography>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[2][1]}
                    onChange={e => {
                      handleChange(2, 1, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[2][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[2][1], cardData.p01.solution[2][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='나눗셈식 두번째 답안'
                  />
                </Box>
                <Box padding='8px 20px' hAlign='center' key={'divBox' + 2}>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[3][0]}
                    onChange={e => {
                      handleChange(3, 0, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[3][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[3][0], cardData.p01.solution[3][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='나눗셈식 세번째 답안'
                  />
                  <Typography>÷ 3 = </Typography>
                  <Input
                    type={'number'}
                    width='76px'
                    value={cardData.p01.answer[3][1]}
                    onChange={e => {
                      handleChange(3, 1, e.target.value);
                    }}
                    status={
                      isNotEmptyString(cardData.p01.answer[3][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[3][1], cardData.p01.solution[3][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='나눗셈식 네번째 답안'
                  />
                </Box>
              </Box>
            </TextView>
          </Box>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>3, 21 / 7, 21 / 21, 3 / 21, 7</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>야구공이 7개씩 3줄이므로 7×3=21입니다.</Typography>
              <Typography>야구공이 3개씩 7줄이므로 3×7=21입니다.</Typography>
              <Typography>야구공 21개를 7개씩 묶으면 3묶음이므로 21÷7=3입니다.</Typography>
              <Typography>야구공 21개를 3개씩 묶으면 7묶음이므로 21÷3=7입니다</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
