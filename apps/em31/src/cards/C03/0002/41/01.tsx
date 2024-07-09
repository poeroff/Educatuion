import {
  Box,
  Image,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  BoxWrap,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Typography,
  EStyleFontSizes,
  Tag,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0002_41 } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0002_41);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        장미꽃 32송이를 꽃병에 똑같이 나누어 꽂으려고 합니다. 꽃병 수에 따라 꽃병 한 개에 꽂을 수 있는 장미꽃 수를 구해 보세요.
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
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
      useRound
    >
      <BoxWrap display='flex' justifyContent='center'>
        <Box>
          <Image src={'/C03/0002/41/DEC313006.png'} alt=' 장미꽃 32송이가 그려진 그림입니다.' width='306px' height='151px' />
        </Box>
      </BoxWrap>
      <BoxWrap marginTop={24}>
        <Box
          type='dashed'
          useRound
          width='calc(100% - 396px)'
          height='201px'
          padding='0px 20px'
          display='flex'
          justifyContent='center'
          flexDirection='column'
        >
          <Box>
            꽃병 4개에 꽂으면 꽃병 한 개에 꽂을 수 있는 장미꽃은{' '}
            <Input
              type='number'
              inputSize='small'
              width='52px'
              value={cardData.p01.answer1.value}
              readOnly={cardData.p01.isSubmitted}
              status={cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect ? 'error' : ''}
              ariaLabel='첫번째 문제 답'
              onChange={e => handleChange(1, e.target.value)}
            />
            송이입니다.
          </Box>
        </Box>
        <Box
          type='dashed'
          useRound
          width='calc(100% - 396px)'
          height='201px'
          padding='0px 20px'
          display='flex'
          justifyContent='center'
          flexDirection='column'
        >
          <Box>
            꽃병 8개에 꽂으면 꽃병 한 개에 꽂을 수 있는 장미꽃은{' '}
            <Input
              type='number'
              inputSize='small'
              width='52px'
              value={cardData.p01.answer2.value}
              readOnly={cardData.p01.isSubmitted}
              status={cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect ? 'error' : ''}
              ariaLabel='두번째 문제 답'
              onChange={e => handleChange(2, e.target.value)}
            />
            송이입니다.
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Typography size={EStyleFontSizes.MEDIUM}>
            {cardData.p01.answer1.solution}, {cardData.p01.answer2.solution}
          </Typography>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Typography size={EStyleFontSizes.MEDIUM}>32÷4=8, 32÷8=4</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
