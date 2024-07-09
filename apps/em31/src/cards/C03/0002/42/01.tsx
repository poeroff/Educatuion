import { ChangeEvent, useEffect, useState } from 'react';
import {
  Image,
  Box,
  Label,
  Typography,
  Input,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { C03_0002_42 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0002_42);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />두 친구가 밤 14개와 도토리 16개를 똑같이 나누어 가지려고 합니다. 한 명이 가질 수 있는 밤과 도토리 수를
        각각 구해 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
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
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0] || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1] || cardData.p01.answer2,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: { ...prev.p01.answer2, value } } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const handleSubmit = () => {
    const correct1 = cardData.p01.answer1.value.trim() === cardData.p01.answer1.solution;
    const correct2 = cardData.p01.answer2.value.trim() === cardData.p01.answer2.solution;
    const isAllCorrect = correct1 && correct2;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: {
          ...cardData.p01.answer1,
          isCorrect: correct1,
        },
        answer2: {
          ...cardData.p01.answer2,
          isCorrect: correct2,
        },
        isSubmitted: true,
        isAllCorrect: isAllCorrect,
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
            isCorrect: correct1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2.value,
            isCorrect: correct2,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isAllCorrect);
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1.value && cardData.p01.answer2.value)}
      submitBtnColor={
        !(cardData.p01.answer1.value && cardData.p01.answer2.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      vAlign='flex-start'
    >
      <Box display='flex' alignItems='center'>
        <Box display='flex' alignItems='center' flexDirection='column' width='300px' marginLeft='80px'>
          <Label value='밤' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Box padding='20px 44px' type='line' useRound marginTop={14}>
            <Image src={'/C03/0002/42/EC31312_01.png'} alt='밤 14개와 도토리 16개가 그려진 그림입니다.' width='270px' height='145px' />
          </Box>
        </Box>
        <Box display='flex' alignItems='center' flexDirection='column' width='300px' marginLeft='150px'>
          <Label value='도토리' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Box padding='20px 44px' type='line' useRound marginTop={14}>
            <Image src={'/C03/0002/42/EC31312_02.png'} alt='밤 14개와 도토리 16개가 그려진 그림입니다.' width='270px' height='145px' />
          </Box>
        </Box>
      </Box>
      <Box text-align='right'>
        <Box marginTop='24px' alignItems='right'>
          밤{' '}
          <Input
            type='number'
            value={cardData.p01.answer1.value}
            status={cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect ? 'error' : ''}
            onChange={e => handleChange(1, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='첫번째 문제의 답'
            width='130px'
          />
          <Typography>개, 도토리 </Typography>
          <Input
            type='number'
            value={cardData.p01.answer2.value}
            status={cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect ? 'error' : ''}
            onChange={e => handleChange(2, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='두번째 문제의 답'
            width='130px'
          />
          <Typography>개</Typography>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />

          <Typography size={EStyleFontSizes.MEDIUM}>
            {cardData.p01.answer1.solution}, {cardData.p01.answer2.solution}
          </Typography>

          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            (한 명이 가질 수 있는 밤 수)=14÷2=7(개) <br />
            <Typography size={EStyleFontSizes.MEDIUM}>
              <div style={{ marginLeft: 65 }}>(한 명이 가질 수 있는 도토리 수)=16÷2=8(개)</div>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
