import { Box, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C01000352 } from './store';
import usePageData from '@/hooks/usePageData';


const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000352);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const PAGE_NUMBER = 'P01'

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        오늘 미술관에 어른 542명과 어린이 318명이 입장했습니다. 미술관에 입장한 사람은 모두 몇 명인가요?

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

  const onSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p04.answer1.trim().toLowerCase() === cardData.p04.solution1;
      const isCorrect2 = cardData.p04.answer2.trim() === cardData.p04.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'NUMBER',
              value: cardData.p04.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
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
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
    }
    changeData(PAGE_NUMBER, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      onSubmit={onSubmit}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p04.answer1 && cardData.p04.answer2)}
      submitBtnColor={
        !(cardData.p04.answer1 && cardData.p04.answer2) ? EStyleButtonTypes.GRAY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
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
              value={cardData.p04.answer1.trim()}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData.p04.isSubmitted}
              status={cardData.p04.isSubmitted && cardData.p04.answer1.trim() !== cardData.p04.solution1 ? 'error' : ''}
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
              value={cardData.p04.answer2.trim()}
              onChange={event => handleChange(2, event.target.value)}
              readOnly={cardData.p04.isSubmitted}
              status={cardData.p04.isSubmitted && cardData.p04.answer2.trim() !== cardData.p04.solution2 ? 'error' : ''}
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
              <Typography>
                <MathExpression equation={'$542+318=860$'} />
                , 860
              </Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box marginTop='12px' gap={'20px'} flexDirection='column' useRound useFull>
              (입장한 어른 수)+(입장한 어린이 수) = <MathExpression equation={'$542+318=860$'} />(명)
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
