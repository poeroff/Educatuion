import { Box, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C01000320P } from './store';
import usePageData from '@/hooks/usePageData';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000320P);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.P04.isSubmitted ? (cardData.P04.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        그림 그리기 대회에 연두 마을 학생 453명과 노랑 마을 학생 107명이 참가했습니다. 참가한 두 마을 학생은 모두 몇 명인가요?
      </>
    ),
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
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.P04.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.P04.answer1.trim().toLowerCase() === cardData.P04.solution1;
      const isCorrect2 = cardData.P04.answer2.trim() === cardData.P04.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P04.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'NUMBER',
              value: cardData.P04.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
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
          P04: {
            ...prev.P04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P04.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, answer2: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.P04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.P04.answer1 && cardData.P04.answer2)}
      submitBtnColor={
        !(cardData.P04.answer1 && cardData.P04.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
    >
      <Box display='flex' justifyContent='center' marginTop='60px'>
        <Box height={'250px'}>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              maxLength={12}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              ariaLabel='식을 적어주세요.'
              value={cardData.P04.answer1}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData.P04.isSubmitted}
              status={cardData.P04.isSubmitted && cardData.P04.answer1.trim() !== cardData.P04.solution1 ? 'error' : ''}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              maxLength={3}
              width='124px'
              marginLeft={12}
              textAlign='center'
              ariaLabel='답을 적어주세요.'
              value={cardData.P04.answer2}
              onChange={event => handleChange(2, event.target.value)}
              readOnly={cardData.P04.isSubmitted}
              status={cardData.P04.isSubmitted && cardData.P04.answer2.trim() !== cardData.P04.solution2 ? 'error' : ''}
            />
            <Typography>명</Typography>
          </Box>
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
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px' height='320px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>453+107=560, 560</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box marginTop='12px' gap={'20px'} flexDirection='column' useRound useFull>
              (연두 마을 학생 수)+(노랑 마을 학생 수) = 453+107=560(명)
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;