import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP03_1 } from './store';

const P18 = ({ _page = 'P18' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        3. 다음 글의 빈칸에 들어갈 말로 가장 적절한 것을 고르시오.
      </Typography>
    ),
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const data = [
    {
      text: 'there must be broad public understanding',
    },
    {
      text: 'extensive testing must confirm their safety',
    },
    {
      text: 'we need to protect ourselves from hackers',
    },
    {
      text: 'many tricky ethical issues should be addressed',
    },
    {
      text: 'it is important to figure out their mechanisms',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p18.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p18.answer === cardData.p18.solution;
      setCardData(prev => ({ ...prev, p18: { ...prev.p18, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p18.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (cardData.p18.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p18.answer;
      const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p18: {
            ...prev.p18,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
      if (defaultAnswer > 0) {
        setIsSubmittable(true);
      }
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p18: { ...prev.p18, answer: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p18.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p18.isSubmitted && cardData.p18.answer === -1}
      submitBtnColor={
        cardData.p18.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
        <BoxWrap useFull >
            <Box useFull background='white' useRound paddingRight='10px' marginRight='20px'>
                <Scroll>
                    <Typography tabIndex={101}>
                    &nbsp;&nbsp;&nbsp;&nbsp;Before we can fully embrace the era of AI-powered neural implants,
                    <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>. 
                    The integration of AI
                    technology with the human brain raises concerns about what it means to be human. Our brains are
                    believed to be central to our identity, existence, and value as human beings. However, an over-reliance
                    on technology may delay our natural development and create confusion about whether we are human,
                    AI, or something in between. Another critical issue is privacy. There’s a risk that organizations or hackers
                    could access personal data without permission through AI-connected implants. This means that our
                    thoughts, emotions, and behaviors could be controlled by hackers. There’s an additional risk that this
                    technology could lead to even greater social inequality, given that it may not be available to all due to
                    its high cost. Such unequal access to the technology could intensify the division between those who can
                    afford the implants and those who cannot
                    </Typography>
                </Scroll>
            </Box>

        <Box useFull >
            <List
                gap={0}
                data={data}
                row={({ value, index = 1 }) => (
                    <Radio
                        gap={0}
                        type={'square'}
                        align='horizontal'
                        name={'radio-question-A'}
                        label={value?.text}
                        value={index === cardData.p18.answer}
                        onClick={() => handleChange(index)}
                        readOnly={cardData.p18.isSubmitted}
                        isError={cardData.p18.isSubmitted && cardData.p18.answer !== cardData.p18.solution}
                    >
                        <BoxWrap alignItems='baseline'>
                            <Label value={index} />
                            <Typography tabIndex={110 + index}>{value?.text}</Typography>
                        </BoxWrap>
                    </Radio>
                )}
            />
          </Box>
          
        </BoxWrap>

        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box>
                <Tag type={ETagLine.GREEN} label='답안' />
              </Box>
              <Box marginTop='12px'>
                <Typography>{cardData.p18.solution}</Typography>
              </Box>    

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='문제해설' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                인간의 정체성 혼란 , 사생활 침해 , 사회적 불평등 심화에 관한 문제점이 언급되고 있고 이것은 윤리적 문제와 관련있으므로 , 빈칸에 들어갈 말로 가장 적절한 것은 4 번이다
                </Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                우리가 AI 기반 신경 임플란트 시대를 완전히 받아들이기 전에 ,&nbsp;    
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                    많은 까다로운 윤리적 문제들이 해결되어야 합니다.
                </u>&nbsp;AI 기술과 인간의 뇌를 통합하는
                것은 인간 존재의 의미가 무엇인지에 대한 우려를 제기할 수 있습니다 . 우리의 뇌는 인간으로서의 정체성 , 존재 , 가치의 중심이라고 여겨집니다 .
                그러나 기술에 대한 지나친 의존은 인간의 자연스러운 발달을 지연시키고 우리가 인간인지 , AI 인지 , 또는 그 중간의 무언가인지에 대한 혼란을 야기할
                수 있습니다 . 또 다른 중요한 문제는 사생활입니다 . 조직이나 해커가 AI 와 연결된 임플란트를 통해 허가 없이 개인정보에 접근할 수 있는 위험이
                있습니다 . 즉 , 우리의 생각 , 감정 , 행동이 해커에 의해 통제될 수 있다는 뜻입니다 . 이 기술은 높은 비용으로 인해 모든 사람에게 제공되지 않을 수
                있다는 점에서 , 더 큰 사회적 불평등을 초래할 수 있는 위험 또한 있습니다 . 기술에 대한 그러한 불평등한 접근은 임플란트 비용을 감당할 수 있는
                사람과 그렇지 않은 사람 사이의 격차를 심화시킬 수 있습니다.
                </Typography>
                <Typography>(1) 대중의 폭넓은 이해가 있어야 한다.</Typography>
                <Typography>(2) 광범위한 테스트를 통해 안전성을 확인해야 한다.</Typography>
                <Typography>(3) 우리는 해커로부터 우리 자신을 보호해야 한다.</Typography>
                <Typography>(4) 많은 까다로운 윤리적 문제들이 해결되어야 한다.</Typography>
                <Typography>(5) 그것의 작동 방법을 파악하는 것이 중요하다.</Typography>
              </Box>
            </Box>
        </BottomSheet>
    </Container>
  );
};

export default P18;