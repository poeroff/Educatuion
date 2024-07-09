import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L03C06A04 } from './store';

const P02 = () => {
  const pageKey = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A04);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowText, setIsShowText] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const questionList = ['Bill Traylor began drawing only when he reached his mid-80s.'];

  const subheading = 'From Shadows to Spotlights (2)';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <QuestionNumber>Q2.</QuestionNumber>
        Is it true (T) or false (F)?
      </>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
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

  const isSubmitDisabled = cardData[pageKey].userInput === undefined;

  const handleChangeValue = (value: boolean) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], userInput: cardData[pageKey].userInput === value ? undefined : value } }));
    changeData(pageKey, 1, 1, cardData[pageKey].userInput === value ? undefined : value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData[pageKey].userInput === cardData[pageKey].solution;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData[pageKey].userInput,
              isAnswer: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            userInput:
              userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData[pageKey].userInput,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
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
      submitLabel={cardData[pageKey].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
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
                    ariaLabel='true'
                    status={EChipButtonType.TRUE}
                    isActive={cardData[pageKey].userInput === true}
                    size={'48px'}
                    onClick={() => handleChangeValue(true)}
                    readOnly={cardData[pageKey].isSubmitted}
                    isError={cardData[pageKey].isSubmitted && cardData[pageKey].userInput === true}
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    ariaLabel='false'
                    status={EChipButtonType.FALSE}
                    isActive={cardData[pageKey].userInput === false}
                    size={'48px'}
                    onClick={() => handleChangeValue(false)}
                    readOnly={cardData[pageKey].isSubmitted}
                  />
                </BoxWrap>
              </Box>
            </BoxWrap>
          )}
        </List>
        <Box vAlign='end' hAlign='end' height='180px'>
          <Button onClick={() => setIsShowText(true)} useRound color={EStyleButtonTypes.SECONDARY} label='지문 보기' size={EStyleSizes['SMALL']} />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageKey].solution ? 'T' : 'F'}</Box>
        </Box>
      </BottomSheet>

      <Dialog width={893} useFooter isShow={isShowText} onClose={() => setIsShowText(!isShowText)} closeLabel={'지문 닫기'}>
        <BoxWrap flexDirection='column' padding='0 12px' boxGap={0}>
          <Box useRound backgroundColor='var(--color-grey-100)' border='none' padding='4px 0'>
            <Typography weight={'var(--font-weight-bold)'}>{subheading}</Typography>
          </Box>
          <Box marginTop='24px'>
            <Scroll height='270px'>
              <Typography>
                &nbsp;&nbsp;
                {contentInfo.map(content => {
                  return content.originText;
                })}
              </Typography>
            </Scroll>
          </Box>
        </BoxWrap>
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
