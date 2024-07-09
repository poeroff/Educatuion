import { ChangeEvent, useEffect, useState } from 'react';
import {
  BottomSheet,
  Typography,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  ChipButton,
  EChipButtonType,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L07C12A05 } from './store';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const PAGE = 'P02';

const P02 = () => {
  const content1 = `The Sahara is the `;
  const content2 = ` hot desert on Earth. The word “sahara” means “desert.” During the summer days, the
  Sahara is the hottest place in the world. But it is cooler at night. In winter, it is even cold at night.`;

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L07C12A05);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            11.
          </Typography>
          <Typography fontSize='32px'>다음 글의 내용과 일치하면 </Typography>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            T
          </Typography>
          <Typography fontSize='32px'>, 일치하지 않으면 </Typography>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            F
          </Typography>
          <Typography fontSize='32px'> 를 골라 봅시다.</Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const data = [
    { text: '(1) The word “sahara” means “hot place.”', answer: cardData.p02.answer1, solution: cardData.p02.solution1 },
    { text: '(2) During the winter days, the Sahara is cold at night', answer: cardData.p02.answer2, solution: cardData.p02.solution2 },
  ];

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (index: number, value: boolean) => {
    const newCardData = { ...cardData.p02 };
    if (index === 1) newCardData.answer1 = value;
    if (index === 2) newCardData.answer2 = value;
    setCardData(prev => ({ ...prev, p02: newCardData }));
    changeData(PAGE, 1, index, value);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p02.answer1 === cardData.p02.solution1;
    const isCorrect2 = cardData.p02.answer2 === cardData.p02.solution2;
    const isCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'BOOLEAN',
            value: cardData.p02.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'BOOLEAN',
            value: cardData.p02.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            answer1: userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value !== undefined ? userSubmissionList[0].inputData[1]?.value : cardData.p02.answer2,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
            solution1: cardData.p02.solution1,
            solution2: cardData.p02.solution2,
          },
        }));
      }
      initData(PAGE, userSubmissionList, [], isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE);
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
      vAlign='center'
      submitLabel={!cardData.p02.isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={cardData.p02.answer1 === undefined || cardData.p02.answer2 === undefined}
      submitBtnColor={
        cardData.p02.answer1 === undefined || cardData.p02.answer2 === undefined
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={!cardData.p02.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap useFull marginTop={10} alignItems='center'>
        <Box background='white' useRound useFull lineHeight='40px' alignItems='center'>
          <Typography useGap={false}>
            &nbsp;&nbsp;&nbsp;{content1}
            <Typography type='blank' title='빈칸' width='100px' boxColor='var(--color-black)' />
            {content2}
          </Typography>
        </Box>

        <Box hAlign={'center'} useFull>
          <List data={data}>
            {({ value, index = 1 }) => (
              <BoxWrap justifyContent='space-between' useFull>
                <Box>
                  <Typography>{value?.text}</Typography>
                </Box>
                <Box vAlign='center'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.TRUE}
                      isActive={value?.answer === true}
                      size={'48px'}
                      onClick={() => handleChangeValue(index, true)}
                      readOnly={cardData.p02.isSubmitted}
                      isError={cardData.p02.isSubmitted && value?.answer === true && value.answer !== value.solution}
                      ariaLabel='T 버튼'
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio-${index}`}
                      status={EChipButtonType.FALSE}
                      isActive={value?.answer === false}
                      size={'48px'}
                      onClick={() => handleChangeValue(index, false)}
                      readOnly={cardData.p02.isSubmitted}
                      isError={cardData.p02.isSubmitted && value?.answer === false && value.answer !== value.solution}
                      ariaLabel='F 버튼'
                    />
                  </BoxWrap>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`(1) ${cardData.p02.solution1 ? 'T' : 'F'}\n(2) ${cardData.p02.solution2 ? 'T' : 'F'}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
