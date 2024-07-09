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
import L03SP02State from './store';

const P13 = () => {
  const PAGE_NUMBER = 'P13';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP02State);
  const [mark, setMark] = useState<TMarkType>('none');
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const choices = [
    'Actually, I also brought my own food to have with you.',
    'I hope you can have a great time at this music festival.',
    `Don't worry. You may easily find the food stands in the park.`,
    `Of course, but remeber you're not allowed to bring your own food in.`,
    'Unfortunately, nothing is allowed to be brought inside except for water.',
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

  const solution = 5;

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
            <Typography useGap={false}>W:</Typography>
            <Typography useGap={false}>
              Welcome to the Yeosu Park Music Festival. I'm afraid you're
              <br />
              not allowed to bring long umbrellas inside.
            </Typography>
          </Box>

          <Typography>B : Oh, sorry, I had no idea. But what if it rains later on?</Typography>
          <Typography>W: Don't worry, you can always get a rain poncho at the</Typography>
          <Box display='flex' marginLeft='40px'>
            <Typography>information center.</Typography>
          </Box>

          <Typography>B : Okay. One more thing, can i bring my own food in?</Typography>

          <Typography>
            <Typography useGap={false}>W:</Typography>
            <Typography type='blank' width='280px' title='빈칸' boxColor='var(--color-black)' />
            You can buy food and drinks at the food
          </Typography>
          <Box display='flex' marginLeft='40px'>
            <Typography>stands in the park, though.</Typography>
          </Box>

          <Typography>B : Okay, thank you!</Typography>
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
            <Typography>5</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              음식을 가지고 와도 되냐는 남학생의 말에 먹을 것과 음료를 공원 내의 음식 판매대에서 살 수 있다고 했으므로, 음식을 가져갈 수 없다고
              안내하는 5번이 가장 자연스럽다.
            </Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>여: 안녕하세요! 여수 공원 음악 축제에 오신 것을 환영합니다. 안전상의 이유로 장우산은 안으로 가져가실 수 없습니다.</Typography>
            <Typography>남: 아, 죄송해요. 몰랐어요. 그런데 나중에 비가 오면 어떡하죠?</Typography>
            <Typography>여: 걱정 마세요. 안내소에서 언제든지 우비를 받을 수 있어요.</Typography>
            <Typography>남: 알겠습니다. 그럼 한 가지 더요, 제 음식을 가지고 와도 되나요?</Typography>
            <Typography>
              여:
              <Typography useGap={false} textDecoration={'underline'}>
                &nbsp;안타깝게도, 물을 제외한 것은 안으로 가져가실 수 없습니다.&nbsp;
              </Typography>
              하지만 공원 안의 음식 판매대에서 음식과 음료를 구매하실 수 있어요.{' '}
            </Typography>
            <Typography>남: 알겠습니다. 감사합니다!</Typography>
          </Box>
          <br />
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>1. 사실 저도 당신과 함께 먹을 음식을 가져왔어요.</Typography>
            <Typography>2. 이 음악 축제에서 좋은 시간 보내시기를 바랍니다.</Typography>
            <Typography>3. 걱정 마세요. 공원에서 음식 가판대를 쉽게 찾으실 겁니다.</Typography>
            <Typography>4. 물론이죠, 하지만 음식을 안으로 가져가실 수 없다는 것을 기억해 주세요.</Typography>
            <Typography>5. 안타깝게도, 물을 제외한 것은 안으로 가져가실 수 없습니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
