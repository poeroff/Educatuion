import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP011State } from './store';
import { useEffect, useMemo, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import AnswerTagBox from './components/AnswerTagBox';

const P14 = ({ _page = 'p14' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P14.mp3',
    captionSrc: '/L03/SP01-1/HE2-L03-SP01-1-P14.srt',
  };

  const choices = [
    '여학생에게 새로운 영화 추천하기',
    'George Nicholson의 출연 작품을 검색하기',
    '영화관에서 최근에 출시된 코미디 영화 보기',
    'George Nicholson의 최근 영화를 다시 보기',
    'George Nicholson이 출연한 다른 영화 보기',
  ];
  const ANSWER = 5;
  const explanation =
    '여학생은 George Nicholson이 출연한 다른 영화를 볼 것을 제안하고 있고, 남학생이 이에 동의했으므로, 남학생이 할 일로 가장 적절한 것은 5번이다.';
  const script = (
    <>
      <Box display='flex'>
        <Box>{`B: `}</Box>
        <Box>{`Hey, Mina. Have you seen that latest comedy movie starring George Nicholson?`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`G: `}</Box>
        <Box>
          {`Yeah, `}
          <Typography useGap={false} fontStyle={'italic'}>
            Man in Dark.
          </Typography>
          {` I saw it yesterday.`}
        </Box>
      </Box>
      <Box display='flex'>
        <Box>{`B: `}</Box>
        <Box>{`Oh, good! How did you like it?`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`G: `}</Box>
        <Box>{`It was so funny. I laughed from the start to the very end. I was really impressed by George Nicholson’s performance.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`B: `}</Box>
        <Box>{`I agree! I think comedy acting is very difficult, but he did a great job.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`G: `}</Box>
        <Box>{`Absolutely! I’m even thinking about going to see it again.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`B: `}</Box>
        <Box>{`Hmm, I don’t like watching the same movie twice, but I definitely want to see more movies with that actor.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`G: `}</Box>
        <Box>
          {`Well, in that case, you should watch `}
          <Typography useGap={false} fontStyle={'italic'}>
            Comedy King,
          </Typography>
          {` one of his earlier movies from before he was famous.`}
        </Box>
      </Box>
      <Box display='flex'>
        <Box>{`B: `}</Box>
        <Box>{`Nice, I’ll watch it. Thanks!`}</Box>
      </Box>
    </>
  );
  const translation = (
    <>
      <Box display='flex'>
        <Box>{`남: `}</Box>
        <Box>{`안녕, 미나야. 너 George Nicholson 주연의 최신 코미디 영화 본 적 있어?`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`여: `}</Box>
        <Box>{`응, <Man in Dark>. 어제 봤어.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`남: `}</Box>
        <Box>{`오, 좋다! 어땠어?`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`여: `}</Box>
        <Box>{`정말 웃기더라. 시작부터 끝까지 계속 웃었어. 난 George Nicholson의 연기에 정말 감명받았어.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`남: `}</Box>
        <Box>{`동의해! 코미디 연기는 정말 어렵다고 생각하는데, 그는 정말 잘했어.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`여: `}</Box>
        <Box>{`정말로! 나는 심지어 다시 보러 갈까 생각 중이야.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`남: `}</Box>
        <Box>{`음, 나는 같은 영화를 두 번 보는 것을 좋아하지 않지만, 그 배우의 영화를 꼭 더 보고 싶어.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`여: `}</Box>
        <Box>{`음, 그런 경우에는 그가 유명해지기 전에 찍은 그의 초기 영화 중 하나인 <Comedy King>을 봐야 해.`}</Box>
      </Box>
      <Box display='flex'>
        <Box>{`남: `}</Box>
        <Box>{`좋아, 봐 볼게. 고마워!`}</Box>
      </Box>
    </>
  );

  const [mark, setMark] = useState<TMarkType>('none');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerText: '[Listen & Speak] 확인문제',
      headerPattern: 'text',
    }),
    [],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: '2. 다음을 듣고, 남학생이 할 일로 가장 적절한 것을 고르시오.',
      markSize: 'middle',
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
          value: null,
        },
      ],
    },
  ];

  const isCorrect = useMemo(() => cardData.p14.selectedIdx === ANSWER - 1, [cardData.p14.selectedIdx]);
  useEffect(() => {
    if (cardData.p14.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p14.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => {
          let selectedIdx = prev.p14.selectedIdx;
          if (Number.isInteger(userSubmissionList[0].inputData[0]?.value)) {
            selectedIdx = userSubmissionList[0].inputData[0]?.value;
          }
          return {
            ...prev,
            p14: {
              ...prev.p14,
              selectedIdx,
              isSubmitted,
            },
          };
        });
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p14: { ...prev.p14, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p14.selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRowClick = (index: number) => {
    if (cardData.p14.isSubmitted) return;

    setCardData(prev => ({ ...prev, p14: { ...prev.p14, selectedIdx: index } }));
    changeData(PAGE_NUM, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p14.isSubmitted) {
      setIsModalOpen(!isModalOpen);
    } else {
      submitAnswer();
    }
  };

  const data = choices.map(text => ({ text }));

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p14.isSubmitted ? (isModalOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p14.selectedIdx == null}
      submitBtnColor={
        cardData.p14.selectedIdx != null ? (isModalOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmitClick}
    >
      <Box useFull hAlign='center' padding='20px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound marginBottom={'20px'}>
            In the dialogue, the daughter wonders{' '}
            <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)' useGap={false}></Typography> and her dad explains it.
          </Box>
          <Scroll height='70%' width='910px' tabIndex={0}>
            <List
              gap={4}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index - 1 === cardData.p14.selectedIdx}
                  onClick={() => handleRowClick(index - 1)}
                  readOnly={cardData.p14.isSubmitted}
                  isError={cardData.p14.isSubmitted && cardData.p14.selectedIdx !== ANSWER - 1}
                >
                  <Box vAlign='center'>
                    <Label value={index} marginRight={8} />
                    {value?.text}
                  </Box>
                </Radio>
              )}
            />
          </Scroll>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isModalOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {ANSWER}
          </AnswerTagBox>
          <AnswerTagBox label='해설'>{explanation}</AnswerTagBox>
          <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>
          <AnswerTagBox label='해석'>{translation}</AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P14;
