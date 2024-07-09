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

const P14 = ({ _page = 'P14' }: pageType) => {
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
    text: '2. 다음을 듣고, 강의의 내용과 일치하지 않는 것을 고르시오.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-1/HE1-L02-SP01-1-P14.mp3',
  };

  const data: IHE00401Data[] = [
    {
      text: '문화마다 독특한 관습 및 전통이 있다.',
    },
    {
      text: '중국에서 선물을 받은 즉시 열어보는 것은 무례한 행동이다.',
    },
    {
      text: '아이의 머리를 만지는 것은 태국에서 무례하지 않게 여겨진다.',
    },
    {
      text: '라오스에서는 사람의 머리를 만지는 것이 무례하다고 생각된다.',
    },
    {
      text: '각 문화는 우리가 존중해야 할 가치를 지니고 있다.',
    },
  ];

  const explanation =
    '아이를 포함하여 사람의 머리를 만지는 것이 태국과 라오스에서는 무례하게 여겨진다고 했으므로 강의의 내용과 일치하지 않는 것은 3번이다.';
  const script =
    'W: Hello, students. I’m Professor Clara Smith, a cultural anthropologist. We often hear the phrase “It’s a small world,” but is it really? Every culture has its own unique traditions and customs, from gestures to table manners. Something that looks common to you might seem strange or unusual to others. Let me give you some examples. In most Western countries, it’s okay to open gifts right away, but in China, it’s considered rude. Similarly, touching a person’s head, including that of a child, is impolite in Thailand and Laos, whereas it may be no big deal in other countries. So it’s important to understand different cultures when visiting other countries. As a responsible global citizen, make sure to acknowledge that each culture has its own values that we should respect. \n';
  const translation =
    '여: 학생 여러분, 안녕하세요. 저는 문화 인류학자 Clara Smith 교수입니다. 우리는 “세상이 좁다.”라는 말을 자주 듣지만, 정말 그럴까요? 모든 문화에는 몸동작부터 식사 예절에 이르기까지 고유한 전통과 관습이 있습니다. 여러분에게 평범해 보이는 것이 다른 사람에게는 이상하거나 특이하게 보일 수 있습니다. 몇 가지 예를 들어보겠습니다. 대부분의 서양 국가에서는 즉시 선물을 열어도 괜찮지만, 중국에서는 무례하게 여겨집니다. 마찬가지로 아이를 포함하여 사람의 머리를 만지는 것이 태국과 라오스에서는 무례하지만, 다른 나라에서는 별일 아닐 수 있습니다. 따라서 다른 나라를 방문할 때 다른 문화를 이해하는 것이 중요합니다. 책임감 있는 세계 시민으로서, 각 문화는 우리가 존중해야 할 가치를 가지고 있다는 것을 반드시 인정하십시오.';

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

  const isCorrect = useMemo(() => cardData.p14.selectedIdx === answer - 1, [cardData.p14.selectedIdx]);
  useEffect(() => {
    if (cardData.p14.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p14.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p14: {
            ...prev.p14,
            selectedIdx: userSubmissionList[0].inputData[0]?.value ?? prev.p14.selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
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
    if (cardData.p14.isSubmitted) return;

    setCardData(prev => ({ ...prev, p14: { ...prev.p14, selectedIdx: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p14.isSubmitted) {
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
      submitLabel={cardData.p14.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={cardData.p14.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p14.selectedIdx === null}
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
              value={index - 1 === cardData.p14.selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData.p14.isSubmitted}
              isError={cardData.p14.isSubmitted && cardData.p14.selectedIdx !== answer - 1}
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

export default P14;
