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
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AnswerTagBox from './components/AnswerTagBox';
import L04SP011State from './store';

const P13 = ({ _page = 'P13' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP011State);

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE1-L04-SP01-1-P13.mp3',
  };

  const choices = [
    "All right. I'll get them now.",
    'Thank you. It was a big help.',
    "Right. I'll do it right from now on.",
    "I'm glad you have everything you need.",
    "Okay. I'll figure out another way of recycling socks.",
  ];
  const answer = 1;
  const explanation =
    '낡아서 버릴 양말을 재활용하는 차원에서 인형을 만들고 있는 아빠와 딸의 대화로, 딸도 인형을 만들고 싶다고 말하자 아빠는 낡은 양말을 가져오라고 말했다. 따라서 딸의 대답으로 가장 적절한 것은 1 번이다.';
  const script = (
    <>
      {`G: Hey, Dad. What are you doing? Are you sewing up holes in your socks?
    M: Good morning, Amy. I'm actually making some dolls for your little sister. It's a great way to recycle socks that have holes in them or are out of style.
    G: That's so cool. You're giving new life to things that would have been thrown away.
    M: Yes. Why don't you make one with me?
    G: Really? I'd love to! What do I need?
    M: Just bring some of your old socks. I already have everything else.
    G: `}
      <Typography useGap={false} textDecoration={'underline'} weight={'var(--font-weight-bold)'}>
        All right. I'll get them now.
      </Typography>
    </>
  );
  const translation = (
    <>
      {`여 : 아빠. 뭐하고 계세요? 양말에 난 구멍을 꿰매고 계시나요?
      남 : 안녕, Amy. 사실은 네 여동생을 위해 인형을 만드는 중이야. 구멍이 났거나 유행이 지난 양말을 재활용하기에 아주 좋은 방법이지.
      여 : 그거 정말 좋네요. 버려졌을 물건에 새로운 생명을 주시는 거네요.
      남 : 그렇지. 나랑 같이 하나 만들어 보는 게 어때?
      여 : 정말요? 그러고 싶어요! 뭐가 필요한가요?
      남 : 그냥 네 낡은 양말 몇 개를 가져오렴. 다른 건 이미 다 있어.
      여 : `}
      <Typography useGap={false} textDecoration={'underline'} weight={'var(--font-weight-bold)'}>
        알겠어요 . 지금 가져올게요 .
      </Typography>
      {`

      딸: `}
      <Typography type='blank' width='200px' title='빈칸' boxColor='var(--color-black)'></Typography>
      {`
      ① 알겠어요. 지금 가져올게요.
      ② 감사합니다. 큰 도움이 되었어요.
      ③ 맞아요. 이제부터는 제대로 할게요.
      ④ 필요한 게 다 있으시다니 다행이에요.
      ⑤ 네. 양말을 재활용할 다른 방법을 찾아 볼게요.`}
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
      text: '1. 대화를 듣고, 아빠의 마지막 말에 대한 딸의 응답으로가장 적절한 것을 고르시오.',
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

  const isCorrect = useMemo(() => cardData.p13.selectedIdx === answer - 1, [cardData.p13.selectedIdx]);
  useEffect(() => {
    if (cardData.p13.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p13.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p13: {
            ...prev.p13,
            selectedIdx: userSubmissionList[0].inputData[0]?.value ?? prev.p13.selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
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
            value: cardData.p13.selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRowClick = (index: number) => {
    if (cardData.p13.isSubmitted) return;

    setCardData(prev => ({ ...prev, p13: { ...prev.p13, selectedIdx: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p13.isSubmitted) {
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
      submitLabel={cardData.p13.isSubmitted ? (isModalOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p13.selectedIdx == null}
      submitBtnColor={
        cardData.p13.selectedIdx != null ? (isModalOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmitClick}
    >
      <Box useFull hAlign='center' padding='20px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound>
            Daughter: <Typography type='blank' width='500px' title='빈칸' boxColor='var(--color-black)'></Typography>
          </Box>
          <Box width='910px'>
            <List
              gap={4}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index - 1 === cardData.p13.selectedIdx}
                  onClick={() => handleRowClick(index - 1)}
                  readOnly={cardData.p13.isSubmitted}
                  isError={cardData.p13.isSubmitted && cardData.p13.selectedIdx !== answer - 1}
                >
                  <Box vAlign='center'>
                    <Label value={index} marginRight={8} />
                    {value?.text}
                  </Box>
                </Radio>
              )}
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isModalOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {answer}
          </AnswerTagBox>
          <AnswerTagBox label='문제해설'>{explanation}</AnswerTagBox>
          <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>
          <AnswerTagBox label='해석'>{translation}</AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
