import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Scroll,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  List,
  Question,
  ChipButton,
  EChipButtonType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A05b } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const currentPage = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A05b);
  const { userId } = useRecoilValue(studentAtom);

  const [showAnswer, setShowAnswer] = useState(false);
  const [opened, setOpened] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '본문의 내용과 일치하면 T, 일치하지 않으면 F에 표시해 봅시다.',
    mark: getMarking(cardData[currentPage].isSubmitted, cardData[currentPage].isCorrect),
  };

  const content = `This box is my school survival kit. I have many things in it. First, I have some sticky notes. I use them on the first day. I write your names and remember them. Next, I have some candies. These are for you. They’re sweet, like your smiles.`;

  const list = [
    {
      contents: 'Ms. Seo has some sticky notes and candy in her school survival kit.',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: undefined,
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [currentPage]: {
            ...prev[currentPage],
            answer:
              userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData[currentPage].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (value: boolean) => {
    setCardData(prev => ({
      ...prev,
      [currentPage]: {
        ...prev[currentPage],
        answer: prev[currentPage].answer === value ? undefined : value,
      },
    }));

    changeData(currentPage, 1, 1, cardData[currentPage].answer);
  };

  const onSubmit = () => {
    if (cardData[currentPage].isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = cardData[currentPage].answer === cardData[currentPage].solution;
      setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData[currentPage].answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(currentPage, userSubmission, isCorrect);
    }
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
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
      submitLabel={!cardData[currentPage].isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitBtnColor={
        cardData[currentPage].answer !== undefined ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={cardData[currentPage].answer === undefined}
      onSubmit={onSubmit}
      bodyId='targetContainer'
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box width='100%' vAlign={'center'}>
          <List data={list} gap={20}>
            {({ value, index = 1 }) => (
              <Question size='small'>
                <BoxWrap justifyContent='space-between' useFull>
                  <Box>{value?.contents}</Box>
                  <Box>
                    <BoxWrap>
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.TRUE}
                        isActive={cardData[currentPage].answer === true}
                        size={'48px'}
                        onClick={() => handleChangeValue(true)}
                        readOnly={cardData[currentPage].isSubmitted}
                      />
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.FALSE}
                        isActive={cardData[currentPage].answer === false}
                        isError={cardData[currentPage].isSubmitted && !cardData[currentPage].answer}
                        size={'48px'}
                        onClick={() => handleChangeValue(false)}
                        readOnly={cardData[currentPage].isSubmitted}
                      />
                    </BoxWrap>
                  </Box>
                </BoxWrap>
              </Question>
            )}
          </List>
        </Box>

        <Box useFull>
          <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom='8px'>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Scroll height='calc(100% - 52px)' tabIndex={0}>
                  <Typography lineHeight={'48px'}>&nbsp;{content}</Typography>
                </Scroll>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문 보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>T</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
