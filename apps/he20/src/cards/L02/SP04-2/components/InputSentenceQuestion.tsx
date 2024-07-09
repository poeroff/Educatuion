import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isValidString } from '@maidt-cntn/util/CommonUtil';
import React, { useEffect, useState } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { IExample } from '../store';

interface InputSentenceQuestionProps {
  cardStore: IInputSentenceStore;
  pageNumber: string;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
}

export type IInputSentenceStore = RecoilState<{
  [key: string]: {
    answer1: string;
    correctExamples: IExample[];
    examples: IExample[];
    exampleTranslation: string;
    isSubmitted: boolean;
  };
}>;

const InputSentenceQuestion = ({ cardStore, pageNumber, headerInfo, questionInfo }: InputSentenceQuestionProps) => {
  const pageKey = pageNumber.toLowerCase();
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

  const { changeData, initData, submitData, saveData } = usePageData();
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
    <HE02202_2
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      examples={cardPageData.examples}
      exampleTranslation={cardPageData.exampleTranslation}
      answer={cardPageData.answer1}
      correctExamples={cardPageData.correctExamples}
      isSubmitted={cardPageData.isSubmitted}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export interface IHE02202_2 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  examples?: IExample[];
  correctExamples?: IExample[];
  exampleTranslation?: string;
  answer: string;
  isSubmitted: boolean;
  onChange?: (subKey: number, value: string) => void;
  onSubmit?: () => void;
}

const HE02202_2 = ({
  headerInfo,
  questionInfo,
  correctExamples,
  examples,
  exampleTranslation,
  answer,
  isSubmitted,
  onChange,
  onSubmit,
}: IHE02202_2) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const isAnswered = answer && isValidString(answer);
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box useRound useShadow vAlign='center' width='775px' height='193px' hAlign='center' background='white'>
          <Box display='flex' hAlign='center' flexDirection='column' alignItems='flex-start'>
            <Box hAlign='center' gap={6}>
              {examples?.map(({ text, underline }, index) => (
                <Typography key={index} useGap={false} textDecoration={underline ? 'underline' : undefined}>
                  {text}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} color='var(--color-blue-900)'>
                {exampleTranslation}
              </Typography>
            </Box>
          </Box>
        </Box>

        <BoxWrap>
          <Box flex='1' hAlign={'center'}>
            <Input
              name='value'
              width='75%'
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답란'
              maxLength={100}
              status={answer !== '' ? (isSubmitted ? InputStatus.DEFAULT : InputStatus.ENABLE) : InputStatus.DEFAULT}
              readOnly={isSubmitted}
              value={answer}
              onChange={changeAnswer}
            />
          </Box>
        </BoxWrap>
      </Box>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'auto'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <AnswerTagBox marginTop={0} label='모범답안'>
            <Box hAlign='center' gap={6}>
              {correctExamples?.map(({ text, underline }, index) => (
                <Typography key={index} useGap={false} textDecoration={underline ? 'underline' : undefined}>
                  {text}
                </Typography>
              ))}
            </Box>
          </AnswerTagBox>
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

export default InputSentenceQuestion;
