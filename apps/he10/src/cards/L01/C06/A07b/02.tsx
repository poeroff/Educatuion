import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  EStyleSizes,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  Question,
  EStyleFontSizes,
  Tag,
  ETagLine,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C06A07b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A07b);
  const { userId } = useRecoilValue(studentAtom);
  const [prevAnswer, setPrevAnswer] = useState<boolean | undefined>();

  const contents =
    ' In our competitive society, many people believe that only the biggest or the strongest can survive and thrive. However, I propose an alternative view: kindness is the key to success. Isn’t that a comforting thought? We can use the power of our natural kindness to communicate and cooperate with different individuals. We can all benefit from this instead of trying to be better than others. I’d like to end this talk with a message. Think of our society as a bouquet. Just as each flower adds to the beauty when it harmonizes with the others, each person can contribute to a more beautiful world when they cooperate. By being kind and working together, we can truly flourish. Thank you for your attention.';

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const handleChange = (newAnswer: boolean | undefined) => {
    console.log('newAnswer1: ', newAnswer);
    if (newAnswer === prevAnswer) {
      newAnswer = undefined;
    }
    setPrevAnswer(newAnswer);
    console.log('newAnswer2: ', newAnswer);
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        data: [
          {
            ...prev.p02.data[0],
            userAnswer: newAnswer,
          },
        ],
      },
    }));
    changeData('P02', 1, 1, newAnswer);
  };

  const onSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.data[0].userAnswer === cardData.p02.solution[0];
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p02.data[0].userAnswer,
              isAnswer: true,
              isCorrect: isCorrect,
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
            data: [
              {
                ...prev.p02.data[0],
                userAnswer:
                  userSubmissionList[0].inputData[0]?.value !== undefined
                    ? userSubmissionList[0].inputData[0]?.value
                    : cardData.p02.data[0].userAnswer,
              },
            ],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q5. Check T (true) or F (false) according to the passage.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmit}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p02.data[0].userAnswer === undefined}
      submitBtnColor={
        cardData.p02.data[0].userAnswer === undefined
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap useFull>
        <Box width='486px' vAlign='center'>
          <List data={cardData.p02.data} gap={20}>
            {({ value, index = 1 }) => (
              <Question size='small'>
                <BoxWrap justifyContent='space-between' useFull>
                  <Box>{value?.contents}</Box>
                  <Box>
                    <BoxWrap>
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        ariaLabel={'1번보기 참 버튼'}
                        status={EChipButtonType.TRUE}
                        isActive={value?.userAnswer === true}
                        size={'48px'}
                        onClick={() => handleChange(true)}
                        readOnly={cardData.p02.isSubmitted}
                        isError={
                          cardData.p02.isSubmitted && value?.userAnswer === true
                            ? value?.userAnswer === cardData.p02.solution[index - 1]
                              ? false
                              : true
                            : false
                        }
                      />
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        ariaLabel={'1번보기 거짓 버튼'}
                        status={EChipButtonType.FALSE}
                        isActive={value?.userAnswer === false}
                        size={'48px'}
                        onClick={() => handleChange(false)}
                        readOnly={cardData.p02.isSubmitted}
                        isError={
                          cardData.p02.isSubmitted && value?.userAnswer === false
                            ? value?.userAnswer === cardData.p02.solution[index - 1]
                              ? false
                              : true
                            : false
                        }
                      />
                    </BoxWrap>
                  </Box>
                </BoxWrap>
              </Question>
            )}
          </List>
        </Box>
        <Box width='490px'>
          <Box background='blue' useRound useFull>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom={'8px'}>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Box height='calc(100% - 52px)'>
                  <Scroll tabIndex={0}>
                    <Box padding='4px 12px'>
                      <Typography>{contents}</Typography>
                    </Box>
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' padding='4px 12px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              F
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
