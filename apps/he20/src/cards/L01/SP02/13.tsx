import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01SP02 } from './store';
import { useEffect, useMemo, useState } from 'react';
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
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';

const P13 = () => {
  const PAGE_NUMBER = 'P13';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02);
  const [mark, setMark] = useState<TMarkType>('none');
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const choices = [
    'I think it’s important to make plans in advance.',
    'I’m actually thinking of working as a volunteer translator.',
    'I really wanted to get a part time job at a children’s library.',
    'I’m worried that I still don’t have any plans for the vacation yet.',
    'I think I want to read a lot of Korean folk tales written in English.',
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
      text: '대화의 빈칸에 들어갈 말로 알맞은 것을 고르시오.',
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
    setCardData(prev => ({ ...prev, p13: { ...prev.p13, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p13.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
  };

  const handleRowClick = (index: number) => {
    if (cardData.p13.isSubmitted) return;

    setCardData(prev => ({ ...prev, p13: { ...prev.p13, answer: index } }));
    changeData(PAGE_NUMBER, 1, 1, index);
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
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography>Hey, Yuna. Do you have any special plans this summer vacation?</Typography>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-yellow-100)' marginRight={8} />
            </Box>
            <Box display='flex'>
              <Typography>
                Hi, Tom. <Typography type='blank' width='330px' title='빈칸' boxColor='var(--color-black)'></Typography>
              </Typography>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography>Yeah? What does that involve?</Typography>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-yellow-100)' marginRight={8} />
            </Box>
            <Box display='flex'>
              <Typography>I translate short Korean folk tales into English and then send them to a charity center.</Typography>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography>That’s interesting!</Typography>
          </Box>
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
            <Tag type={ETagLine.GREEN} label='문제해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              남학생이 어떤 일인지 물은 후 여학생이 번역 자원봉사자가 하는 일을 설명하고 있으므로 빈칸에 들어갈 말로 가장 알맞은 것은 2번이다.
            </Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>남: Yuna. 이번 여름방학에 특별한 계획이 있니?</Typography>
            <Typography>
              여: 안녕, Tom.{' '}
              <Typography useGap={false} textDecoration={'underline'}>
                나는 사실 번역 자원봉사자로 일하려고 해.
              </Typography>
            </Typography>
            <Typography>남: 그래? 무슨 일을 하는 거지?</Typography>
            <Typography>여: 나는 짧은 한국 전래 동화를 영어로 번역해서 자선 단체에 보내.</Typography>
            <Typography>남: 재미있겠다!</Typography>
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>1. 미리 계획을 세우는 것이 중요하다고 생각해.</Typography>
            <Typography>3. 어린이 도서관에서 시간제 근무를 하고 싶었어.</Typography>
            <Typography>4. 아직 방학 계획이 없어서 고민이야.</Typography>
            <Typography>5. 영어로 쓰인 한국 전래 동화를 많이 읽고 싶어.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
