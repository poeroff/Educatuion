import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0002_10 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C01_0002_10);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        생태 습지에 철새 352마리가 쉬고 있습니다. 347마리가 더 날아왔다면 철새는 모두 몇 마리인가요?
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.answer1.isCorrect && cardData.p01.answer2.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: {
          ...cardData.p01.answer1,
          isCorrect: cardData.p01.answer1.value === '352+347=699' || cardData.p01.answer1.value === '347+352=699',
        },
        answer2: {
          ...cardData.p01.answer2,
          isCorrect: cardData.p01.answer2.value === '699',
        },
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1.value,
          },
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer2.value,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
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
            answer1: {
              value: userSubmissionList[0].inputData[0]?.value || '',
              isCorrect: userSubmissionList[0].inputData[0]?.value === '352+347=699' || userSubmissionList[0].inputData[0]?.value === '347+352=699',
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: userSubmissionList[0].inputData[1]?.value === '699',
            },
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: { ...prev.p01.answer2, value } } }));
    }
    changeData('P01', 1, subKey, value);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      submitDisabled={!(cardData.p01.answer1.value && cardData.p01.answer2.value)}
      submitBtnColor={
        !(cardData.p01.answer1.value && cardData.p01.answer2.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              minWidth='296px'
              marginLeft={12}
              maxLength={100}
              textAlign='center'
              value={cardData.p01.answer1.value}
              onChange={e => handleChange(1, e.target.value.replace(/\s/gi, ''))}
              ariaLabel='식을 적어주세요.'
              readOnly={cardData.p01.isSubmitted}
              status={!cardData.p01.answer1.value ? 'default' : cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect ? 'error' : 'enable'}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p01.answer2.value}
              onChange={e => handleChange(2, e.target.value.trim())}
              ariaLabel='답을 적어주세요.'
              readOnly={cardData.p01.isSubmitted}
              status={!cardData.p01.answer2.value ? 'default' : cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect ? 'error' : 'enable'}
            />
            <Typography>마리</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography> 352+347=699, 699</Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Box>
              <Typography>(생태 습지에 있는 철새 수)+(더 날아온 철새 수)</Typography>
            </Box>
            <Typography>=352+347=699(마리)</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
