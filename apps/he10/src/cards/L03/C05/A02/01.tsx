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
  ETagLine,
  Tag,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C05A02, getUserSubmissionStoreP01 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P01';

const P01 = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C05A02);
  const defaultSubmission = getUserSubmissionStoreP01(
    [
      { userAnswer: EChipButtonType.EMPTY, isCorrect: false },
      { userAnswer: EChipButtonType.EMPTY, isCorrect: false },
      { userAnswer: EChipButtonType.EMPTY, isCorrect: false },
      { userAnswer: EChipButtonType.EMPTY, isCorrect: false },
    ],
    false,
  );
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const questionInfo: IQuestionProps = {
    text: `Let's take a quiz about sound.`,
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect ?? false),
  };

  const handleChangeValue = (value: EChipButtonType, index: number) => {
    const newValue = value === cardData.p01.data![index - 1].userAnswer ? EChipButtonType.EMPTY : value;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        data:
          index === 1
            ? [
                {
                  ...prev.p01.data![0],
                  userAnswer: newValue,
                },
                ...prev.p01.data!.slice(1),
              ]
            : index === 2
            ? [
                ...prev.p01.data!.slice(0, 1),
                {
                  ...prev.p01.data![1],
                  userAnswer: newValue,
                },
                ...prev.p01.data!.slice(2),
              ]
            : index === 3
            ? [
                ...prev.p01.data!.slice(0, 2),
                {
                  ...prev.p01.data![2],
                  userAnswer: newValue,
                },
                ...prev.p01.data!.slice(3),
              ]
            : [
                ...prev.p01.data!.slice(0, 3),
                {
                  ...prev.p01.data![3],
                  userAnswer: newValue,
                },
              ],
      },
    }));
    changeData(PAGE, 1, index, newValue);
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p01.data![0].userAnswer === cardData.p01.solution![0];
    const isCorrect2 = cardData.p01.data![1].userAnswer === cardData.p01.solution![1];
    const isCorrect3 = cardData.p01.data![2].userAnswer === cardData.p01.solution![2];
    const isCorrect4 = cardData.p01.data![3].userAnswer === cardData.p01.solution![3];
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isAllCorrect } }));
    submitDataWithResult(
      PAGE,
      getUserSubmissionStoreP01(
        [
          {
            userAnswer: cardData.p01.data![0].userAnswer,
            isCorrect: isCorrect1,
          },
          {
            userAnswer: cardData.p01.data![1].userAnswer,
            isCorrect: isCorrect2,
          },
          {
            userAnswer: cardData.p01.data![2].userAnswer,
            isCorrect: isCorrect3,
          },
          {
            userAnswer: cardData.p01.data![3].userAnswer,
            isCorrect: isCorrect4,
          },
        ],
        isAllCorrect,
      ),
      isAllCorrect,
    );
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            data: prev.p01.data?.map((value, index) => ({
              ...value,
              userAnswer:
                userSubmissionList[0].inputData[index]?.value !== undefined
                  ? userSubmissionList[0].inputData[index]?.value
                  : cardData.p01.data![index].userAnswer,
            })),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
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

  useEffect(() => {
    if (!cardData.p01.data?.every(value => value.userAnswer !== EChipButtonType.EMPTY)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p01]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitDisabled={isButtonDisabled}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY}
    >
      <List data={cardData.p01.data!}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull>
            <Box>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 참 버튼'}
                  status={EChipButtonType.TRUE}
                  isActive={value?.userAnswer === EChipButtonType.TRUE}
                  size={'48px'}
                  onClick={() => handleChangeValue(EChipButtonType.TRUE, index)}
                  readOnly={cardData.p01.isSubmitted}
                  isError={
                    cardData.p01.isSubmitted && value?.userAnswer === EChipButtonType.TRUE
                      ? value?.userAnswer === cardData.p01.solution![index - 1]
                        ? false
                        : true
                      : false
                  }
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 거짓 버튼'}
                  status={EChipButtonType.FALSE}
                  isActive={value?.userAnswer === EChipButtonType.FALSE}
                  size={'48px'}
                  onClick={() => handleChangeValue(EChipButtonType.FALSE, index)}
                  readOnly={cardData.p01.isSubmitted}
                  isError={
                    cardData.p01.isSubmitted && value?.userAnswer === EChipButtonType.FALSE
                      ? value?.userAnswer === cardData.p01.solution![index - 1]
                        ? false
                        : true
                      : false
                  }
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Typography>
          </Box>
          <Box>
            <Typography usePre useGap={false}>{`(1) F\n(2) T\n(3) F\n(4) T`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
