import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  ChipButton,
  Dialog,
  EChipButtonType,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  List,
  Question,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C06A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A04);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowText, setIsShowText] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const questionList = ['Constructive interference occurs when the peaks of two waves overlap.'];

  const subheading = 'The Principle of Sound Waves and Interference';
  const script = `Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. The
  vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake
  when you throw a stone. When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water
  might overlap if you throw two stones, sound waves can also interfere with each other when they meet. There are two types of
  interference: constructive and destructive. Constructive interference occurs when the peaks of two waves overlap, resulting in a
  bigger wave and a louder sound. Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of
  another wave, so they cancel each other out and produce a quieter sound, or no sound at all.`;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <QuestionNumber>Q2.</QuestionNumber>
        Is it true (T) or false (F)?
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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
      ],
    },
  ];

  const isSubmitDisabled = cardData.p02.answer === undefined;

  const handleOpenModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsShowText(true);
  };

  const handleCloseModal = () => {
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
    setIsShowText(false);
  };

  const handleChangeValue = (value: boolean) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: cardData.p02.answer === value ? undefined : value } }));
    changeData('P02', 1, 1, cardData.p02.answer === value ? undefined : value);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p02.answer === cardData.p02.correctAnswer;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p02.answer,
              isAnswer: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData.p02.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId='targetContainer'
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <BoxWrap flexDirection='column' justifyContent='space-around'>
        <List data={questionList}>
          {({ value, index = 1 }) => (
            <BoxWrap justifyContent='space-between' useFull>
              <Box>
                <Question size={'small'}>{value}</Question>
              </Box>
              <Box>
                <BoxWrap>
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.TRUE}
                    isActive={cardData.p02.answer === true}
                    size={'48px'}
                    onClick={() => handleChangeValue(true)}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='참'
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.FALSE}
                    isActive={cardData.p02.answer === false}
                    size={'48px'}
                    onClick={() => handleChangeValue(false)}
                    readOnly={cardData.p02.isSubmitted}
                    isError={cardData.p02.isSubmitted && cardData.p02.answer === false}
                    ariaLabel='거짓'
                  />
                </BoxWrap>
              </Box>
            </BoxWrap>
          )}
        </List>
        <Box vAlign='end' hAlign='end' height='180px'>
          <Button onClick={handleOpenModal} useRound color={EStyleButtonTypes.SECONDARY} label='지문 보기' size={EStyleSizes['SMALL']} />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.correctAnswer ? 'T' : 'F'}</Box>
        </Box>
      </BottomSheet>

      <Dialog
        tabIndex={102}
        width={893}
        height={482}
        useFooter
        isShow={isShowText}
        onClose={handleCloseModal}
        closeLabel={'지문 닫기'}
        topHeight={60}
        useHeader
        header={() => (
          <Box useRound backgroundColor='var(--color-grey-100)' border='none' padding='4px 0' marginBottom='20px'>
            <Typography weight={'var(--font-weight-bold)'}>{subheading}</Typography>
          </Box>
        )}
      >
        <Typography style={{ textIndent: 'var(--font-size-28)' }}>{script}</Typography>
      </Dialog>
    </Container>
  );
};

export default P02;

const QuestionNumber = styled.span`
  font-size: var(--font-size-36);
  font-weight: var(--font-weight-extraBold);
  line-height: 58px;
  margin-right: 10px;
`;
