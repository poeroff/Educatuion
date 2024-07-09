import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isValidString } from '@maidt-cntn/util/CommonUtil';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IExample, L02SP05 } from './store';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '자유 영작',
  };
  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 써 봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const pageNumber = 'P02';
  const pageKey = pageNumber.toLowerCase() as 'p02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP05);
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
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const { answer1 } = cardPageData;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: answer1,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(pageNumber, userSubmission);
  };

  const handleChange = (subKey: number, value: string) => {
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
    <WritingQuestion
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      examples={cardPageData.examples}
      translations={cardPageData.translations}
      answer={cardPageData.answer1}
      correctExamples={cardPageData.correctExamples}
      isSubmitted={cardPageData.isSubmitted}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export interface IWritingQuestion {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  examples?: IExample[];
  correctExamples?: IExample[];
  translations?: string[];
  answer?: string;
  isSubmitted: boolean;
  onChange?: (subKey: number, value: string) => void;
  onSubmit?: () => void;
}

const WritingQuestion = ({
  headerInfo,
  questionInfo,
  examples,
  correctExamples,
  translations,
  answer,
  isSubmitted,
  onChange,
  onSubmit,
}: IWritingQuestion) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const isAnswered = Boolean(answer && isValidString(answer));
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const changeAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange?.(1, value);
  };

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      onSubmit?.();
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='container'
      vAlign={'flex-start'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={submitBtnColor}
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안닫기' : '답안보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      {examples?.map(({ text, underline }, index) => (
        <Typography key={index} weight={700} tabIndex={101} textDecoration={underline ? 'underline' : undefined}>
          {text}
        </Typography>
      ))}

      <Box height='220px' marginTop='10px' useFull>
        <Textarea
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          ariaLabel='답란'
          tabIndex={102}
          readOnly={isSubmitted}
          value={answer}
          onChange={changeAnswer}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='container' height='30%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <AnswerTagBox marginTop={0} label='예시 답안'>
            <Box hAlign='center' gap={6}>
              {correctExamples?.map(({ text, underline }, index) => (
                <Typography key={index} useGap={false} textDecoration={underline ? 'underline' : undefined}>
                  {text}
                </Typography>
              ))}
            </Box>
          </AnswerTagBox>

          {translations && (
            <AnswerTagBox label='해석'>
              {translations.map((translation, index) => (
                <Box key={index} marginTop={index !== 0 ? '20px' : 0}>
                  <Typography key={index} useGap={false}>
                    {translation}
                  </Typography>
                </Box>
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
      <Typography size={EStyleFontSizes.MEDIUM} usePre>
        {children}
      </Typography>
    </Box>
  </>
));

export default P02;
