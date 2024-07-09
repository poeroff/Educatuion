import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from './store';

const P04 = ({ _page = 'P04' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어  연습​',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography>다음 단어의 알맞은 뜻을 고르세요.</Typography>,
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const pageName = _page.toUpperCase();

  const data = [
    {
      text: '바람직한',
      id: 1,
    },
    {
      text: '주사하다',
      id: 2,
    },
    {
      text: '보람 있는',
      id: 3,
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
    if (cardData.p04.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p04.answer === cardData.p04.solution;

      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p04.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageName, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    if (!cardData.p04.isSubmitted && cardData.p04.answer > 0) {
      setIsSubmittable(true);
    }
    const pageId = pageIds.find(page => page.page === pageName)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p04.answer;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      if (!isSubmitted && defaultAnswer > 0) {
        setIsSubmittable(true);
      }
      initData(pageName, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: number) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData(pageName, 1, 1, value);
    if (value > 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageName);
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
      submitLabel={cardData.p04.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p04.isSubmitted && cardData.p04.answer === 0}
      submitBtnColor={
        cardData.p04.isSubmitted
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
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography fontSize='36px' lineHeight='50px' weight='var(--font-weight-bold)'>
            rewarding
          </Typography>
        </Box>
        <BoxWrap>
          <List
            align={'horizontal'}
            gap={25}
            data={data}
            row={({ value, index = 1 }) => (
              <Box flex='1' textAlign='center' width={287}>
                <Radio
                  type={'box'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={value?.id === cardData.p04.answer}
                  onClick={() => handleChange(value ? value.id : 0)}
                  readOnly={cardData.p04.isSubmitted}
                  isError={cardData.p04.isSubmitted && cardData.p04.answer !== cardData.p04.solution}
                >
                  {value ? value.text : ''}
                </Radio>
              </Box>
            )}
          />
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{data.find(v => v.id === cardData.p04.solution)?.text}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
