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
import L03SP012State from '../store';

interface IHE01401 {
  headerText: string;
  questionText: React.ReactNode;
  word: string;
  choices?: string[];
  answer: string;
  pageNumber: string;
}

const SP012HE03701 = ({ headerText, questionText, word, choices, answer, pageNumber }: IHE01401) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP012State);

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
  const selectedIndex = useMemo(() => choices?.findIndex(choice => choice === cardData[pageNumber].answer), [cardData[pageNumber]?.answer, choices]);

  const isCorrect = useMemo(() => {
    if (choices) {
      return selectedIndex === answerIndex;
    } else {
      return cardData[pageNumber].answer.trim().toLowerCase() === answer;
    }
  }, [selectedIndex, answerIndex, cardData[pageNumber].answer]);

  useEffect(() => {
    if (cardData[pageNumber].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageNumber].isSubmitted, isCorrect]);

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
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || prev[pageNumber].answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.trim(),
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
    if (cardData[pageNumber].isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleRadioClick = (index: number) => {
    if (cardData[pageNumber].isSubmitted) return;

    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: choices?.[index] } }));
    changeData(PAGE_NUM, 1, 1, choices?.[index]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: e.target.value } }));
    changeData(PAGE_NUM, 1, 1, e.target.value);
  };
  5;

  const isSubmitDisabled = useMemo(() => {
    if (cardData[pageNumber].isSubmitted) {
      return false;
    }

    if (choices) {
      return selectedIndex === -1;
    } else {
      return !cardData[pageNumber].answer.trim();
    }
  }, [cardData[pageNumber].isSubmitted, selectedIndex, cardData[pageNumber].answer]);

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
      submitLabel={showAnswer ? '답안닫기' : cardData[pageNumber].isSubmitted ? '답안보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
    >
      <Box useFull flexDirection='column' hAlign='center'>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow marginBottom={'48px'}>
          <Typography useGap={false} fontSize='36px' weight='var(--font-weight-bold)'>
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
                    isError={cardData[pageNumber].isSubmitted && selectedIndex !== answerIndex}
                    readOnly={cardData[pageNumber].isSubmitted}
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
                  cardData[pageNumber].answer.trim()
                    ? cardData[pageNumber].isSubmitted && cardData[pageNumber].answer.trim().toLowerCase() !== answer
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                onChange={e => handleInputChange(e)}
                value={cardData[pageNumber].answer}
                readOnly={cardData[pageNumber].isSubmitted}
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

export default SP012HE03701;
