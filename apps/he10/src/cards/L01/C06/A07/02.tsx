import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
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
  ETagLine,
  Tag,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C06A07 } from './store';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A07);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q5. Is it true or false?',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const indent = '\u00A0'.repeat(3);

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
  const handleChange = (newAnswer: boolean | undefined) => {
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

  const handleButtonOnClick = () => {
    setOpened(!opened);
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
              <Box>
                <Box>{value?.contents}</Box>
                <Box marginTop={12}>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      ariaLabel={index + '번 보기 참'}
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
                      ariaLabel={index + '번 보기 거짓'}
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
              </Box>
            )}
          </List>
        </Box>
        <Box width='490px' useFull>
          <Box background='blue' useRound useFull>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom={'8px'}>
                  <Button
                    color={EStyleButtonTypes.SECONDARY}
                    size={EStyleSizes.SMALL}
                    label='닫기'
                    ariaLabel='닫기'
                    minWidth='70px'
                    onClick={handleButtonOnClick}
                  />
                </Box>
                <Box height='calc(100% - 52px)' lineHeight='48px'>
                  <Scroll height='100%' tabIndex={0}>
                    <Box padding='4px 12px'>
                      <Typography>
                        {indent}In our competitive society, many people believe that only the biggest or the strongest can survive and thrive.
                        However, I propose an alternative view: kindness is the key to success. Isn’t that a comforting thought? We can use the power
                        of our natural kindness to communicate and cooperate with different individuals. We can all benefit from this instead of
                        trying to be better than others. I’d like to end this talk with a message. Think of our society as a bouquet. Just as each
                        flower adds to the beauty when it harmonizes with the others, each person can contribute to a more beautiful world when they
                        cooperate. By being kind and working together, we can truly flourish. Thank you for your attention.
                      </Typography>
                    </Box>
                  </Scroll>
                </Box>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  label='지문 보기'
                  ariaLabel='지문 보기'
                  minWidth='118px'
                  useRound
                  onClick={handleButtonOnClick}
                />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='50%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p02.solution[0] === true ? 'T' : 'F'}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
