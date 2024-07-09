import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Radio,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  List,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP03_1 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const currentPage = 'P04';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 말하기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 단어의 알맞은 뜻을 고르세요.',
    markSize: 'middle',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  const data = [
    {
      text: '심해지다',
      id: 1,
    },
    {
      text: '즐겁게 하다',
      id: 2,
    },
    {
      text: '주장하다',
      id: 3,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
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
    if (cardData.p04.isSubmitted) {
      setIsShowAnswer(prev => !prev);
      return;
    }
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
    submitDataWithResult('P04', userSubmission, isCorrect);
  };

  const setAnswerIdx = (answerIndex: number) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: answerIndex } }));
    changeData('P04', 1, 1, answerIndex);
    if (answerIndex > 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
        !cardData.p04.isSubmitted && cardData.p04.answer === 0
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.DEFAULT
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={handleSubmit}
    >
      <Box useFull flexDirection='column' hAlign='center'>
        <Box vAlign='center' width='685px' padding='48px 16px' hAlign='center' background='white' borderRadius={24} useShadow>
          <Typography fontSize='36px' lineHeight='50px' weight='var(--font-weight-bold)'>
            entertain
          </Typography>
        </Box>
        <BoxWrap marginTop='23px'>
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
                  onClick={() => setAnswerIdx(value ? value.id : 0)}
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
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>즐겁게 하다</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;