import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, EStyleButtonTypes, IQuestionProps, Image, Input, InputStatus, Label, Typography, BottomSheet, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container, } from '@maidt-cntn/ui/math';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05001204_Atom } from './store';
``
const P06 = () => {
const { changeData, initData, submitDataWithResult, saveData } = usePageData();
const [showAnswer, setShowAnswer] = useState<boolean>(false);
const [cardData, setCardData] = useRecoilState(A05001204_Atom);
const pageIds = useRecoilValue(pageIdsAtom);
const { userId } = useRecoilValue(studentAtom);

const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='6' type='icon' />
        친구들이 놀이터에 도착한 시각입니다. 놀이터에 가장 먼저 도착한 친구와 도착한 시각을 구해 보세요.
      </>
    ),
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: '',
            isAnswer: true,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: '',
            isAnswer: true,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: '',
            isAnswer: true,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: '',
            isAnswer: true,
          },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
              ...prev.p06,
              answer1: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer1,
              answer2: userSubmissionList[0].inputData[1]?.value || cardData.p06.answer2,
              answer3: userSubmissionList[0].inputData[2]?.value || cardData.p06.answer3,
              answer4: userSubmissionList[0].inputData[3]?.value || cardData.p06.answer4,
              isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p06.isCorrect1,
              isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p06.isCorrect2,
              isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p06.isCorrect3,
              isCorrect4: userSubmissionList[0].inputData[3]?.isCorrect || cardData.p06.isCorrect4,
              isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
              isSubmitted,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p06.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = isAnswer(cardData.p06.answer1, cardData.p06.solution1);
      const isCorrect2 = isAnswer(cardData.p06.answer2, cardData.p06.solution2);
      const isCorrect3 = isAnswer(cardData.p06.answer3, cardData.p06.solution3);
      const isCorrect4 = isAnswer(cardData.p06.answer4, cardData.p06.solution4);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3, isCorrect4 } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
              {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p06.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
              },
              {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p06.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
              },
              {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p06.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
              },
              {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p06.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
              },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P06', userSubmission, isCorrect);
    }
  };

  const handleChange = (subKey: number, value: string) => {
      if (subKey === 1) {
        setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: value } }));
      } else if (subKey === 2) {
        setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer2: value } }));
      } else if (subKey === 3) {
        setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer3: value } }));
      } else if (subKey === 4) {
        setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer4: value } }));
      }
      changeData('P06', 1, subKey, value);
    };

  useEffect(() => {
    return () => {
      saveData('P06');
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
        headerInfo={null}
        questionInfo={questionInfo}
        background={'var(--color-white)'}
        onSubmit={handleSubmit}
        submitLabel={!cardData.p06.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
        submitDisabled={!(
            cardData.p06.answer1 &&
            cardData.p06.answer2 &&
            cardData.p06.answer3 &&
            cardData.p06.answer4
          )}
        submitBtnColor={
            !(
                cardData.p06.answer1 &&
                cardData.p06.answer2 &&
                cardData.p06.answer3 &&
                cardData.p06.answer4
              )
            ? EStyleButtonTypes.SECONDARY
            : !cardData.p06.isSubmitted || !showAnswer
            ? EStyleButtonTypes.YELLOW
            : EStyleButtonTypes.DEFAULT
        }
        useRound
        vAlign='start'
      >
      <Box hAlign='center' flexDirection='column'>
        <Box padding='24px 120px 12px' type='line' justifyContent='space-between' hAlign='center' useFull useRound>
          <Box hAlign='center' flexDirection='column'>
            <Image src='/A05/0012/04/MC31534.png' width='130px' alt='소연이의 도착 시각은 9시 9분 20초' />
            <Box marginTop='8px'>
              <Typography useGap={false}>소연</Typography>
            </Box>
          </Box>
          <Box hAlign='center' flexDirection='column'>
            <Image src='/A05/0012/04/MC31534-2.png' width='130px' alt='9시 13분 00초를 가리키고 있는 시계바늘' />
            <Box marginTop='8px'>
              <Typography useGap={false}>찬성</Typography>
            </Box>
          </Box>
          <Box hAlign='center' flexDirection='column'>
            <Image src='/A05/0012/04/MC31534-3.png' width='130px' alt='9시 11분 5초를 가리키고 있는 시계바늘' />
            <Box marginTop='8px'>
              <Typography useGap={false}>재진</Typography>
            </Box>
          </Box>
        </Box>
        <Box marginTop='12px'>
          <Box>
            <Typography lineHeight='48px'>가장 먼저 도착한 친구는</Typography>
            <Input width='98px' value={cardData.p06.answer1} onChange={event => handleChange(1, event.target.value)} status={
                  !isNotEmptyString(cardData.p06.answer1)
                    ? InputStatus.DEFAULT
                    : cardData.p06.isSubmitted && !isAnswer(cardData.p06.answer1, cardData.p06.solution1)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p06.isSubmitted} ariaLabel='가장 먼저 도착한 친구의 이름을 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              이고
            </Typography>
          </Box>
          <Box marginTop='8px'>
            <Typography lineHeight='48px'>도착한 시각은</Typography>
            <Input width='65px' value={cardData.p06.answer2} onChange={event => handleChange(2, event.target.value)} type='number' status={
                  !isNotEmptyString(cardData.p06.answer2)
                    ? InputStatus.DEFAULT
                    : cardData.p06.isSubmitted && !isAnswer(cardData.p06.answer2, cardData.p06.solution2)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p06.isSubmitted} ariaLabel='도착한 시간을 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              시
            </Typography>
            <Input width='65px' marginLeft={12} value={cardData.p06.answer3} onChange={event => handleChange(3, event.target.value)} type='number' status={
                  !isNotEmptyString(cardData.p06.answer3)
                    ? InputStatus.DEFAULT
                    : cardData.p06.isSubmitted && !isAnswer(cardData.p06.answer3, cardData.p06.solution3)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p06.isSubmitted} ariaLabel='도착한 분을 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              분
            </Typography>
            <Input width='98px' marginLeft={12} value={cardData.p06.answer4} onChange={event => handleChange(4, event.target.value)} type='number' status={
                  !isNotEmptyString(cardData.p06.answer4)
                    ? InputStatus.DEFAULT
                    : cardData.p06.isSubmitted && !isAnswer(cardData.p06.answer4, cardData.p06.solution4)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p06.isSubmitted} ariaLabel='도착한 초를 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              초 입니다.
            </Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='답안' />
              <Box marginTop='12px' gap={'20px'}>
                <Typography>
                {'소연, 9, 9, 20'}
                </Typography>
              </Box>
            </Box>
            <Box position='relative' marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />
              <Box marginTop='12px' gap={'20px'}>
                <Typography>놀이터에 도착한 시각이 소연이는 9시 9분 20초, 찬성이는 9시 13분, 재진이는 9시 11분 5초입니다.</Typography>
                <Typography>따라서 가장 먼저 도착한 친구는 소연이고 9시 9분 20초입니다</Typography>
              </Box>
            </Box>
          </Box>
        </BottomSheet>
    </Container>
  );
};

export default P06;
