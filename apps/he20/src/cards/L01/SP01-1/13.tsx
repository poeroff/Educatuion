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
import { L01SP01_1 } from './store';

interface pageType {
  _page?: string;
}

const P13 = ({ _page = 'P13' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP01_1);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 2;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 대화를 듣고, 두 사람이 하는 말의 주제로 가장 적절한 것을 고르시오.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P13.mp3',
    captionSrc: '/L01/SP01-1/HE2-L01-SP01-1-P13.srt',
  };

  const data: IHE00401Data[] = [
    {
      text: '자원봉사 지원 방법',
    },
    {
      text: '봉사활동에서 할 일',
    },
    {
      text: '어르신들이 좋아할 만한 요리',
    },
    {
      text: '노래를 잘 부르는 방법',
    },
    {
      text: '주말 노래경연 준비 계획',
    },
  ];

  const explanation =
    '주말 계획에 대해 묻는 질문에 Mina는 양로원에 자원봉사를 하러 간다고 했고, 그곳에서 할 일에 대해 이야기하고 있으므로 두 사람이 하는 말의 주제로 가장 적절한 것은 2번이다.';
  const script =
    'B: Mina, do you have any special plans for this weekend?\n' +
    'G: I’m thinking of volunteering at a nursing home, actually.\n' +
    'B: Sounds like a great idea. What kind of work are you planning to do there?\n' +
    'G: Well, I wanted to cook something for the elderly, but there are enough volunteers for cooking. So, I’ve decided to sing for them instead.\n' +
    'B: Oh, that’s so sweet of you. I’m sure they’ll love to hear you sing.\n' +
    'G: Thanks! I hope so. Would you like to come along?\n' +
    'B: Absolutely! Why not? I’m not a good singer, but I’ll do my best!\n' +
    'G: Great. I’ll pick you up at 10.\n';
  const translation =
    '남: Mina, 이번 주말에 특별한 계획 있어?\n' +
    '여: 사실 양로원에서 자원봉사를 하려고 생각 중이야.\n' +
    '남: 좋은 생각이네. 거기서 어떤 일을 할 계획이야?\n' +
    '여: 음, 어르신들을 위해 요리를 해드리고 싶었는데, 요리를 할 수 있는 자원봉사자들이 충분히 있어. 그래서 대신에 노래를 불러드리기로 했어.\n' +
    '남: 오, 정말 친절하구나. 그분들은 분명히 네가 노래 부르는 것을 듣고 좋아하실 거야.\n' +
    '여: 고마워! 나도 그러길 바라. 너도 같이 갈래?\n' +
    '남: 당연하지! 왜 안 되겠어? 나는 노래는 잘 못하지만, 최선을 다해 볼게!\n' +
    '여: 좋아. 내가 너를 10시에 데리러 갈게.\n';

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
      submitLabel={cardData.p13.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
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
