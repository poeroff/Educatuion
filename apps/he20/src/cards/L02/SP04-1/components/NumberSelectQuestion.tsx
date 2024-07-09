import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Label,
  Question,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  TQuestionTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { Fragment, useEffect, useState } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';

interface INumberSelectQuestionProps {
  cardStore: INumberSelectStore;
  pageNumber: string;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  uiInfo?: IUiInfo;
}

export interface IUiInfo {
  exampleType?: TQuestionTypes;
  exampleFlex?: 'column' | 'row';
  exampleGap?: number;
  optionWidth?: number | string;
  optionGrid?: number;
  optionGap?: number;
}

export type INumberSelectStore = RecoilState<{
  [key: string]: {
    answer1: number;
    solution1: number;
    examples: string[];
    options: string[];
    correctAnswer: string;
    explanation: string;
    translations: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
}>;

const NumberSelectQuestion = ({ cardStore, pageNumber, headerInfo, questionInfo, uiInfo }: INumberSelectQuestionProps) => {
  const pageKey = pageNumber.toLowerCase();
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
          isAnswer: false,
        },
      ],
    },
  ];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(cardStore);
  const cardPageData = cardData[pageKey];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const inputData = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: inputData[0]?.value ?? cardPageData.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = (isCorrect: boolean) => {
    const { answer1 } = cardPageData;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: answer1,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, value: number) => {
    const answerKey = `answer${subKey}`;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [answerKey]: value } }));
    changeData(pageNumber, 1, subKey, value);
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

  return (
    <HE01301_2
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      uiInfo={uiInfo}
      examples={cardPageData.examples}
      options={cardPageData.options}
      answer={cardPageData.answer1}
      solution={cardPageData.solution1}
      correctAnswer={cardPageData.correctAnswer}
      explanation={cardPageData.explanation}
      translations={cardPageData.translations}
      isCorrect={cardPageData.isCorrect}
      isSubmitted={cardPageData.isSubmitted}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export interface IHE01301_2 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  uiInfo?: IUiInfo;
  examples?: string[];
  options: string[];
  answer: number;
  solution: number;
  correctAnswer: string;
  explanation?: string;
  script?: string;
  translations?: string[];
  isCorrect?: boolean;
  isSubmitted: boolean;
  onChange?: (subKey: number, value: number) => void;
  onSubmit?: (isCorrect: boolean) => void;
}

const HE01301_2 = ({
  headerInfo,
  questionInfo,
  uiInfo = { exampleFlex: 'column', exampleGap: 0, optionWidth: 100, optionGrid: 1, optionGap: 5 },
  examples,
  options,
  answer,
  solution,
  correctAnswer,
  explanation,
  script,
  translations,
  isCorrect,
  isSubmitted,
  onChange,
  onSubmit,
}: IHE01301_2) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const isAnswered = !isNaN(answer) && answer > -1;
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const changeAnswer = (index: number) => {
    onChange?.(1, index);
  };

  const checkCorrect = () => answer === solution;

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      const isCorrect = checkCorrect();
      onSubmit?.(isCorrect);
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='container'
      vAlign={'flex-start'}
      headerInfo={headerInfo}
      questionInfo={{
        mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
        ...questionInfo,
      }}
      submitBtnColor={submitBtnColor}
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      <Box display='flex' flexDirection={uiInfo.exampleFlex ?? 'column'} gap={uiInfo.exampleGap}>
        {examples && examples.length > 0 && (
          <Box useRound flex={1} width='100%' height='398px' padding='10px' marginBottom={20} background='white'>
            <Scroll>
              {examples.map((example, index) => (
                <Box key={index} vAlign='center' hAlign='center'>
                  <Question type={uiInfo.exampleType} size={EStyleSizes['SMALL']}>
                    {example.split('$').map((word, index) => (
                      <Typography
                        key={index}
                        useGap={false}
                        lineHeight='42px'
                        textDecoration={word.match(/#(.+)#/g) ? 'underline' : undefined}
                        style={{ display: 'inline' }}
                      >
                        {word.replace(/#(.+)#/g, '$1')}
                      </Typography>
                    ))}
                  </Question>
                </Box>
              ))}
            </Scroll>
          </Box>
        )}

        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='space-between'
          gap={`${uiInfo.optionGap ?? 20}px 0`}
          width={typeof uiInfo.optionWidth === 'number' ? `${uiInfo.optionWidth}%` : uiInfo.optionWidth ?? '100%'}
        >
          {options.map((option, index) => (
            <Box key={index} width={uiInfo?.optionGrid && uiInfo?.optionGrid > 0 ? `${100 / uiInfo?.optionGrid}%` : undefined}>
              <Radio
                key={answer}
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={option}
                readOnly={isSubmitted}
                isError={isSubmitted && !isCorrect}
                value={index === answer - 1}
                onClick={() => changeAnswer(index + 1)}
              >
                <Box>
                  <Label marginRight={10} value={index + 1} />
                  {option.split('$').map((word, index) => (
                    <Fragment key={index}>
                      {word.match(/#(.+)#/g) ? (
                        <Typography useGap={false} textDecoration='underline'>
                          {word.replace(/#(.+)#/g, '$1')}
                        </Typography>
                      ) : (
                        word
                      )}
                    </Fragment>
                  ))}
                </Box>
              </Radio>
            </Box>
          ))}
        </Box>
      </Box>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'auto'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {correctAnswer}
          </AnswerTagBox>
          {explanation && <AnswerTagBox label='문제해설'>{explanation}</AnswerTagBox>}
          {script && <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>}
          {translations && (
            <AnswerTagBox label='해석'>
              {translations.map((translation, index) => (
                <Typography key={index} useGap={false}>
                  {translation}
                </Typography>
              ))}
            </AnswerTagBox>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
  <>
    <Box marginTop={marginTop}>
      <Tag type={ETagLine.GREEN} label={label} />
    </Box>

    <Box marginTop='10px'>
      <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
        {children}
      </Typography>
    </Box>
  </>
));

export default NumberSelectQuestion;
