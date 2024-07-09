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
  Question,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L06C12A03 } from './store';

const page = 'P01';
const pageKey = 'p01';

const question = 'Hongmin wants to be a nurse.';
const displayAnswer = 'F';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L06C12A03);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { answer, solution, isSubmitted, isCorrect } = cardData[pageKey];
  const [isShowAnswer, setShowAnswer] = useState(false);
  const isDisabled = answer === undefined;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '6. 잘 듣고, 대화의 내용과 일치하면 T, 일치하지 않으면 F에 표시해 봅시다.',
    mark: getMarking(isSubmitted, isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C12/A03/ME1-L06-C12-A03-P01.mp3',
    captionSrc: '/L06/C12/A03/ME1-L06-C12-A03-P01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0].value ?? answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = answer === solution;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const handleChipButtonClick = (value: boolean) => {
    const newValue = value === answer ? undefined : value;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newValue } }));
    changeData(page, 1, 1, newValue);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={answer === undefined ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={!isSubmitted && isDisabled}
      onSubmit={handleSubmit}
    >
      <Box display='flex'>
        <Box height={'400px'} alignContent='center' useFull>
          <BoxWrap justifyContent='space-between' useFull>
            <Box alignContent='center'>
              <Question size={'small'}>{question}</Question>
            </Box>
            <Box alignContent='center'>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio`}
                  ariaLabel={'참'}
                  tabIndex={101}
                  status={EChipButtonType.TRUE}
                  readOnly={isSubmitted}
                  isError={isSubmitted && answer !== solution}
                  isActive={answer === true}
                  isDisabled={isSubmitted}
                  size={'48px'}
                  onClick={() => handleChipButtonClick(true)}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio`}
                  ariaLabel={'거짓'}
                  tabIndex={102}
                  status={EChipButtonType.FALSE}
                  readOnly={isSubmitted}
                  isError={isSubmitted && answer !== solution}
                  isActive={answer === false}
                  isDisabled={isSubmitted}
                  size={'48px'}
                  onClick={() => handleChipButtonClick(false)}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography usePre>{displayAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
