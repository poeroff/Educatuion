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

const P09 = ({ _page = 'P09' }) => {
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
    text: <Typography>1. 빈칸에 공통으로 들어갈 말이 차례대로 짝지어진 것을 고르시오.</Typography>,
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: 'It - for - to',
    },
    {
      text: 'It - to - for',
    },
    {
      text: 'It – for - that',
    },
    {
      text: 'That – of - to',
    },
    {
      text: 'That – for - which',
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
    if (cardData.p09.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p09.answer === cardData.p09.solution;
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p09.answer,
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
          p09: {
            ...prev.p09,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p09.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p09;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer: index } }));
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
      submitLabel={cardData.p09.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p09.isSubmitted && cardData.p09.answer === 0}
      submitBtnColor={getButtonColor()}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box width='594px'>
          <Box height='300px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>
                  <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>is possible
                  <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>drivers
                  <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>focus on driving without being
                  disturbed.
                </Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>▪</Box>
                <Typography>
                  <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>is crucial
                  <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>individuals
                  <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>be aware of the impact of
                  misinformation on public opinion.
                </Typography>
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
                  value={index === cardData.p09.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.answer !== cardData.p09.solution}
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
            <Typography>{cardData.p09.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              주어가 긴 경우 주어 자리에 가주어 it을 쓰고, 진주어는 보통 to부정사(구)의 형태를 취하며 문장 뒤쪽에 위치한다. to부정사의 의미상 주어를
              나타낼 때는 {'<'}for+명사(대명사){'>'}형태로 쓰므로, 첫 번째 빈칸에는 It, 두 번째 빈칸에는 for, 세 번째 빈칸에는 to를 넣는 것이
              적절하다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>▪ 운전자가 방해받지 않고 운전에 집중하는 것이 가능하다.</Typography>
            <Typography>▪ 개개인이 잘못된 정보가 여론에 미치는 영향을 인식하는 것이 중요하다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
