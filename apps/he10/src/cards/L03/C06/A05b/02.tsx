import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Question,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C06A05b } from './store';

const page = 'P02';
const answer = EChipButtonType.TRUE;
const answerText = 'T';
const headerText = 'Tuning Out: The Science of Noise-Cancellation (3)';
const questionText = 'Q3. Check T (true) or F (false) according to the passage.';
const contents = 'Noise-cancelling technology is effective for both predictable and unpredictable sounds.';
const text =
  'Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are microphones and noise-cancelling circuitry. The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves. For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of –1 and transmit it to the speakers. This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume. However, it is not easy to entirely eliminate external noise with this technology. To achieve full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones. Therefore, this noise-cancellation technology is effective for predictable sounds like those of car engines and subways that occur regularly or over a period of time. However, it’s relatively less effective for inconsistent sounds such as those of people talking close to you.';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A05b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted, isCorrect } = cardData.p02;
  const [isTextShow, setIsTextShow] = useState<boolean>(false);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !isNotEmptyString(userAnswer) || userAnswer === EChipButtonType.EMPTY, [userAnswer]);
  const mark: TMarkType = useMemo(() => (isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none'), [isCorrect, isSubmitted]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'), [isSubmitted, isAnswerShow]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: mark,
  };

  const handleButtonOnClick = () => {
    setIsTextShow(!isTextShow);
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

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userAnswer: userSubmissionList[0].inputData[0]?.value || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmitClick = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect = cardData.p02.userAnswer === answer;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.userAnswer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const handleChipButtonClick = (value: EChipButtonType) => {
    const newValue = value === userAnswer ? EChipButtonType.EMPTY : value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: newValue } }));
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
      submitLabel={submitLabel}
      submitDisabled={isDisabled}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmitClick}
    >
      <BoxWrap useFull>
        <Box width='60%'>
          <Question size='small'>
            <BoxWrap marginTop={'90px'}>
              <Box>{contents}</Box>
              <Box marginTop={'60px'}>
                <BoxWrap>
                  <ChipButton
                    ariaLabel='참'
                    type='radio'
                    name={'chip-radio-T'}
                    status={EChipButtonType.TRUE}
                    isActive={userAnswer === EChipButtonType.TRUE}
                    size={'48px'}
                    onClick={() => handleChipButtonClick(EChipButtonType.TRUE)}
                    readOnly={isSubmitted}
                    isError={isSubmitted && !isCorrect}
                  />
                  <ChipButton
                    ariaLabel='거짓'
                    type='radio'
                    name={'chip-radio-F'}
                    status={EChipButtonType.FALSE}
                    isActive={userAnswer === EChipButtonType.FALSE}
                    size={'48px'}
                    onClick={() => handleChipButtonClick(EChipButtonType.FALSE)}
                    readOnly={isSubmitted}
                    isError={isSubmitted && !isCorrect}
                  />
                </BoxWrap>
              </Box>
            </BoxWrap>
          </Question>
        </Box>
        <Box width='400px' useFull>
          <Box background='blue' useRound useFull>
            {isTextShow ? (
              <>
                <Box hAlign='flex-end' marginBottom={'8px'}>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Box useRound height='calc(100% - 52px)'>
                  <Scroll height='100%'>
                    <Typography lineHeight='48px'>{text}</Typography>
                  </Scroll>
                </Box>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answerText}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
