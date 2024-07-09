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
    text: <Typography>2. 각 네모 안에서 어법에 맞는 표현으로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p10.isSubmitted ? (cardData.p10.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(A)do – (B)was – (C)lies',
    },
    {
      text: '(A)do – (B)were – (C)lie',
    },
    {
      text: '(A)do – (B)were – (C)lies',
    },
    {
      text: '(A)does – (B)were – (C)lie',
    },
    {
      text: '(A)does – (B)was – (C)lies',
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
          <Box height='380px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>Rarely (A)[do / does] people want to put up with a lot of noise.</Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>At the top of the mountain (B)[was / were] a couple of climbers drinking hot chocolate.</Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>▪In the heart of the city (C)[lies/ lie] a beautiful park where people can relax.</Typography>
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
              (A) 부정어 Rarely가 강조를 위해 문장 앞쪽에 위치한 경우로, 일반동사가 쓰인 문장에서는 {'<'}부정어+do/does/did+주어+동사원형{'>'}의
              어순으로 쓰인다. 따라서 문장의 주어인 people에 맞게 do를 쓰는 것이 적절하다.
            </Typography>
            <Typography>
              (B) 장소를 나타내는 부사(구)가 강조를 위해 문장 앞쪽에 위치한 경우로, 주어와 동사의 도치가 일어난다. 이때, 주어는 복수인 a couple of
              climbers (drinking hot chocolate)이므로, 주어의 수에 맞게 were를 쓰는 것이 적절하다.
            </Typography>
            <Typography>
              (C) 장소를 나타내는 부사(구)가 강조를 위해 문장 앞쪽에 위치한 경우로, 주어와 동사의 도치가 일어난다. 이때, 주어는 단수인 a beautiful
              park (where people can relax)이므로, 주어의 수에 맞게 lies를 쓰는 것이 적절하다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>▪ 좀처럼 사람들은 많은 소음을 견디고 싶어 하지 않는다.</Typography>
            <Typography>▪ 산 꼭대기에는 뜨거운 초콜릿을 마시고 있는 등산객 두세 명이 있었다.</Typography>
            <Typography>▪ 도시의 중심부에는 사람들이 쉴 수 있는 아름다운 공원이 있다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
