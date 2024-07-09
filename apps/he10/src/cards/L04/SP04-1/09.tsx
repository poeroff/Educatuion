import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  IQuestionProps,
  Radio,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  List,
  Label,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP041State from './store';

const P09 = ({ _page = 'P09' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP041State);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        1. 다음 중 밑줄 친 부분이 어법상{' '}
        <Typography fontSize='18' textDecoration='underline' useGap={false}>
          틀린
        </Typography>{' '}
        것을 고르시오.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  const data = [
    {
      text: (
        <>
          We hurried back to home with night{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            coming
          </Typography>{' '}
          on.
        </>
      ),
      stext: 'We hurried back to home with night coming on.',
      id: 1,
    },
    {
      text: (
        <>
          When eating, you have to eat with your mouth{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            closed
          </Typography>.
        </>
      ),
      stext: 'When eating, you have to eat with your mouth closed.',
      id: 2,
    },
    {
      text: (
        <>
          With all his works{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            completing
          </Typography>, he decided to take a break.
        </>
      ),
      stext: 'With all his works completing, he decided to take a break.',
      id: 3,
    },
    {
      text: (
        <>
          Henry always helps those in need with a heart {' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            filled
          </Typography>{' '}
          with kindness.
        </>
      ),
      stext: 'Henry always helps those in need with a heart filled with kindness.',
      id: 4,
    },
    {
      text: (
        <>
          With many people {' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            donating
          </Typography>{' '}
          to the charity, the event was a great success.
        </>
      ),
      stext: 'With many people donating to the charity, the event was a great success.',
      id: 5,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
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
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p09.isSubmitted) {
      setShowAnswer(!showAnswer);
      return;
    }
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
    submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
  };

  const setAnswerIdx = (answerIndex: number) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer: answerIndex } }));
    changeData(_page.toUpperCase(), 1, 1, answerIndex);
    if (answerIndex > 0) {
      setIsSubmittable(true);
    }
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p09.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p09.isSubmitted && cardData.p09.answer === 0}
      submitBtnColor={cardData.p09.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box useFull hAlign='center' padding='50px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <List
            gap={25}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.stext}
                value={value?.id === cardData.p09.answer}
                onClick={() => setAnswerIdx(value ? value.id : 0)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.answer !== cardData.p09.solution}
              >
                <Label value={index} /> {value?.text}
              </Radio>
            )}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              {cardData.p09.solution}
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              3번에서 명사구 all his works와 complete의 관계가 수동이므로 completed가 적절하다. 따라서 어법상 틀린 것은 3번이다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='12px'>
            <Typography>1. 밤이 다가와, 우리는 서둘러 집으로 돌아갔다.</Typography>
            <Typography>2. 먹을 때, 입을 다물고 먹어야 한다.</Typography>
            <Typography>3. 일이 모두 완료되고 나서, 그는 휴식을 취하기로 했다.</Typography>
            <Typography>4. Henry는 항상 친절한 마음으로 도움이 필요한 사람들을 도와준다.</Typography>
            <Typography>5. 많은 사람이 자선단체에 기부하며 행사는 큰 성공을 거두었다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
