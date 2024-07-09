import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
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
import { L04SP01_1 } from './store';

const P13 = ({ _page = 'P13' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_1);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 5;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제 ',
  };

  const questionInfo = {
    text: '1. 대화를 듣고, 두 사람이 다음 생물 수업에 토론할 주제를 고르시오. ',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P13.mp3',
    captionSrc: '/L04/SP01-1/HE2-L04-SP01-1-P13.srt',
  };

  const data = [
    {
      text: '나노봇의 작동 원리',
    },
    {
      text: '의사과학자의 필요성',
    },
    {
      text: '암 치료제 개발 전망',
    },
    {
      text: '의학 발전의 윤리적 측면',
    },
    {
      text: '나노봇 활용의 문제점',
    },
  ];

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const selectedIdx = userSubmissionList[0].inputData[0]?.value;
        setCardData(prev => ({
          ...prev,
          P13: {
            ...prev.P13,
            selectedIdx: selectedIdx !== null && selectedIdx !== undefined ? selectedIdx : prev.P13.selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isCorrect = useMemo(() => cardData.P13.selectedIdx === answer - 1, [cardData.P13.selectedIdx]);

  useEffect(() => {
    if (cardData.P13.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.P13.isSubmitted, isCorrect]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, P13: { ...prev.P13, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.P13.selectedIdx,
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
    if (cardData.P13.isSubmitted) return;

    setCardData(prev => ({ ...prev, P13: { ...prev.P13, selectedIdx: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.P13.isSubmitted) {
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
      submitLabel={cardData.P13.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={cardData.P13.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.P13.selectedIdx === null}
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
              value={index - 1 === cardData.P13.selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData.P13.isSubmitted}
              isError={cardData.P13.isSubmitted && cardData.P13.selectedIdx !== answer - 1}
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
          <AnswerTagBox label='해설'>
            <Typography>
              두 사람은 나노봇이 인류에 끼치는 이로운 영향에 관해 이야기하고, 이를 위해 극복해야 할 문제가 남아 있다고 대화를 나누었다. 두 사람은 이에
              대해 생물 수업에서 더 이야기하자고 했으므로, 다음 생물 수업에서 토론할 주제는 5번이다.
            </Typography>
          </AnswerTagBox>
          <AnswerTagBox label='스크립트'>
            <Typography>G: Hey, Jacob! Have you finished reading the article “Medical Technology of the Future” for our biology class?</Typography>
            <Typography>
              B: I have. It was fun to read. Some experts say that people will be able to live up to 150 years in the near future thanks to nanobots.
            </Typography>
            <Typography>G: Oh, really? That sounds interesting. How will nanobots make it possible?</Typography>
            <Typography>
              B: They’ll be injected into our bodies to treat diseases. Nanobots will be able to target and destroy cancer cells in the body, for
              example.
            </Typography>
            <Typography>G: That’s amazing! We may all be healthier and live a lot longer in the future then.</Typography>
            <Typography>B: That’s right. But we still have a long way to go. I believe there will be many more challenges to overcome.</Typography>
            <Typography>G: I agree with you. Well, let’s discuss it more in our next biology class.</Typography>
          </AnswerTagBox>
          <AnswerTagBox label='해석'>
            <Typography>여: 안녕, Jacob! 우리 생물 수업에서 다룰 '미래의 의료 기술' 기사를 다 읽었니?</Typography>
            <Typography>
              남: 응. 재미있게 읽었어. 일부 전문가들은 나노봇 덕분에 가까운 미래에 사람들이 150년까지 살 수 있을 거라고 말하더라.
            </Typography>
            <Typography>여: 정말? 흥미롭게 들리네. 나노봇이 어떻게 그런 일을 가능하게 할까?</Typography>
            <Typography>
              남: 나노봇이 병을 치료하기 위해 우리 몸에 주입될 거래. 예를 들어 나노봇이 우리 몸의 암세포를 표적으로 삼아 파괴할 수 있을 거라고 하더라.
            </Typography>
            <Typography>여: 놀랍다! 그러면 우리 모두 미래에는 더 건강해지고 더 오래 살 수 있겠네.</Typography>
            <Typography>남: 맞아. 하지만 아직 갈 길이 멀지. 극복해야 할 과제가 더 많을 것이라고 생각해.</Typography>
            <Typography>여: 나도 동의해. 그러면 다음 생물 수업에서 더 자세히 논의해 보자.</Typography>
          </AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
