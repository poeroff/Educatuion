import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Radio,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
  List,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP01_1 } from './store';

const P04 = ({ _page = 'P04' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 단어의 알맞은 뜻을 고르세요.',
    mark: cardData.P04.isSubmitted ? (cardData.P04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      id: 1,
      text: '배열하다',
    },
    {
      id: 2,
      text: '목표로 삼다',
    },
    {
      id: 3,
      text: '번역하다',
    },
  ];

  const answer = '번역하다';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.P04.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.P04.answer === cardData.P04.solution;

      setCardData(prev => ({ ...prev, P04: { ...prev.P04, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.P04.answer,
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
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P04: {
            ...prev.P04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: number) => {
    setCardData(prev => ({ ...prev, P04: { ...prev.P04, answer: value } }));
    changeData(_page.toUpperCase(), 1, 1, value);
    if (value !== null) {
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
      submitLabel={cardData.P04.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.P04.isSubmitted && cardData.P04.answer === null}
      submitBtnColor={
        cardData.P04.isSubmitted
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
      <Box useFull flexDirection='column' hAlign='center' gap='48px' width={920}>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-36)'>
            translate
          </Typography>
        </Box>
        <BoxWrap>
          <Box vAlign='center' useFull>
            <List
              data={data}
              align='horizontal'
              gap={25}
              row={({ value, index = 1 }) => (
                <Box flex={1} textAlign='center' width={'287px'}>
                  <Radio
                    type={'box'}
                    align='vertical'
                    name={'radio-question-A'}
                    label={value?.text}
                    key={index}
                    value={value?.id === cardData.P04.answer}
                    onClick={() => handleChange(index)}
                    readOnly={cardData.P04.isSubmitted}
                    isError={cardData.P04.isSubmitted && cardData.P04.answer !== cardData.P04.solution}
                  >
                    <Typography weight='var(--font-weight-medium)' fontSize='var(--font-size-28)'>
                      {value?.text}
                    </Typography>
                  </Radio>
                </Box>
              )}
            ></List>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px' padding='4px 12px'>
            <Typography>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
