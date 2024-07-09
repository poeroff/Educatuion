import { TMainHeaderInfoTypes, BoxWrap, EStyleButtonTypes, Typography, Textarea, BottomSheet, Box, Tag, ETagLine } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L04SP05 } from './store';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const PAGE_NUMBER = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP05);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '자유 영작',
    headerPattern: 'text',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(PAGE_NUMBER, 1, 1, value);
    setUserAnswers(value);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsCompleted(!isCompleted);
    } else {
      submitAnswer();
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === PAGE_NUMBER)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE_NUMBER)!.userSubmission[0].inputData[1]);
    }
    submitData(PAGE_NUMBER, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    setUserAnswers(cardData.p02.answer1);
  }, [cardData.p02.answer1]);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 써 봅시다.',
  };

  const checkDisableInput = () => {
    return userAnswers.trim().length == 0;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : !isCompleted ? '답안 보기' : '답안 닫기'}
      onSubmit={() => {
        handleSubmit();
      }}
      submitBtnColor={
        cardData.p02.isSubmitted || checkDisableInput()
          ? isCompleted
            ? EStyleButtonTypes.SECONDARY
            : cardData.p02.isSubmitted
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p02.isSubmitted && checkDisableInput()}
    >
      <BoxWrap justifyContent={'center'} width={950}>
        <Typography>
          What industry do you think will benefit from AI, and why do you think so? Use an expression you learned in this lesson.
        </Typography>
      </BoxWrap>
      <BoxWrap justifyContent={'center'} marginTop={60}>
        <Textarea
          height='200px'
          value={userAnswers}
          onChange={e => handleInputChange(e.target.value)}
          readOnly={cardData.p02.isSubmitted}
          placeholder='내용을 넣어 주세요.'
        />
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isCompleted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              One of the AI technologies I use in my daily life is the AI-generated call summary, which automatically summarizes my phone
              conversations. This technology makes it easy to identify the essential points of the conversations using keywords. Sometimes, I’m
              surprised at how accurately it analyzes what I said.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              <Typography>
                여러분은 현재 일상생활에서 어떻게 AI 를 사용하나요? 이 단원에서 배운 주요 표현을 활용하여 이것에 대한 짧은 글을 써 보세요.
              </Typography>
              <Typography>
                내가 일상생활에서 사용하는 AI 기술 중 하나는 AI 로 생성되는 통화 요약으로, 전화 통화를 자동으로 요약해 준다. 이 기술은 주요 단어를
                사용하여 대화의 중요한 점을 확인하는 것을 쉽게 만든다. 가끔 나는 그 기술이 내가 말한 것을 얼마나 정확하게 분석하는지에 놀란다.
              </Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
