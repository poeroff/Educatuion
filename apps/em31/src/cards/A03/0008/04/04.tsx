import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Label, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { A03000804 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03000804);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Label type='icon' value={4} />
        <Typography>나눗셈의 몫을 구할 수 있는 곱셈식을 쓰고 몫을 구해보세요.</Typography>
      </>
    ),
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect =
        cardData.p04.answer1.every((value, index) => value === cardData.p04.solution1[index]) &&
        cardData.p04.answer2.every((value, index) => value === cardData.p04.solution2[index]);
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p04.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: cardData.p04.answer2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, answerNumber: number, index: number) => {
    if (answerNumber === 1) {
      setCardData(prev => {
        const newAnswer1 = [...prev.p04.answer1];
        newAnswer1[index] = e.target.value;
        return { ...prev, p04: { ...prev.p04, answer1: newAnswer1 } };
      });
    } else if (answerNumber === 2) {
      setCardData(prev => {
        const newAnswer2 = [...prev.p04.answer2];
        newAnswer2[index] = e.target.value;
        return { ...prev, p04: { ...prev.p04, answer2: newAnswer2 } };
      });
    }
  };

  useEffect(() => {
    changeData('P04', 1, 1, cardData.p04.answer1);
    changeData('P04', 1, 2, cardData.p04.answer2);
  }, [cardData.p04.answer1, cardData.p04.answer2]);

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleStatus = (answerNumber: number, index: number) => {
    if (cardData.p04.isSubmitted) {
      if (answerNumber === 1) {
        if (cardData.p04.answer1[index] === cardData.p04.solution1[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.ERROR;
        }
      } else if (answerNumber === 2) {
        if (cardData.p04.answer2[index] === cardData.p04.solution2[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.ERROR;
        }
      }
    } else {
      if (answerNumber === 1) {
        if (cardData.p04.answer1[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.DEFAULT;
        }
      } else if (answerNumber === 2) {
        if (cardData.p04.answer2[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.DEFAULT;
        }
      }
    }
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p04.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : cardData.p04.answer1.every(value => isNotEmptyString(value)) && cardData.p04.answer2.every(value => isNotEmptyString(value))
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
      //   submitDisabled={}
      useRound
      vAlign='start'
      bodyId='targetContainer'
    >
      <Box display='flex'>
        <Box useFull type='dashed' borderRadius='16px' padding='24px'>
          <Box background='yellow' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              36÷4
            </Box>
          </Box>
          <Box display='flex' whiteSpace='nowrap' alignItems='center'>
            <Box width='100px' display='flex' justifyContent='right'>
              <Box
                color='var(--color-yellow-800)'
                backgroundColor='var(--color-yellow-100)'
                border='1px solid var(--color-yellow-700)'
                fontSize={22}
                borderRadius={50}
                display='flex'
                alignItems='center'
                padding='4px 18px'
                height={44}
                marginRight={8}
              >
                곱셈식
              </Box>
            </Box>
            <Box display='flex' width={'calc(100% - 108px'}>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p04.answer1[0]}
                onChange={e => {
                  handleChange(e, 1, 0);
                }}
                status={handleStatus(1, 0)}
              />
              <Typography>×</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p04.answer1[1]}
                onChange={e => {
                  handleChange(e, 1, 1);
                }}
                status={handleStatus(1, 1)}
              />
              <Typography>=</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p04.answer1[2]}
                onChange={e => {
                  handleChange(e, 1, 2);
                }}
                status={handleStatus(1, 2)}
              />
            </Box>
          </Box>

          <Box display='flex' marginTop={12}>
            <Box width='100px' display='flex' justifyContent='right' alignItems='center'>
              <Label
                value='몫'
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                size='small'
                marginRight={8}
              />
            </Box>
            <Input
              type={'number'}
              width='146px'
              value={cardData.p04.answer1[3]}
              onChange={e => {
                handleChange(e, 1, 3);
              }}
              status={handleStatus(1, 3)}
            />
          </Box>
        </Box>
        <Box useFull type='dashed' borderRadius='16px' padding='24px' marginLeft='24px'>
          <Box background='yellow' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              48÷6
            </Box>
          </Box>

          <Box display='flex' whiteSpace='nowrap' alignItems='center'>
            <Box width='100px' display='flex' justifyContent='right'>
              <Box
                color='var(--color-yellow-800)'
                backgroundColor='var(--color-yellow-100)'
                border='1px solid var(--color-yellow-700)'
                fontSize={22}
                borderRadius={50}
                display='flex'
                alignItems='center'
                padding='4px 18px'
                height={44}
                marginRight={8}
              >
                곱셈식
              </Box>
            </Box>
            <Box display='flex' width={'calc(100% - 108px'}>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p04.answer2[0]}
                onChange={e => {
                  handleChange(e, 2, 0);
                }}
                status={handleStatus(2, 0)}
              />
              <Typography>×</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p04.answer2[1]}
                onChange={e => {
                  handleChange(e, 2, 1);
                }}
                status={handleStatus(2, 1)}
              />
              <Typography>=</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p04.answer2[2]}
                onChange={e => {
                  handleChange(e, 2, 2);
                }}
                status={handleStatus(2, 2)}
              />
            </Box>
          </Box>

          <Box display='flex' marginTop={12}>
            <Box width='100px' display='flex' justifyContent='right' alignItems='center'>
              <Label
                value='몫'
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                size='small'
                marginRight={8}
              />
            </Box>
            <Input
              type={'number'}
              width='146px'
              value={cardData.p04.answer2[3]}
              onChange={e => {
                handleChange(e, 2, 3);
              }}
              status={handleStatus(2, 3)}
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>4, 9, 36, 9 / 6, 8, 48, 8</Typography>
            </Box>
          </Box>

          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>4×9=36이므로 36÷4=9입니다.</Typography>
              <Typography>6×8=48이므로 48÷6=8입니다.</Typography>
            </Box>
          </Box>

          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>나눗셈식을 곱셈식 4×□＝36, 6×□＝48으로 생각해 보세요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
