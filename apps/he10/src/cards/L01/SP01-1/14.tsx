import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AnswerTagBox from './components/AnswerTagBox';
import L01SP011State from './store';
import L01SP012State from '@/cards/L01/SP01-2/store';

interface P14Props {
  pageNumber?: string;
  store?: 'SP01-1' | 'SP01-2';
}
const P14 = ({ pageNumber = 'p14', store = 'SP01-1' }: P14Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP01-1' ? L01SP011State : L01SP012State);

  const PAGE_NUM = pageNumber.toUpperCase();

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-1/HE1-L01-SP01-1-P14.mp3',
  };

  const choices = [
    'Great. Let’s try the roller coaster there.',
    'I’m sorry, but I need to study for the exam.',
    'Right. Our friends will enjoy the snacks, too.',
    'Well, I’m not thinking of going on the class trip.',
    'That’s cool! I hope we all can have fun together!',
  ];
  const answer = 5;
  const explanation =
    '여학생이 반별 여행을 가서 학급 사진을 찍으면 어떨지 의견을 묻는 말에 남학생이 동의하며 다 같이 즐거운 시간을 보내면 좋겠다고 대답하는 말이 가장 적절한 응답이다.';
  const script = (
    <>
      {`G: Hey, Tom! Guess what? We’re going on a class trip to the Amazing Theme Park!
    B: Seriously? That’s fantastic! When’s the trip?
    G: Next month, right after the mid-terms.
    B: Nice! That’ll be the perfect way to treat ourselves after our exams. How can we make the most of our time there with our friends?
    G: We should definitely try riding the roller coaster and check out all the other rides there.
    B: For sure! Plus, the park is famous for its delicious snacks. Let’s try some of them, too!
    G: Of course! And how about taking a class photo for the memories before we leave?
    B: `}
      <Typography useGap={false} textDecoration={'underline'} weight={'var(--font-weight-bold)'}>
        That’s cool! I hope we all can have fun together!
      </Typography>
    </>
  );
  const translation = (
    <>
      {`여: 안녕, Tom! 그거 알아? 우리 Amazing 테마파크로 반별 여행을 갈 계획이래!
      남: 정말이야? 그거 멋진 걸! 여행은 언제래?
      여: 다음 달, 중간고사 끝난 직후래.
      남: 좋아! 시험이 끝나고 스스로에게 보상을 해 줄 완벽한 방법이 될 거야. 어떻게 하면 우리가 친구들과 함께 그곳에서의 시간을 최대한 즐길 수 있을까?
      여: 우리는 꼭 롤러코스터를 타 봐야 하고 그곳에 있는 다른 놀이기구들도 다 타 봐야 해.
      남: 좋아! 게다가, 그 테마파크는 맛있는 간식으로 유명해. 간식도 좀 먹어보자!
      여: 물론이지! 그리고 떠나기 전에 추억을 위해 반 사진을 찍는 게 어때?
      남: `}
      <Typography useGap={false} textDecoration={'underline'} weight={'var(--font-weight-bold)'}>
        그거 좋다! 우리 모두 함께 즐거운 시간을 보내면 좋겠어!
      </Typography>
      {`

      남자: `}
      <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>
      {`
      ① 좋아. 우리 그곳에서 롤러코스터를 타 보자.
      ② 미안하지만, 나는 시험공부를 해야 해.
      ③ 맞아. 우리 친구들도 그 간식을 좋아할 거야.
      ④ 글쎄. 나는 반별 여행에 갈 생각이 없어.
      ⑤ 그거 좋다! 우리 모두 함께 즐거운 시간을 보내면 좋겠어!`}
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
      text: '2. 대화를 듣고, 여학생의 마지막 말에 대한 남학생의 응답으로 가장 적절한 것을 고르시오.',
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

  const isCorrect = useMemo(() => cardData[pageNumber].selectedIdx === answer - 1, [cardData[pageNumber].selectedIdx]);
  useEffect(() => {
    if (cardData[pageNumber].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageNumber].isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            selectedIdx: userSubmissionList[0].inputData[0]?.value || prev[pageNumber].selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNumber].selectedIdx,
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
    if (cardData[pageNumber].isSubmitted) return;

    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], selectedIdx: index } }));
    changeData(PAGE_NUM, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData[pageNumber].isSubmitted) {
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
      submitLabel={cardData[pageNumber].isSubmitted ? (isModalOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData[pageNumber].selectedIdx == null}
      submitBtnColor={
        cardData[pageNumber].selectedIdx != null ? (isModalOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmitClick}
    >
      <Box useFull hAlign='center' padding='20px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound>
            Boy : <Typography type='blank' width='500px' title='빈칸' boxColor='var(--color-black)'></Typography>
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
                  value={index - 1 === cardData[pageNumber].selectedIdx}
                  onClick={() => handleRowClick(index - 1)}
                  readOnly={cardData[pageNumber].isSubmitted}
                  isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].selectedIdx !== answer - 1}
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
            {answer}
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
