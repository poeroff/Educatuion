import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, EStyleButtonTypes, IQuestionProps, Input, Typography, BottomSheet, Tag, ETagLine, Label, SvgIcon, InputStatus, ESvgType } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import empty_square from '@/assets/icon/math_empty_square.svg';

import { A05001204_Atom } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A05001204_Atom);
  const [isShow, setShow] = useState<boolean>(false);

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
      ],
    },
  ];

  const onCalculate = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim() === cardData.p02.solution2;
      const isCorrect3 = cardData.p02.answer3.trim() === cardData.p02.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3 }, }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
                subKey: 2,
                type: 'TEXT',
                value: cardData.p02.answer2,
                isAnswer: true,
                isCorrect: isCorrect2,
              },
              {
                subKey: 3,
                type: 'TEXT',
                value: cardData.p02.answer3,
                isAnswer: true,
                isCorrect: isCorrect3,
              },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p02.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p02.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p02.isCorrect3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
        <Label type='icon' size='middle' value='2' />
        <SvgIcon
            type={ESvgType.IMG}
            alt='빈칸'
            src={empty_square}
            size='43px'
            style={{ display: 'inline-flex', verticalAlign: 'middle', position: 'relative', top: '7px' }}
          />&nbsp;안에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(
        cardData.p02.answer1 &&
        cardData.p02.answer2 &&
        cardData.p02.answer3
      )}
      submitBtnColor={!(
        cardData.p02.answer1 &&
        cardData.p02.answer2 &&
        cardData.p02.answer3
      ) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
    >
      <Box display='flex' justifyContent='center' gap='50px' useFull>
        <Box marginBottom='24px'>
            <Typography>8 cm 3 mm=</Typography>
            <Input
              width='80px'
              type='number'
              value={cardData.p02.answer1}
              onChange={event => handleChange(1, event.target.value)}
              status={cardData.p02.isSubmitted && !cardData.p02.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='8 cm 3 mm= 답 입력란'
              readOnly={cardData.p02.isSubmitted}
            />
            <Typography fontWeight='900'>mm</Typography>
          </Box>
          <Box marginBottom='24px'>
            <Typography>97mm=</Typography>
            <Input
              width='60px'
              type='number'
              value={cardData.p02.answer2}
              onChange={event => handleChange(2, event.target.value)}
              status={cardData.p02.isSubmitted && !cardData.p02.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='97mm cm 답 입력란'
              readOnly={cardData.p02.isSubmitted}
            />
            <Typography fontWeight='900'>cm</Typography>
            <Input
              width='60px'
              type='number'
              value={cardData.p02.answer3}
              onChange={event => handleChange(3, event.target.value)}
              status={cardData.p02.isSubmitted && !cardData.p02.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
              ariaLabel='97mm mm 답 입력란'
              readOnly={cardData.p02.isSubmitted}
            />
            <Typography fontWeight='900'>mm</Typography>
          </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'83, 9, 7'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
              {' 1 cm=10 mm임을 이용합니다.'}<br/>{'8 cm 3 mm=83 mm'}<br/>{'97 mm=9 cm 7 mm'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
