import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  Input,
  IQuestionProps,
  Label,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { C03_0002_40 } from './store';
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
  const [cardData, setCardData] = useRecoilState(C03_0002_40);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        연필 16자루를 4명이 똑같이 나누어 가지려고 합니다. 한 명이 가질 수 있는 연필은 몇 자루인가요?
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
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
            answer3: userSubmissionList[0].inputData[2] || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3] || cardData.p01.answer4,
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
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: { ...prev.p01.answer3, value } } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: { ...prev.p01.answer4, value } } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const handleSubmit = () => {
    const correct1 = cardData.p01.answer1.value.trim() === cardData.p01.answer1.solution;
    const correct2 = cardData.p01.answer2.value.trim() === cardData.p01.answer2.solution;
    const correct3 = cardData.p01.answer3.value.trim() === cardData.p01.answer3.solution;
    const correct4 = cardData.p01.answer4.value.trim() === cardData.p01.answer4.solution;
    const isAllCorrect = correct1 && correct2 && correct3 && correct4;
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
        answer3: {
          ...cardData.p01.answer3,
          isCorrect: correct3,
        },
        answer4: {
          ...cardData.p01.answer4,
          isCorrect: correct4,
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
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer2.value,
            isCorrect: correct2,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer3.value,
            isCorrect: correct3,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer4.value,
            isCorrect: correct4,
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
      background={'var(--color-white)'}
      questionInfo={questionInfo}
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1.value && cardData.p01.answer2.value && cardData.p01.answer3.value && cardData.p01.answer4.value)}
      submitBtnColor={
        !(cardData.p01.answer1.value && cardData.p01.answer2.value && cardData.p01.answer3.value && cardData.p01.answer4.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column' height='180px'>
        <Box type='line' padding='20px 40px' useRound>
          <Image src='/C03/0002/40/DEC313005.png' alt='연필이 16자루 그려진 그림입니다.' width='652px' height='140px' />
        </Box>
      </Box>
      <Box marginTop='30px' vAlign='center' flexDirection='column'>
        <Box>
          <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Input
            type='number'
            width='130px'
            marginLeft={8}
            maxLength={2}
            value={cardData.p01.answer1.value}
            status={cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect ? 'error' : ''}
            onChange={e => handleChange(1, e.target.value)}
            ariaLabel='1번 숫자 답입력란'
            readOnly={cardData.p01.isSubmitted}
          />
          ÷
          <Input
            type='number'
            width='60px'
            value={cardData.p01.answer2.value}
            status={cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect ? 'error' : ''}
            onChange={e => handleChange(2, e.target.value)}
            maxLength={1}
            ariaLabel='2번 숫자 답입력란'
            readOnly={cardData.p01.isSubmitted}
          />
          =
          <Input
            type='number'
            width='60px'
            value={cardData.p01.answer3.value}
            status={cardData.p01.isSubmitted && !cardData.p01.answer3.isCorrect ? 'error' : ''}
            onChange={e => handleChange(3, e.target.value)}
            maxLength={1}
            ariaLabel='3번 숫자 답입력란'
            readOnly={cardData.p01.isSubmitted}
          />
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='130px'
              marginLeft={8}
              value={cardData.p01.answer4.value}
              status={cardData.p01.isSubmitted && !cardData.p01.answer4.isCorrect ? 'error' : ''}
              onChange={e => handleChange(4, e.target.value)}
              ariaLabel='답 입력 란'
              maxLength={1}
              readOnly={cardData.p01.isSubmitted}
            />
            <Typography>자루</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box>
            <Typography size={EStyleFontSizes.MEDIUM}>
              {cardData.p01.answer1.solution}, {cardData.p01.answer2.solution}, {cardData.p01.answer3.solution}, {cardData.p01.answer4.solution}
            </Typography>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Typography size={EStyleFontSizes.MEDIUM}>
              연필 16자루를 4명이 똑같이 나누어 가지면 한 명이 가질 수 있는 연필은 <MathExpression equation={'\\(16 \\div 4 = 4\\)'} />
              (자루)입니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
