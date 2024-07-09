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
    audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P14.mp3',
  };

  const choices = [
    'why oceans reflect the light',
    'how sea plants absorb blue light',
    'why seas sometimes appear green',
    'why colors look different on a photo',
    'how our eyes see blue and green light',
  ];
  const ANSWER = 3;
  const explanation =
    '사진 속 바다의 색처럼 바다가 가끔 왜 초록색으로 보이는지 궁금하다고 말하고 있으므로, 빈칸에 들어갈 말로 가장 적절한 것은 3번이다.';
  const script = (
    <>
      {`G: Dad, look at this photo from our last trip to Jeju! The sea looks cool, doesn’t it?
        M: Yes, it does. It looks much more beautiful because of its green color.
        G: That’s true. But Dad, I wonder why the sea sometimes looks green like this. Shouldn’t it be blue?
        M: Seas usually look blue because the water reflects more blue light back to our eyes compared to other colors. 
        G: What about green oceans?
        M: Well, oceans appear green when the water reflects more green light. When there are sea plants and sand in the water, they absorb the blue 
            light and reflect the green light.
        G: Oh, I see. That’s interesting. Thanks for the little science lesson, Dad. I want to learn more about that.
        M: That’s a great idea. The ocean sure is a curious scientific wonder.`}
    </>
  );
  const translation = (
    <>
      {`여: 아빠, 저번 제주 여행에서 찍은 이 사진 좀 보세요! 바다가 멋져 보이지 않나요?
        남: 응, 그렇구나. 초록색 때문에 훨씬 더 아름다워 보여.
        여: 맞아요. 그런데 아빠, 가끔 바다가 왜 이렇게 초록색으로 보이는지 궁금해요. 파란색이어야 하지 않나요?
        남: 바다는 보통 파란색으로 보이는데, 왜냐하면 물이 다른 색에 비해 더 많은 파란색 빛을 우리 눈에 반사하기 때문이지.
        여: 초록색 바다는 어때요?
        남: 음, 물이 더 많은 초록색 빛을 반사할 때 바다가 초록색으로 보인단다. 물속에 바다 식물과 모래가 있으면 파란색 빛을 흡수하고 초록색 빛을 반사하지.
        여: 아, 알겠어요. 흥미롭네요. 작은 과학 수업을 해주셔서 감사해요, 아빠. 전 그것에 대해 더 배우고 싶어요.
        남: 좋은 생각이구나. 바다는 정말 신기한 과학적인 경이로움이지.

      대화에서, 딸은  `}
      <Typography useGap={false} textDecoration={'underline'} weight={'var(--font-weight-bold)'}>
        왜 가끔 바다가 초록색으로 보이는지
      </Typography>
      {` 궁금해하고 그녀의 아빠는 그것을 설명해 준다.`}
      {`
      1. 왜 바다가 빛을 반사하는지
      2. 어떻게 바다 식물이 파란색 빛을 흡수하는지
      4. 왜 색은 사진에서 다르게 보이는지
      5. 그거 좋다! 우리 모두 함께 즐거운 시간을 보내면 좋겠어!`}
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
      text: '2. 대화를 듣고, 빈칸에 들어갈 말로 가장 적절한 것을 고르시오.',
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
          let selectedIdx = prev.p13.selectedIdx;
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
      submitLabel={cardData.p14.isSubmitted ? (isModalOpen ? '답안닫기' : '답안보기') : '채점하기'}
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
