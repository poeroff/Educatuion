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
import { L03SP02 } from './store';

const P13 = () => {
  const PAGE_NUMBER = 'P13';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP02);
  const [mark, setMark] = useState<TMarkType>('none');
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const choices = [
    'I wish I could live in that house.',
    'Can you show me how to visit that house?',
    'I wonder how the self-cleaning system worked.',
    'You might wonder how I came to know about it.',
    `I can't believe that you made such a creative invention.`,
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

  const solution = 3;

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
            <Typography useGap={false}>G:</Typography>
            <Typography useGap={false}>
              Lian, have you ever heard of Frances Gabe? Shw was an
              <br />
              amazing American woman who invented a self-cleaning house during the 1980s.
            </Typography>
          </Box>

          <Typography>
            {' '}
            B: Really? That sounds incredible! &nbsp;
            <Typography type='blank' width='280px' title='빈칸' boxColor='var(--color-black)' />
          </Typography>

          <Typography>
            G: A network of tubes and sprayers released soapy water all over the house, including the floors, walls, and ceilings.
          </Typography>
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
            <Typography>3</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              남자가 한 말을 듣고 여자는 스스로 청소하는 집의 작동 원리를 설명하고 있으므로, 남자가 그 작동 원리가 궁금하다고 말하는 3번이 가장 적절한
              응답이다.
            </Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>여: Lian, Frances Gabe에 대해 들어본 적 있어? 그녀는 1980년대에 스스로 청소하는 집을 발명한 굉장한 미국 여성이야.</Typography>
            <Typography>남: 그래? 정말 대단하네! </Typography>
            <Typography>
              <Typography useGap={false} textDecoration={'underline'}>
                스스로 청소하는 시스템의 작동 원리가 궁금해.
              </Typography>
            </Typography>
            <Typography> 여: 튜브와 분무기 네트워크가 바닥, 벽, 그리고 천장을 포함하여 집 전체에 비눗물을 뿌렸어.</Typography>
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>1. 내가 저 집에 살면 좋겠어.</Typography>
            <Typography>2. 저 집에 가는 방법을 알려줄 수 있어?</Typography>
            <Typography>4. 너는 내가 그걸 어떻게 알게 되었는지 궁금할거야.</Typography>
            <Typography>5. 네가 이런 창의적인 발명품을 만들었다니 믿을 수 없어.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
