import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
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
  Question,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A06b } from './store';
import { studentAtom } from '@/stores/student';

interface IData {
  contents: string;
  value: boolean | undefined;
}

const P02 = () => {
  const pageKey = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A06b);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

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

  const { userId } = useRecoilValue(studentAtom);
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
      return;
    }

    const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [{ subKey: 1, type: 'BOOLEAN', value: cardData[pageKey].answer }],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const [opened, setOpened] = useState<boolean>(false);

  const content = `An example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee
  grounds from its shops. These grounds are processed to remove impurities and dried out. The resulting SCGs are sold to fertilizer
  companies, where they are transformed into organic fertilizer. This fertilizer is later sold back to the coffee shop chain. The chain
  provides the fertilizer to local ecofriendly farmers, who then sell their produce back to the chain. The farm produce can be used to
  create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops. By repurposing coffee
  grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.`;

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (4)',
  };

  const questionInfo = {
    text: 'Q4. Check T (true) or F (false) according to the passage',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const [list, setList] = useState<IData[]>([
    {
      contents: 'The produce grown with coffee fertilizer can be used to make food items, such as rice chips and dried sweet potatoes.',
      value: undefined,
    },
  ]);

  const handleChangeValue = (value: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: prev[pageKey].answer === value ? undefined : value,
      },
    }));

    changeData(pageKey, 1, 1, cardData[pageKey].answer);
  };

  const selectBtnColor = () => {
    if (cardData[pageKey].isSubmitted) {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return cardData[pageKey].answer !== undefined ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageKey].isSubmitted && cardData[pageKey].answer === undefined ? true : false}
      submitBtnColor={selectBtnColor()}
      onSubmit={() => submitAnswer()}
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
                        isActive={cardData[pageKey].answer === true}
                        size={'48px'}
                        onClick={() => handleChangeValue(true)}
                        readOnly={cardData[pageKey].isSubmitted}
                      />
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.FALSE}
                        isActive={cardData[pageKey].answer === false}
                        isError={cardData[pageKey].isSubmitted && !cardData[pageKey].answer}
                        size={'48px'}
                        onClick={() => handleChangeValue(false)}
                        readOnly={cardData[pageKey].isSubmitted}
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
                  <Typography lineHeight={'48px'}>{content}</Typography>
                </Scroll>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{'T'}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
