import { useEffect, useMemo, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ESvgType,
  ETagLine,
  Radio,
  Scroll,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C06A03b } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageKey = 'p02';
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A03b);

  const [ready, setReady] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const answer = 3;

  const isAllFilled = useMemo(() => Boolean(cardData[pageKey].answer), [cardData, pageKey]);
  const disabled = useMemo(() => !cardData[pageKey].isSubmitted && !isAllFilled, [cardData, pageKey, isAllFilled]);
  const submitBtnColor = useMemo(() => {
    if (cardData[pageKey].isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData, pageKey, isShowAnswer, isAllFilled]);
  const isError = useMemo(() => cardData[pageKey].isSubmitted && cardData[pageKey].answer !== cardData[pageKey].solution, [cardData, pageKey]);
  const mark = useMemo(() => (cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none'), [cardData, pageKey]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (1)',
  };

  const questionInfo = {
    text: (
      <>
        <Typography useGap={false} weight='var(--font-weight-extraBold)' style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
          Q1.&nbsp;
        </Typography>
        Choose the one to fill in the blanks.
      </>
    ),
    mark: mark,
  };

  const radioText = ['animal farm', 'animal hospital', 'animal sanctuary'];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted: isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      (async () => {
        await init();
        setReady(true);
      })();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index + 1 } }));
    changeData(pageNo, 1, 1, index + 1);
  };

  const handleSubmit = () => {
    if (!cardData[pageKey].isSubmitted) {
      const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect: cardData[pageKey].isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={disabled}
      onSubmit={handleSubmit}
      submitBtnColor={submitBtnColor}
    >
      <Box useRound background='white' width='100%'>
        <Box vAlign='center'>
          <Typography useGap={false}>Where did the club members decide to go for their volunteer work?</Typography>
        </Box>
        <Box vAlign='center'>
          <SvgIcon src={simpleRightArrow} type={ESvgType.IMG} />
          <Typography useGap={false}>&nbsp;They decided to go to an&nbsp;</Typography>
          <Typography useGap={false} type='blank' width='300px' title='빈칸' boxColor='var(--color-black)'>
            {'\u00A0'}
          </Typography>
          .
        </Box>
      </Box>

      <BoxWrap height='calc(100% - 156px)' marginTop='8px'>
        <Box vAlign='center' hAlign='center' useFull>
          <Box>
            {radioText.map((text, index) => (
              <Radio
                key={`radio-option-${index + 1}`}
                tabIndex={102}
                type={'circle'}
                align='vertical'
                name={'radio-question-A'}
                gap={8}
                label={text}
                value={ready ? index + 1 === cardData[pageKey].answer : undefined}
                onClick={() => handleRadioClick(index)}
                isError={isError}
                readOnly={cardData[pageKey].isSubmitted}
              />
            ))}
          </Box>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  tabIndex={111}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={() => setOpened(!opened)}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  As the leader of our school club Care for Animals, I organized a volunteer trip to an animal sanctuary for my club members. An
                  animal sanctuary is a special place where rescued, injured, or abused animals can live in a safe and caring environment. All the
                  club members and I agreed that the sanctuary would be the perfect place to learn about animal care. Excited for a new experience, we
                  set out to volunteer.
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button
                tabIndex={110}
                color={EStyleButtonTypes.SECONDARY}
                label='지문보기'
                minWidth='118px'
                useRound
                onClick={() => setOpened(!opened)}
              />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {answer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
