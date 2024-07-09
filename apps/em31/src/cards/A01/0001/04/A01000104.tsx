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
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { CalculateSolutionTable, CalculateTable, Container, TMathExpression, TSolutionContent } from '@maidt-cntn/ui/math';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01000104Atom } from './store';
import { isNumber } from '@maidt-cntn/util/CommonUtil';

interface IA01000104Props {
  currentPage: 'P02' | 'P03';
  mathExpression1: TMathExpression;
  mathExpression2: TMathExpression;
  solutionContents1: TSolutionContent[];
  solutionContents2: TSolutionContent[];
  description: string;
  answer: string;
}

const A01000104 = ({ description, mathExpression1, mathExpression2, solutionContents1, solutionContents2, currentPage, answer }: IA01000104Props) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01000104Atom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const containerId = `A01000104${currentPage}`;

  const defaultSubmission: userSubmissionType<number | ''>[] = [
    {
      mainKey: 1,
      inputData: [1, 2].map(subKey => ({
        subKey,
        type: 'NUMBER',
        value: '',
        isAnswer: true,
      })),
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<number>(userId, pageId);
      setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isInited: true } }));
      if ((userSubmissionList?.length ?? 0) > 0) {
        setCardData(prev => {
          const questions =
            userSubmissionList?.[0].inputData.map((data, index) => {
              const solution = prev[currentPage].questions[index].solution;
              return {
                answer: data.value,
                solution,
                isCorrect: data.value === solution,
              };
            }) ?? [];
          return {
            ...prev,
            [currentPage]: {
              ...prev[currentPage],
              isSubmitted,
              questions,
            },
          };
        });
      }

      initData(currentPage, userSubmissionList!, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const submitAnswer = () => {
    if (cardData[currentPage].isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: cardData[currentPage].questions.map((question, idx) => ({
          subKey: idx + 1,
          type: 'NUMBER',
          value: question.answer,
          isAnswer: question.answer === question.solution,
        })),
      },
    ];
    submitData(currentPage, userSubmission);
  };

  const handleChange = ({ subKey, value }: { subKey: number; value: string }) => {
    setCardData(prev => {
      const valueNumber = value && parseInt(value);
      const newQuestions = prev[currentPage].questions.map((question, idx) => {
        if (idx === subKey - 1) {
          return { ...question, answer: valueNumber };
        }
        return question;
      });
      return {
        ...prev,
        [currentPage]: {
          ...prev[currentPage],
          questions: newQuestions,
        },
      };
    });
    changeData(currentPage, 1, subKey, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };
  const { isSubmitted, isInited } = cardData[currentPage];
  const markType: TMarkType = isSubmitted
    ? cardData[currentPage].questions.every(question => question.answer === question.solution)
      ? 'correct'
      : 'incorrect'
    : 'none';

  const status = cardData[currentPage].questions.map(question => {
    const submittedStatus = question.answer === question.solution ? InputStatus.ENABLE : InputStatus.ERROR;
    const submitBeforeStatus = question.answer ? InputStatus.ENABLE : InputStatus.DEFAULT;
    const status = isSubmitted ? submittedStatus : submitBeforeStatus;
    return status;
  });

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        {description}
      </>
    ),
    mark: markType,
  };

  const handleCalculateTableChange = useCallback((value: string) => {
    handleChange({ subKey: 1, value });
  }, []);

  const [subKey1Value, subKey2Value] = useMemo(() => {
    return cardData[currentPage].questions.map(({ answer }) => `${answer ?? ''}`);
  }, [cardData, currentPage]);

  const buttonColor = isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;

  const isValid = cardData[currentPage].questions.every((question, index) => {
    if (index === 0) {
      return (question.answer || 0) > 10;
    } else {
      return question.answer !== undefined && question.answer !== '';
    }
  });
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  return (
    <Container
      bodyId={containerId}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitLabel}
      submitBtnColor={buttonColor}
      onSubmit={submitAnswer}
      vAlign='flex-start'
      submitDisabled={!isValid && !isSubmitted}
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='row' justifyContent='space-around' useRound useFull>
          <div>
            <CalculateTable
              mathExpression={mathExpression1}
              onChange={handleCalculateTableChange}
              submitted={isSubmitted}
              defaultValue={subKey1Value}
              key={`${isInited}-isInited`}
            />
          </div>
          <Box marginTop='24px'>
            <Typography>{mathExpression2}=</Typography>
            <Input
              width='130px'
              value={subKey2Value}
              maxLength={3}
              onChange={({ target: { value } }) => {
                isNumber(value) && handleChange({ subKey: 2, value });
              }}
              ariaLabel={`${mathExpression2}의 값`}
              readOnly={isSubmitted}
              status={isSubmitted && !subKey2Value ? InputStatus.ERROR : status[1]}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={containerId}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{answer}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <CalculateSolutionTable mathExpression={mathExpression1} solutionContents={solutionContents1} />
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <CalculateSolutionTable mathExpression={mathExpression2} solutionContents={solutionContents2} />
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default A01000104;
