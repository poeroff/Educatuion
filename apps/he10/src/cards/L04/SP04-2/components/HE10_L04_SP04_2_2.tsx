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
import { L04Sp04_2, IChoice } from '../store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IHE100402 {
  headerInfo: TMainHeaderInfoTypes;
  questionText: string;
  questionBox: React.ReactNode;
  choices: IChoice[];
  answerIndex: number;
  pageNum: string;
}

const HE10_L04_SP04_2_2 = (props: IHE100402) => {
  const { headerInfo, questionText, choices, answerIndex, pageNum, questionBox } = props;
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04Sp04_2);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNum]: {
            ...prev[pageNum],
            userAnswer: userSubmissionList[0].inputData[0]?.value || cardData[pageNum].userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
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
    if (cardData[pageNum].isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData[pageNum].userAnswer === answerIndex;
    setCardData(prev => ({ ...prev, [pageNum]: { ...prev[pageNum], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNum].userAnswer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNum, userSubmission, isCorrect);
  };

  const setAnswerIdx = (answerIndex: number) => {
    setCardData(prev => ({ ...prev, [pageNum]: { ...prev[pageNum], userAnswer: answerIndex } }));
    changeData(pageNum, 1, 1, answerIndex);
    if (answerIndex > 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    text: questionText,
    markSize: 'middle',
    mark: cardData[pageNum].isSubmitted ? (cardData[pageNum].isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={cardData[pageNum].isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!cardData[pageNum].isSubmitted && cardData[pageNum].userAnswer === 0}
      submitBtnColor={
        cardData[pageNum].userAnswer !== 0
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
            ? isShow
              ? EStyleButtonTypes.GRAY
              : EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
      }
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        {questionBox}
        <BoxWrap>
          <List
            align={'horizontal'}
            gap={25}
            data={choices}
            row={({ value, index = 1 }) => (
              <Box flex='1' textAlign='center' width={287}>
                <Radio
                  type={'box'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={value?.id === cardData[pageNum].userAnswer}
                  onClick={() => setAnswerIdx(value ? value.id : 0)}
                  readOnly={cardData[pageNum].isSubmitted}
                  isError={cardData[pageNum].isSubmitted && cardData[pageNum].userAnswer !== answerIndex}
                >
                  {value ? value.text : ''}
                </Radio>
              </Box>
            )}
          />
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>{choices.find(item => item.id === answerIndex)?.text || ''}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default HE10_L04_SP04_2_2;
