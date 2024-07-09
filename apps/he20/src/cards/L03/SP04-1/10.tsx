import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
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
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP04_1 } from './store';

const P10 = ({ _page = 'P10' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP04_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>2. 각 네모 안에서 어법에 맞는 표현으로 짝지어진 것을 고르시오.</Typography>,
    mark: cardData.p10.isSubmitted ? (cardData.p10.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: 'Despite-While-because of',
    },
    {
      text: 'Although–During–because of',
    },
    {
      text: 'Despite-During-because of',
    },
    {
      text: 'Although-During-because',
    },
    {
      text: 'Despite-While-because',
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
    if (cardData.p10.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p10.answer === cardData.p10.solution;
      setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p10.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p10: {
            ...prev.p10,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p10.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p10;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p10: { ...prev.p10, answer: index } }));
    changeData(_page, 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p10.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p10.isSubmitted && cardData.p10.answer === 0}
      submitBtnColor={getButtonColor()}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box width='460px'>
          <Box height='400px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>[Despite / Although] it rained heavily, the game continued as planned. </Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>[During / While] his busy week, he always finds time for his family.</Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>I think the accident happened [because of / because] the lack of my experience.</Typography>
              </BoxWrap>
            </Scroll>
          </Box>
        </Box>
        <Box useFull flex='1'>
          <Scroll height='398px' tabIndex={0}>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p10.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.answer !== cardData.p10.solution}
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p10.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              전치사는 명사구 앞에 쓰이고, 접속사는 절 앞에 쓰인다. 첫 번째 문장의 it rained heavily는 절이므로 Although와 함께 쓰이고, 두 번째 문장의
              his busy week과 세 번째 문장의 my lack of experience는 명사구이므로, 각각 전치사 during, because of와 함께 쓰인다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>▪ 비가 많이 왔음에도 불구하고, 경기는 계획대로 계속됐다.</Typography>
            <Typography>▪ 바쁜 한 주 동안에도, 그는 항상 가족을 위한 시간을 낸다.</Typography>
            <Typography>▪ 내 경험 부족 때문에 그 사고가 일어났다고 생각한다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
