import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  BoxWrap,
  EStyleButtonTypes,
  Typography,
  Scroll,
  IQuestionProps,
  TMainHeaderInfoTypes,
  BottomSheet,
  ETagLine,
  Tag,
  ChipButton,
  EChipButtonType,
  Question,
  List,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C06A03b } from './store';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A03b);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Check T (true) or F (false) according to the passage.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong  (1)',
    headerPattern: 'text',
  };

  const contents = `It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and why is it important?`;

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
        },
      ],
    },
  ];

  const onGrade = () => {
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
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleChange = (newAnswer: boolean | undefined, index: number) => {
    if (index === 1) {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          data: [
            {
              ...prev.p02.data[0],
              userAnswer:
                (newAnswer === true && cardData.p02.data[0].userAnswer === true) || (newAnswer === false && cardData.p02.data[0].userAnswer === false)
                  ? undefined
                  : newAnswer,
            },
          ],
        },
      }));
    }
    changeData(
      'P02',
      1,
      index,
      (newAnswer === true && cardData.p02.data[0].userAnswer === true) || (newAnswer === false && cardData.p02.data[0].userAnswer === false)
        ? undefined
        : newAnswer,
    );
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

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const boxHeight = '400px';

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.data[0].userAnswer !== undefined)}
      submitBtnColor={
        !(cardData.p02.data[0].userAnswer !== undefined) ? EStyleButtonTypes.SECONDARY : !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY
      }
      onSubmit={onGrade}
    >
      <BoxWrap useFull>
        <Box width='50%' height={boxHeight} display='flex' justifyContent='center' alignItems='center'>
          <List data={cardData.p02.data} gap={20}>
            {({ value, index = 1 }) => (
              <Question size='small'>
                <BoxWrap justifyContent='space-between' useFull>
                  <Box>{value?.contents}</Box>
                  <Box>
                    <BoxWrap>
                      <ChipButton
                        tabIndex={101}
                        type='radio'
                        name={`chip-radio-${index}`}
                        ariaLabel={index + '번 보기 참 버튼'}
                        status={EChipButtonType.TRUE}
                        isActive={value?.userAnswer === true}
                        size={'48px'}
                        onClick={() => handleChange(true, index)}
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
                        tabIndex={102}
                        type='radio'
                        name={`chip-radio-${index}`}
                        ariaLabel={index + '번 보기 거짓 버튼'}
                        status={EChipButtonType.FALSE}
                        isActive={value?.userAnswer === false}
                        size={'48px'}
                        onClick={() => handleChange(false, index)}
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

        <Box width='490px' background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {contents}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>(1) T</Typography>
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
