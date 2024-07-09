import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP02 } from './store';

const P13 = () => {
  const PAGE_NUMBER = 'P13';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP02);
  const [mark, setMark] = useState<TMarkType>('none');
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const choices = [
    'It will be hard to make a reservation.',
    'My family was quite satisfied with the food there.',
    'I always have their food delivered to enjoy it at home.',
    'It’s a great restaurant for people who enjoy eating alone.',
    'It’s not a good idea to recommend this restaurant to other friends.',
  ];

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerText: '[Listen & Speak] 확인문제',
      headerPattern: 'text',
    }),
    [],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: '다음 대화의 빈칸에 들어갈 말로 알맞은 것을 고르시오.',
      mark: mark,
    }),
    [mark],
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
      ],
    },
  ];

  const solution = 2;

  const isCorrect = useMemo(() => cardData.p13.answer === solution, [cardData.p13.answer]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p13: {
            ...prev.p13,
            answer: userSubmissionList[0].inputData[0]?.value || prev.p13.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p13: { ...prev.p13, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p13.answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
  };

  const handleRowClick = (index: number) => {
    if (cardData.p13.isSubmitted) return;

    setCardData(prev => ({ ...prev, p13: { ...prev.p13, answer: index } }));
    changeData('P13', 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p13.isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      submitAnswer();
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p13;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
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

  useEffect(() => {
    if (cardData.p13.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p13.isSubmitted, isCorrect]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p13.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p13.isSubmitted || !cardData.p13.answer) && !cardData.p13.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmitClick}
      useScroll
      vAlign='flex-start'
    >
      <Box width='910px' height={'234px'} padding='20px' background='white' useRound>
        <Scroll tabIndex={1}>
          <Box display='flex' padding={'4px 12px'} gap={'12px'}>
            <Typography useGap={false}>M:</Typography>
            <Typography useGap={false}>
              I’m trying to find some good Korean restaurants for a family
              <br />
              gathering. Do you have any recommendations?
            </Typography>
          </Box>

          <Typography>W: I recommend Seorabeol, a traditional Korean restaurant.</Typography>

          <Typography>M: What’s the food like there?</Typography>

          <Typography>
            W: All the dishes are healthy and delicious. <Typography type='blank' width='280px' title='빈칸' boxColor='var(--color-black)' />
          </Typography>

          <Typography>M: That sounds great. Thanks for the suggestion.</Typography>
        </Scroll>
      </Box>

      <Box marginTop={'20px'}>
        <List
          gap={4}
          data={choices}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question'}
              ariaLabel={`${index}번 보기`}
              value={index === cardData.p13.answer}
              onClick={() => handleRowClick(index)}
              readOnly={cardData.p13.isSubmitted}
              isError={cardData.p13.isSubmitted && cardData.p13.answer !== solution}
            >
              <Box vAlign='center'>
                <Label value={index} marginRight={8} />
                {value}
              </Box>
            </Radio>
          )}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>2</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              가족들을 위해 한식당을 추천해 달라는 남학생의 요청에 여학생은 자기 가족들이 만족해했던 Seorabeol이라는 식당을 추천하고 있으므로 빈칸에
              들어갈 말로 가장 알맞은 것은 2번이다.
            </Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>남: 나는 가족 모임에 좋은 한식당을 찾고 있어. 추천해 줄 만한 곳이 있니?</Typography>
            <Typography>여: 한국의 전통 음식점인 Seorabeol을 추천해.</Typography>
            <Typography>남: 거기 음식은 어때?</Typography>
            <Typography>
              여: 모든 음식이 건강식이고 맛있어.{' '}
              <Typography useGap={false} textDecoration={'underline'}>
                우리 가족은 거기 음식에 꽤 만족했어.
              </Typography>
            </Typography>
            <Typography>남: 좋아. 추천해 줘서 고마워.</Typography>
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>1. 예약하기가 어려울 거야.</Typography>
            <Typography>3. 나는 집에서 먹기 위해 항상 그곳의 음식을 배달시켜 먹어.</Typography>
            <Typography>4. 혼자 먹는 걸 즐기는 사람들에게 좋은 식당이야.</Typography>
            <Typography>5. 다른 친구에게 추천하는 건 좋은 생각이 아니야.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
