import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  BoxWrap,
  EStyleButtonTypes,
  Typography,
  Dropdown,
  Scroll,
  IQuestionProps,
  TMainHeaderInfoTypes,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleFontSizes,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C06A03b } from './store';

const P02 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const dropdownLabels: string[] = ['one cup', 'two cups'];
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A03b);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (1)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q1. Choose the one to fill in the blank.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = cardData.p02.answer === cardData.p02.solution;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    } else {
      setShowAnswer(!showAnswer);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData('P02', 1, 1, index);
  };

  const handleClickButton = () => {
    setOpened(!opened);
  };

  const handleClickDropdown = (value?: string) => {
    const answerIndex = dropdownLabels.findIndex(label => label === value);
    if (answerIndex >= 0) {
      handleChange(answerIndex + 1);
    }
  };

  const selectBtnColor = () => {
    return cardData.p02.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY;
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

  const contents =
    'The famous German musician Johann Sebastian Bach once said,' +
    '“Without my morning coffee, I’m just like a dried-up piece of goat.” ' +
    'Today this sentiment is shared by many, with coffee shops springing up on almost every street corner, ' +
    'and it is common to see city residents walking around with a cup of coffee in hand. According to the International Coffee Organization (ICO), ' +
    'approximately 10 billion tons of coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total,' +
    'consuming 150,780 tons of coffee. This means that every Korean adult drank an average of one cup of coffee every day throughout the year. Clearly,' +
    'for Koreans and other world citizens, coffee is not just a drink but a daily necessity.';

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      vAlign={'flex-start'}
      onSubmit={submitAnswer}
      submitDisabled={cardData.p02.answer === 0 && !cardData.p02.isSubmitted}
      submitBtnColor={selectBtnColor()}
    >
      <BoxWrap useFull boxGap={24}>
        <Box useFull marginRight='24px' marginTop='100px'>
          <Typography>
            On average, every Korean adult drinks
            <Typography>
              <Dropdown
                dropdownList={dropdownLabels}
                width={'225px'}
                onClick={handleClickDropdown}
                aria-label='답 선택칸'
                readOnly={cardData.p02.isSubmitted}
                selectedValue={dropdownLabels[cardData.p02.answer - 1]}
                isError={cardData.p02.isSubmitted ? (cardData.p02.answer === cardData.p02.solution ? false : true) : false}
              />
            </Typography>
            of coffee daily.
          </Typography>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleClickButton} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {contents}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleClickButton} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              one cup
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const ButtonWrap = styled.div`
  padding: 6px 14px;
  display: flex;
  justify-content: flex-end;
`;
