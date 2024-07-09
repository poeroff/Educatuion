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
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP03_1 } from './store';

const P16 = ({ _page = 'P16' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>1. 글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.</Typography>,
    mark: cardData.p16.isSubmitted ? (cardData.p16.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(1)',
    },
    {
      text: '(2)',
    },
    {
      text: '(3)',
    },
    {
      text: '(4)',
    },
    {
      text: '(5)',
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
    if (cardData.p16.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p16.answer === cardData.p16.solution;
      setCardData(prev => ({ ...prev, p16: { ...prev.p16, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p16.answer,
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
    if (cardData.p16.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p16.answer;
      const defaultCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p16: {
            ...prev.p16,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultCorrect,
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
    setCardData(prev => ({ ...prev, p16: { ...prev.p16, answer: index } }));
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
      submitLabel={cardData.p16.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p16.isSubmitted && cardData.p16.answer === 0}
      submitBtnColor={
        cardData.p16.isSubmitted
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
      <Box useFull hAlign='center' flexDirection='column' gap='20px'>
        <Box width='100%' vAlign='center' display='inline' alignContent='center' padding='20px' height='30%' background='white' useRound>
          Sometimes, there were lines that were difficult to remember.
        </Box>
        <BoxWrap>
          <Box height='300px' width='594px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <Typography>
                Trying to find a way out of the ashes of the past, Nani began to write the whakapapa again with his shaky hands. He chanted the names
                of the ancestors, joining the past to the present once more. The village went quiet and listened to his chanting. ( 1 ) His voice
                traveled along the lines of our genealogy, searching back across the centuries. ( 2 ) Then his voice suddenly stopped in the middle of
                the chant. ( 3 ) The village waited in worried silence until the next name burst out of his mouth. ( 4 ) It took Nani Tama almost two
                years to gather most of the whakapapa, but there were still missing names he needed to fill in. ( 5 ) Now, he wanted me to drive him
                to Murupara to finish his work.
              </Typography>
            </Scroll>
          </Box>
          <Box useFull flex='1'>
            <Scroll height='300px' tabIndex={0}>
              <List
                gap={2}
                data={data}
                row={({ value, index = 1 }) => (
                  <Radio
                    type={'square'}
                    align='vertical'
                    name={'radio-question-A'}
                    label={value?.text}
                    value={index === cardData.p16.answer}
                    onClick={() => handleChange(index)}
                    readOnly={cardData.p16.isSubmitted}
                    isError={cardData.p16.isSubmitted && cardData.p16.answer !== cardData.p16.solution}
                  >
                    <BoxWrap alignItems='baseline'>
                      <Label value={index} />
                      <Typography>{value?.text}</Typography>
                    </BoxWrap>
                  </Radio>
                )}
              />
            </Scroll>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p16.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              주어진 문장은 ‘때로는 기억하기에 어려운 행도 있었다.’라는 내용으로, lines(행)이 핵심어로 사용되었다. 2번 앞 문장의 the lines of our
              genealogy에서 the lines가 언급되고 있고 2번 뒤에서는 그때는 그의 목소리가 낭송 중간에 갑자기 멈췄다는 내용이 나온다. 따라서 2번 다음
              문장의 Then(그때는)은 기억하기에 어려운 계보가 있었을 때를 가리킨다고 볼 수 있으므로, 주어진 문장은 2번에 들어가는 것이 가장 자연스럽다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              과거의 잿더미로부터 길을 찾아가면서 할아버지는 떨리는 손으로 와카파파를 다시 쓰기 시작했다. 그는 조상들의 이름을 낭송하면서 과거를
              현재와 다시 한번 연결했다. 마을은 조용히 할아버지의 읊조림을 들었다. 그의 목소리는 우리 족보의 한줄 한줄을 따라 흩어졌고, 수 세기를
              거슬러 올라갔다. <u>때로는 기억하기 어려운 행도 있었다.</u> 그러면 그의 목소리가 낭송 중간에 갑자기 멈췄다. 마을 사람들은 그의 입에서
              다음 이름이 터져 나올 때까지 걱정스러운 침묵 속에서 기다렸다. 할아버지가 대부분의 와카파파를 다시 완성하는 데는 거의 2년이 걸렸지만,
              여전히 채워야 할 빠진 이름들이 있었다. 이제 할아버지는 남은 작업을 완성하시기 위해, 내가 그를 Murupara에 데려다주기를 원하셨다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P16;
