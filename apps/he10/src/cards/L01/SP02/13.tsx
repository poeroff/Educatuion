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
import AnswerTagBox from '../SP01-1/components/AnswerTagBox';
import L01SP02State from './store';

interface P13Props {
  pageNumber?: string;
  store?: 'SP01-1' | 'SP01-2';
}

const P13 = ({ pageNumber = 'p13', store = 'SP01-1' }: P13Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02State);

  const PAGE_NUM = pageNumber.toUpperCase();

  const headerText = '[Listen & Speak] 확인문제 ';
  const questionText = '대화를 듣고, Andy의 마지막 말에 대한 여자의 응답으로 빈칸에 가장 적절한 것을 고르시오.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP02/HE1-L01-SP02-P13.mp3',
  };

  const question = 'Woman : __Why don’t you tell him about your concern?';
  const underlineText = '__';
  const choices = [
    'I think you’re wrong.',
    'I’m really proud of you.',
    'That’s kind of you to say.',
    'I understand how you feel.',
    'I’m sure he doesn’t like you.',
  ];
  const answer = 4;
  const explanation =
    'Andy가 친구인 Brian이 그룹 프로젝트에서 그의 몫의 일을 끝내지 않아 스트레스를 받는다고 한 말에 ‘네가 어떤 기분일지 이해해.’라고 공감하며 도움이 되는 조언을 하는 것이 자연스럽다.';
  const script = (
    <>
      {`W: Andy, you look upset. What’s bothering you?
        B: Hi, Mom. You know, I’ve been working on that group project with Brian, but I’ve been having some problems.
        W: Oh, no. I thought you would enjoy working with your best friend. What kind of problems?
        B: I thought we were getting along, but he’s not really doing his fair share. We have to hand in our project in two days, but he hasn’t finished his work. I’m really stressed out.
      W: `}
      <Typography textDecoration={'underline'} weight={'var(--font-weight-bold)'}>
        I understand how you feel.
      </Typography>
    </>
  );
  const translation = (
    <>
      {`여: Andy, 속상해 보이는구나. 무슨 고민 있니?
        남: 안녕하세요, 엄마. 있잖아요, 제가 Brian이랑 그룹 프로젝트를 하고 있었는데 문제가 좀 생겼어요.
        여: 오, 저런. 네가 가장 친한 친구와 즐겁게 일한다고 생각했어. 무슨 문제니?
        남: 저는 저희가 사이좋게 지내고 있었다고 생각했지만, 그는 공평하게 분담한 자신의 몫을 잘 해내고 있지 않아요. 우리는 이틀 안에 프로젝트를 제출해야 하는데, 그는 본인 일을 끝내지 않았어요. 저는 정말 스트레스를 받아요.
       여: `}
      <Typography textDecoration={'underline'} weight={'var(--font-weight-bold)'}>
        네가 어떤 기분일지 이해해.
      </Typography>
      {`

      여자: `}
      <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)'></Typography>
      {` 네 걱정에 대해 그에게 말해 보는 것은 어때?
      ①나는 네가 틀렸다고 생각해.
      ②나는 네가 정말 자랑스러워.
      ③그렇게 말해줘서 고마워.
      ④네가 어떤 기분일지 이해해.
      ⑤나는 그가 널 좋아하지 않는다고 확신해.`}
    </>
  );

  const [mark, setMark] = useState<TMarkType>('none');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerText: headerText,
      headerPattern: 'text',
    }),
    [headerText],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: questionText,
      markSize: 'middle',
      mark: mark,
    }),
    [mark, questionText],
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

  const isCorrect = useMemo(() => cardData[pageNumber].selectedIdx === answer - 1, [cardData[pageNumber].selectedIdx, answer]);
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
            {question.split(underlineText)[0]}
            <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>
            {question.split(underlineText)[1]}
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
            {choices[answer - 1]}
          </AnswerTagBox>
          <AnswerTagBox label='해설'>{explanation}</AnswerTagBox>
          <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>
          <AnswerTagBox label='해석'>{translation}</AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
