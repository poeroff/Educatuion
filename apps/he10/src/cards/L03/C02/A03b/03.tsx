import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  List,
  Question,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A03b } from './store';

const headerText = 'Listen and Answer';
const questionText = 'Check T (true) or F (false) according to the dialogue.';
const answer = [false, true, true];
const answerText = '(1) F (2) T (3) T';
const list = [
  {
    contents: '(1) The boy has problems with his nose.',
  },
  {
    contents: '(2) The two holes in our noses do things like filtering the air. ',
  },
  {
    contents: '(3) The openings keep doing essential functions even while resting. ',
  },
];

const P03 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted, isCorrect } = cardData.p03;
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !Array.isArray(userAnswer) || !userAnswer.every(a => a === true || a === false), [userAnswer]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'), [isSubmitted, isAnswerShow]);
  const mark: TMarkType = useMemo(() => (isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none'), [isCorrect, isSubmitted]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };
  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: mark,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE1-L03-C02-A03-02.mp3',
    captionSrc: '/L03/C02/A03/HE1-L03-C02-A03-02.srt',
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: undefined,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: undefined,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: undefined,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            userAnswer: userSubmissionList[0].inputData?.map((v: { value: boolean }) => v?.value) || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect = userAnswer.map((a, i) => a === answer[i]);
      const isAllCorrect = isCorrect.every(value => value === true);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isAllCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: userAnswer[0],
              isAnswer: true,
              isCorrect: isCorrect[0],
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: userAnswer[1],
              isAnswer: true,
              isCorrect: isCorrect[1],
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: userAnswer[2],
              isAnswer: true,
              isCorrect: isCorrect[2],
            },
          ],
          isCorrect: isAllCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isAllCorrect);
    }
  };

  const handleChipClick = (value: boolean, index: number) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = value === userAnswer[index] ? undefined : value;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, userAnswer: newAnswer } }));
    changeData('P03', 1, 1, newAnswer);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={submitLabel}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      submitDisabled={isDisabled}
    >
      <List data={list}>
        {({ value, index = 0 }) => (
          <BoxWrap justifyContent='space-between' useFull>
            <Box width={'800px'}>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  ariaLabel={`${index}번 True 버튼`}
                  type='radio'
                  name={`chip-radio`}
                  status={EChipButtonType.TRUE}
                  isActive={userAnswer[index - 1] === true}
                  readOnly={isSubmitted}
                  isError={isSubmitted && userAnswer[index - 1] !== answer[index - 1]}
                  size={'48px'}
                  onClick={() => handleChipClick(true, index - 1)}
                  tabIndex={101 + index}
                />
                <ChipButton
                  ariaLabel={`${index}번 False 버튼`}
                  type='radio'
                  name={`chip-radio`}
                  status={EChipButtonType.FALSE}
                  isActive={userAnswer[index - 1] === false}
                  readOnly={isSubmitted}
                  isError={isSubmitted && userAnswer[index - 1] !== answer[index - 1]}
                  size={'48px'}
                  onClick={() => handleChipClick(false, index - 1)}
                  tabIndex={102 + index}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Typography>{answerText}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
