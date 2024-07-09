import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  Box,
  TMainHeaderInfoTypes,
  ChipButton,
  EChipButtonType,
  List,
  BoxWrap,
  Question,
  BottomSheet,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  Button,
  EStyleSizes,
  Dialog,
  Scroll,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C06A06 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A06);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (4)',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Q3. Check T (true) or F (false) according to the passage.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const contents =
    `Dark patterns on digital platforms are becoming more complex and more prevalent. ` +
    `So, what is driving their growth? ` +
    `Over the years, online commerce has grown steadily, especially with the development of smart phones and other digital technologies. ` +
    `As the competition in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases. ` +
    `While these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid marketing strategies. ` +
    `Rather, they suggest that a real marketing strategy create value for both companies and customers, promoting positive and supportive relationships.`;

  const handleChangeValue = (value: boolean, index?: number) => {
    setCardData(prev => {
      const newCardData = JSON.parse(JSON.stringify(prev)); // 기존 데이터를 깊은 복사
      newCardData.p02.list[index as number].value = value; // 새로운 값으로 업데이트
      return newCardData; // 상태 업데이트
    });
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: undefined,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = cardData.p02.list.every(val => val.value === val.answer);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.list,
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
            list: userSubmissionList[0].inputData[0]?.value || cardData.p02.list,
            isSubmitted: isSubmitted,
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

  useEffect(() => {
    changeData('P02', 1, 1, cardData.p02.list);
  }, [cardData.p02.list]);

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p02.list.some(val => val.value === undefined)}
      submitBtnColor={
        cardData.p02.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p02.list?.some(val => val?.value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap marginBottom='30px'>
        <Box width='100%' hAlign='flex-end'>
          <Button tabIndex={101} label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>

      <List data={cardData.p02.list}>
        {({ value, index }) => (
          <BoxWrap justifyContent='space-between' useFull>
            <Box>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.TRUE}
                  isActive={value?.value === true}
                  size='48px'
                  onClick={() => handleChangeValue(true, index && index - 1)}
                  isDisabled={cardData.p02.isSubmitted}
                  isError={cardData.p02.isSubmitted && !cardData.p02.isCorrect && cardData.p02.list[0].value}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.FALSE}
                  isActive={value?.value === false}
                  size='48px'
                  onClick={() => handleChangeValue(false, index && index - 1)}
                  isDisabled={cardData.p02.isSubmitted}
                  isError={cardData.p02.isSubmitted && !cardData.p02.isCorrect && !cardData.p02.list[0].value}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>F</Typography>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog tabIndex={102} width={921} height={500} isShow={isShowModal} onClose={closeModal} useFooter={true} closeLabel='지문 닫기'>
        <Box height='15%' background='gray' useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography useGap={false} weight='bold' size={EStyleFontSizes.MEDIUM}>
            From Shadows to Spotlights(4)
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height='270px' tabIndex={103}>
            <Typography useGap={false} weight='normal' size={EStyleFontSizes.MEDIUM} usePre>
              {contents}
            </Typography>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;
