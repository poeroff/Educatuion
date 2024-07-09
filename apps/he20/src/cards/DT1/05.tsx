import { useEffect, useState, useMemo } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  IQuestionProps,
  Radio,
  TMainHeaderInfoTypes,
  List,
  Typography,
  EStyleButtonTypes,
  Label,
  BottomSheet,
  Tag,
  ETagLine,
  BoxWrap,
} from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { HE20DT1 } from './store';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(HE20DT1);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P05';
  const pageKey = 'p05';
  const choices = ['I’m thinking of watching a baseball game.', 'I’m glad to share my plan with you today.'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '의사소통기능 진단',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography fontSize='var(--font-size-32)'>다음 대화의 빈 칸에 들어갈 알맞은 문장을 골라 봅시다.</Typography>,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || prev[pageKey]?.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleRadioClick = (index: number) => {
    if (cardData[pageKey].isSubmitted) return;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: choices?.[index],
      },
    }));
    changeData(pageNumber, 1, 1, choices?.[index]);
  };

  const handleSubmit = () => {
    if (cardData[pageKey]?.isSubmitted) {
      setShowAnswer(show => !show);
    } else {
      submitAnswer && submitAnswer(isAnswer(cardData[pageKey].answer, cardData[pageKey].solution));
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const isSubmitDisabled = useMemo(() => {
    if (cardData[pageKey].isSubmitted) return false;
    if (isNotEmptyString(cardData[pageKey].answer)) return false;
    else return true;
  }, [cardData[pageKey].answer, cardData[pageKey].isSubmitted]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  const nodes: React.ReactNode[] = [
    <List
      align='horizontal'
      data={choices}
      gap={0}
      row={({ value, index = 1 }) => (
        <Box width='920px' height={'60px'} textAlign='center'>
          <Radio
            type={'box'}
            align='vertical'
            name={'radio-question-A'}
            label={value}
            ariaLabel={value}
            value={value === cardData[pageKey].answer}
            onClick={() => handleRadioClick(index - 1)}
            isError={cardData[pageKey]?.isSubmitted && cardData[pageKey]?.answer !== cardData[pageKey]?.solution}
            readOnly={cardData[pageKey]?.isSubmitted}
          >
            {value}
          </Radio>
        </Box>
      )}
      key='list'
    />,
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={showAnswer ? '답안 닫기' : cardData[pageKey]?.isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
    >
      <Box marginBottom='20px' useRound background='white' padding='10px'>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box display='flex' hAlign='vertical'>
            <Label value='A' type='paint' background='var(--color-blue-100)' />
            <Typography>What are you planning to do this Saturday?</Typography>
          </Box>

          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              &nbsp;
              <Typography type='blank' width='622px' title='빈칸' boxColor='var(--color-black)'></Typography>.
            </Box>
          </Box>
        </Box>
      </Box>

      <BoxWrap marginTop={'40px'}>{nodes}</BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{cardData[pageKey].solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
