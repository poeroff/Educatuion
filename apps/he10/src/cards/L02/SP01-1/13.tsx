import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP01_1 } from './store';

interface pageType {
  _page?: string;
}

const P13 = ({ _page = 'P13' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_1);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 3;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 대화를 듣고, 두 사람이 하기로 한 일로 가장 적절한 것을 고르시오.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-1/HE1-L02-SP01-1-P13.mp3',
  };

  const data: IHE00401Data[] = [
    {
      text: '책 주문하기',
    },
    {
      text: '서점에서 책 빌리기',
    },
    {
      text: '시 낭송 행사에 참석하기',
    },
    {
      text: '도서관에서 공부하기',
    },
    {
      text: '소설 시나리오 작성하기',
    },
  ];

  const explanation =
    '여자가 토요일 동네 서점에서 열리는 시 낭송 행사에 같이 가자고 제안하고 있고, 이 제안에 남자가 흔쾌히 수락하는 상황이므로, 두 사람이 하기로 한 일로 가장 적절한 것은 3번이다.';
  const script =
    'B: Hey, Yumin. You seem really focused. What are you working on?\n' +
    'G: Oh, hi, Brent. I’m trying to understand the poem we learned in class. I’m really interested in poetry.\n' +
    'B: Really? That’s cool. Personally, I find poems a bit boring. I prefer novels.\n' +
    'G: Well, I think poems tell stories and express emotions just like novels do, but they just do so in a different way.\n' +
    'B: But sometimes they’re so unclear and hard to understand. We have to read between the lines to figure out the message. \n' +
    'G: I know what you mean, but that’s what makes poetry beautiful. There’s no right answer, and everyone can interpret a poem differently.\n' +
    'B: Hmm, I see. You seem to really love reading poetry. Perhaps I’ll give it a try.\n' +
    'G: Actually, there’s a poetry reading event at the local bookstore on Saturday. Would you like to come with me?\n' +
    'B: Sure, why not? It could be a good chance to start appreciating poetry.\n' +
    'G: Absolutely! Let’s meet at the bookstore at 3 p.m. then.\n';
  const translation =
    '남: 안녕, 유민아. 너 정말 집중한 것 같네. 무슨 일을 하고 있는 거야?\n' +
    '여: 오, 안녕, Brent. 나는 우리가 수업 시간에 배운 시를 이해하려고 노력하고 있어. 나는 시에 정말 관심이 많아.\n' +
    '남: 그래? 멋지네. 개인적으로 나는 시가 좀 지루하다고 생각해. 나는 소설이 더 좋아.\n' +
    '여: 글쎄, 나는 시가 소설이 하는 것처럼 이야기하고 감정을 표현하지만, 단지 다른 방식으로 한다고 생각해.\n' +
    '남: 하지만 그것들은 때론 너무 불분명하고 이해하기가 어려워. 메시지를 파악하기 위해 행간을 읽어야만 하잖아. \n' +
    '여: 무슨 말인지는 알지만, 그게 바로 시를 아름답게 만드는 거야. 정답도 없고 누구나 시를 다르게 해석할 수 있으니까.\n' +
    '남: 음, 알겠어. 너는 정말 시 읽는 것을 좋아하는 것 같네. 나도 한 번 시도해 볼게.\n' +
    '여: 사실 토요일에 동네 서점에서 시 낭송 행사가 있어. 같이 갈래?\n' +
    '남: 물론이지, 왜 안 되겠어? 시 감상을 시작할 수 있는 좋은 기회가 될 수도 있겠네.\n' +
    '여: 당연하지! 그럼 오후 3시에 서점에서 만나자.\n';

  const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
    <>
      <Box marginTop={marginTop}>
        <Tag type={ETagLine.GREEN} label={label} />
      </Box>
      <Box marginTop='10px'>
        <Typography size={EStyleFontSizes.MEDIUM} usePre>
          {children}
        </Typography>
      </Box>
    </>
  ));

  const [isShow, setShow] = useState<boolean>(false);
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
      setShow(!isShow);
    } else {
      submitAnswer();
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p13.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={cardData.p13.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p13.selectedIdx === null}
      onSubmit={handleSubmitClick}
      bodyId='targetContainer'
    >
      <Box vAlign='center' useFull>
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
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

export default P13;
