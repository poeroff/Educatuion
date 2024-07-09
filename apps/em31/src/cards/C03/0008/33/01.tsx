import { useEffect, useState, ChangeEvent } from 'react';
import { Box, Typography, Input, IQuestionProps, InputStatus, EStyleButtonTypes, BottomSheet, Tag, ETagLine, SvgIcon, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0008_33 } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0008_33);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        <Typography>나눗셈의 몫을 구할 수 있는 곱셈식을 쓰고 몫을 구해 보세요.</Typography>
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
          value: ['', '', ''],
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
        },
      ],
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>, answerNumber: number, index: number) => {
    if (answerNumber === 1) {
      setCardData(prev => {
        const newAnswer1 = [...prev.p01.answer1];
        newAnswer1[index] = e.target.value;
        return { ...prev, p01: { ...prev.p01, answer1: newAnswer1 } };
      });
      changeData('P01', 1, 1, e.target);
    } else if (answerNumber === 2) {
      setCardData(prev => {
        const newAnswer2 = [...prev.p01.answer2];
        newAnswer2[index] = e.target.value;
        return { ...prev, p01: { ...prev.p01, answer2: newAnswer2 } };
      });
      changeData('P01', 1, 2, e.target);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect =
        cardData.p01.answer1.every((value, index) => value === cardData.p01.solution1[index]) &&
        cardData.p01.answer2.every((value, index) => value === cardData.p01.solution2[index]);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: cardData.p01.answer2,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
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

  const handleStatus = (answerNumber: number, index: number) => {
    if (cardData.p01.isSubmitted) {
      if (answerNumber === 1) {
        if (cardData.p01.answer1[index] === cardData.p01.solution1[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.ERROR;
        }
      } else if (answerNumber === 2) {
        if (cardData.p01.answer2[index] === cardData.p01.solution2[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.ERROR;
        }
      }
    } else {
      if (answerNumber === 1) {
        if (cardData.p01.answer1[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.DEFAULT;
        }
      } else if (answerNumber === 2) {
        if (cardData.p01.answer2[index]) {
          return InputStatus.ENABLE;
        } else {
          return InputStatus.DEFAULT;
        }
      }
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : cardData.p01.answer1.every(value => isNotEmptyString(value)) && cardData.p01.answer2.every(value => isNotEmptyString(value))
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!cardData.p01.answer1.every(value => isNotEmptyString(value)) || !cardData.p01.answer2.every(value => isNotEmptyString(value))}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <Box display='flex'>
        <Box useFull type='dashed' borderRadius='16px' padding='24px'>
          <Box background='yellow' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              54÷6
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
              <Typography>6 ×</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p01.answer1[0]}
                onChange={e => {
                  handleChange(e, 1, 0);
                }}
                status={handleStatus(1, 0)}
                ariaLabel='첫번째 문제 곱셈식 첫번째 답란'
              />
              <Typography>=</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p01.answer1[1]}
                onChange={e => {
                  handleChange(e, 1, 1);
                }}
                status={handleStatus(1, 1)}
                ariaLabel='첫번째 문제 곱셈식 두번째 답란'
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
              value={cardData.p01.answer1[2]}
              onChange={e => {
                handleChange(e, 1, 2);
              }}
              status={handleStatus(1, 2)}
              ariaLabel='첫번째 문제 곱셈식 몫 답란'
            />
          </Box>
        </Box>
        <Box useFull type='dashed' borderRadius='16px' padding='24px' marginLeft='24px'>
          <Box background='yellow' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              49÷7
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
                value={cardData.p01.answer2[0]}
                onChange={e => {
                  handleChange(e, 2, 0);
                }}
                status={handleStatus(2, 0)}
                ariaLabel='두번째 문제 곱셈식 첫번째 답란'
              />
              <Typography>×</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p01.answer2[1]}
                onChange={e => {
                  handleChange(e, 2, 1);
                }}
                status={handleStatus(2, 1)}
                ariaLabel='두번째 문제 곱셈식 두번째 답란'
              />
              <Typography>=</Typography>
              <Input
                type={'number'}
                width='100%'
                value={cardData.p01.answer2[2]}
                onChange={e => {
                  handleChange(e, 2, 2);
                }}
                status={handleStatus(2, 2)}
                ariaLabel='두번째 문제 곱셈식 세번째 답란'
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
              value={cardData.p01.answer2[3]}
              onChange={e => {
                handleChange(e, 2, 3);
              }}
              status={handleStatus(2, 3)}
              ariaLabel='두번째 문제 곱셈식 몫 답란'
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>9, 54, 9 / 7, 7, 49, 7</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>6×9=54이므로 54÷6=9입니다.</Typography>
              <Typography>7×7=49이므로 49÷7=7입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
