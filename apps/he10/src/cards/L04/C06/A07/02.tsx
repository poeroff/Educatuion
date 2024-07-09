import {
  Box,
  Button,
  EStyleSizes,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  ChipButton,
  Tag,
  EChipButtonType,
  BottomSheet,
  List,
  BoxWrap,
  Question,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import ShowText from './ShowText';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C06A07 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A07);
  const { userId } = useRecoilValue(studentAtom);

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

  const currentPage = 'P02';

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            list: [
              {
                ...prev.p02.list[0],
                value:
                  userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData.p02.list[0].value,
              },
            ],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const [isShow, setShow] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);

  const dialogContent = `Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups. Coffee logs, for instance, generate more heat and burn for a longer time than wood. Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection. Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee. Korea has shown a growing interest in recycling spent coffee grounds in recent years. The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste. By recycling materials such as coffee waste, individuals can also help protect the environment. With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.`;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Q5. Is it true (T) or false (F)? ',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
  };

  const handleChangeValue = (value: boolean | undefined, index: number) => {
    if (cardData.p02.list[index].value === value) {
      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, list: [{ contents: 'Clothes made from used coffee grounds dry slowly as people sweat.', value: undefined }] },
      }));
      changeData(currentPage, 1, 1, value);
    } else {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          list: [{ contents: 'Clothes made from used coffee grounds dry slowly as people sweat.', value: value }],
        },
      }));
      changeData(currentPage, 1, 1, value);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = cardData.p02.list[0].value === false;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p02.list[0].value,
              isCorrect: isCorrect,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(currentPage, userSubmission, isCorrect);
    } else {
      setShow(!isShow);
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      bodyId='targetContainer'
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p02.list[0].value !== undefined)}
      submitBtnColor={
        cardData.p02.list[0].value !== undefined ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <Box useFull>
        <Box hAlign={'right'}>
          <Button
            minWidth='118px'
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            useRound
            onClick={() => {
              handleButtonClick();
            }}
            tabIndex={101}
          />
        </Box>
        <Box hAlign='center' height='calc(100% - 45px)'>
          <List data={cardData.p02.list}>
            {({ value, index = 1 }) => (
              <BoxWrap justifyContent='space-between' useFull>
                <Box whiteSpace='pre-line'>
                  <Question size={'small'}>{value?.contents}</Question>
                </Box>
                <Box>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.TRUE}
                      isActive={value?.value === true}
                      size={'48px'}
                      onClick={() => handleChangeValue(true, index - 1)}
                      readOnly={cardData.p02.isSubmitted}
                      isError={cardData.p02.isSubmitted && cardData.p02.list[0].value}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.FALSE}
                      isActive={value?.value === false}
                      size={'48px'}
                      onClick={() => handleChangeValue(false, index - 1)}
                      readOnly={cardData.p02.isSubmitted}
                    />
                  </BoxWrap>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{`(F)`}</Box>
        </Box>
      </BottomSheet>

      <ShowText
        title={'The Power of Friendliness: Soft but Strong (5)'}
        content={dialogContent}
        isTextOpen={isTextOpen}
        handleTextClose={handleTextClose}
      />
    </Container>
  );
};

export default P02;
