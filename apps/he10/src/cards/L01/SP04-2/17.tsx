import {
  Box,
  Label,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  Radio,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L01SP04_2 } from './store';

const P17 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L01SP04_2);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        1. 다음 중 밑줄 친 부분이 어법상&nbsp;
        <Typography textDecoration='underline' useGap={false}>
          틀린
        </Typography>{' '}
        &nbsp;것을 고르시오.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p17.isSubmitted ? (cardData.p17.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: (
        <>
          The man{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            which
          </Typography>{' '}
          you met yesterday is a kind person.
        </>
      ),
    },
    {
      text: (
        <>
          Ms. Han is the teacher{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            whom
          </Typography>{' '}
          many students respect.
        </>
      ),
    },
    {
      text: (
        <>
          We arrived at the station{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            which
          </Typography>{' '}
          is located near the park.
        </>
      ),
    },
    {
      text: (
        <>
          Anyone{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            who
          </Typography>{' '}
          likes to dance can participate in this contest.
        </>
      ),
    },
    {
      text: (
        <>
          Did you finish reading the book{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            that
          </Typography>{' '}
          you borrowed from me?
        </>
      ),
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P17')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p17: {
            ...prev.p17,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p17.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P17', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p17.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = cardData.p17.answer === cardData.p17.solution;
      setCardData(prev => ({ ...prev, p17: { ...prev.p17, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p17.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P17', userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p17: { ...prev.p17, answer: index } }));
    changeData('P17', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P17');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p17.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p17.isSubmitted && cardData.p17.answer === 0}
      submitBtnColor={cardData.p17.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box useFull hAlign='center' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Scroll tabIndex={0} height='70%' width='910px'>
            <List gap={24} data={data}>
              {({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p17.answer}
                  defaultValue={index === cardData.p17.answer}
                  onClick={() => handleChange(index)}
                  disabled={cardData.p17.isSubmitted}
                  isError={cardData.p17.isSubmitted && cardData.p17.answer !== cardData.p17.solution}
                >
                  <Box>
                    <Label value={index} /> {value?.text}
                  </Box>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p17.solution}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              “which ~ yesterday”는 선행사 The man을 수식하는 목적격 관계대명사절로, 선행사가 사람이므로 1번 which를 who/whom/that으로 고쳐야 한다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>1. 네가 어제 만난 그 남자는 착한 사람이다.</Typography>
            <Typography>2. 한 선생님은 많은 학생들이 존경하는 선생님이다.</Typography>
            <Typography>3. 우리는 공원 근처에 위치해 있는 역에 도착했다.</Typography>
            <Typography>4. 춤추기를 좋아하는 누구든지 이 대회에 참가할 수 있다.</Typography>
            <Typography>5. 네가 나에게서 빌린 책을 다 읽었니?</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P17;
