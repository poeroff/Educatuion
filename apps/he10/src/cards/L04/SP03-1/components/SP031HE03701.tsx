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
  Input,
  InputStatus,
  IQuestionProps,
  List,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP031State from '../store';

interface IL04SP031 {
  headerText: string;
  questionText: React.ReactNode;
  word: string;
  choices?: string[];
  answer: string;
  pageNumber: string;
  pageState: string;
}

const SP031HE03701 = ({ headerText, questionText, word, choices, answer, pageNumber, pageState }: IL04SP031) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP031State);

  const PAGE_NUM = pageNumber.toUpperCase();

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerText,
      headerPattern: 'text',
    }),
    [],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: questionText,
      markSize: 'middle',
      mark,
    }),
    [mark],
  );

  const answerIndex = useMemo(() => choices?.findIndex(choice => choice === answer), [answer, choices]);
  const selectedIndex = useMemo(() => choices?.findIndex(choice => choice === cardData[pageState].answer), [cardData[pageState].answer, choices]);

  const isCorrect = useMemo(() => {
    if (choices) {
      return selectedIndex === answerIndex;
    } else {
      return cardData[pageState].answer.trim().toLowerCase() === answer;
    }
  }, [selectedIndex, answerIndex, cardData[pageState].answer]);

  useEffect(() => {
    if (cardData[pageState].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageState].isSubmitted, isCorrect]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageState]: {
            ...prev[pageState],
            answer: userSubmissionList[0].inputData[0]?.value || prev[pageState].answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, [pageState]: { ...prev[pageState], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageState].answer.trim(),
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleSubmit = () => {
    if (cardData[pageState].isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleRadioClick = (index: number) => {
    if (cardData[pageState].isSubmitted) return;

    setCardData(prev => ({ ...prev, [pageState]: { ...prev[pageState], answer: choices?.[index] } }));
    changeData(PAGE_NUM, 1, 1, choices?.[index]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, [pageState]: { ...prev[pageState], answer: e.target.value } }));
    changeData(PAGE_NUM, 1, 1, e.target.value);
  };
  5;

  const isSubmitDisabled = useMemo(() => {
    if (cardData[pageState].isSubmitted) {
      return false;
    }

    if (choices) {
      return selectedIndex === -1;
    } else {
      return !cardData[pageState].answer.trim();
    }
  }, [cardData[pageState].isSubmitted, selectedIndex, cardData[pageState].answer]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={showAnswer ? '답안 닫기' : cardData[pageState].isSubmitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography fontSize='36px' weight='var(--font-weight-bold)'>
            {word}
          </Typography>
        </Box>
        <BoxWrap marginLeft={4}>
          {choices ? (
            <List
              align='horizontal'
              data={choices}
              gap={25}
              row={({ value, index = 1 }) => (
                <Box width='286px' textAlign='center'>
                  <Radio
                    type={'box'}
                    align='vertical'
                    label={value}
                    ariaLabel={value}
                    value={index - 1 === selectedIndex}
                    onClick={() => handleRadioClick(index - 1)}
                    isError={cardData[pageState].isSubmitted && selectedIndex !== answerIndex}
                    readOnly={cardData[pageState].isSubmitted}
                  >
                    {value}
                  </Radio>
                </Box>
              )}
            />
          ) : (
            <Box flex='1' textAlign='center'>
              <Input
                placeholder='내용을 넣어 주세요.'
                maxLength={99}
                width='50%'
                status={
                  cardData[pageState].answer.trim()
                    ? cardData[pageState].isSubmitted && cardData[pageState].answer.trim().toLowerCase() !== answer
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                onChange={e => handleInputChange(e)}
                value={cardData[pageState].answer}
                readOnly={cardData[pageState].isSubmitted}
                ariaLabel='답 입력란'
              />
            </Box>
          )}
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default SP031HE03701;
