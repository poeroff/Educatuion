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
  IAudioPlayerProps,
  BottomSheet,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A03, getUserSubmissionStore } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}

const PAGE = 'P03';

const P03 = ({ headerInfo, audioInfo }: IProps) => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A03);
  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission = getUserSubmissionStore(
    [
      { userAnswer: EChipButtonType.EMPTY, isCorrect: false },
      { userAnswer: EChipButtonType.EMPTY, isCorrect: false },
      { userAnswer: EChipButtonType.EMPTY, isCorrect: false },
    ],
    false,
  );

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (value: EChipButtonType, index: number) => {
    const newValue = value === cardData.p03.data![index - 1].userAnswer ? EChipButtonType.EMPTY : value;
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        data:
          index === 1
            ? [
                {
                  ...prev.p03.data![0],
                  userAnswer: newValue,
                },
                ...prev.p03.data!.slice(1),
              ]
            : index === 2
            ? [
                ...prev.p03.data!.slice(0, 1),
                {
                  ...prev.p03.data![1],
                  userAnswer: newValue,
                },
                ...prev.p03.data!.slice(2),
              ]
            : [
                ...prev.p03.data!.slice(0, 2),
                {
                  ...prev.p03.data![2],
                  userAnswer: newValue,
                },
              ],
      },
    }));
    changeData(PAGE, 1, index, newValue);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p03.data![0].userAnswer === cardData.p03.solution![0];
    const isCorrect2 = cardData.p03.data![1].userAnswer === cardData.p03.solution![1];
    const isCorrect3 = cardData.p03.data![2].userAnswer === cardData.p03.solution![2];
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isAllCorrect } }));
    submitDataWithResult(
      PAGE,
      getUserSubmissionStore(
        [
          {
            userAnswer: cardData.p03.data![0].userAnswer,
            isCorrect: isCorrect1,
          },
          {
            userAnswer: cardData.p03.data![1].userAnswer,
            isCorrect: isCorrect2,
          },
          {
            userAnswer: cardData.p03.data![2].userAnswer,
            isCorrect: isCorrect3,
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
          p03: {
            ...prev.p03,
            data: prev.p03.data?.map((value, index) => ({
              ...value,
              userAnswer:
                userSubmissionList[0].inputData[index]?.value !== undefined
                  ? userSubmissionList[0].inputData[index]?.value
                  : cardData.p03.data![index].userAnswer,
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
    if (!cardData.p03.data?.every(value => value.userAnswer !== EChipButtonType.EMPTY)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p03]);

  const questionInfo: IQuestionProps = {
    text: 'Check T (true) or F (false) according to the dialogue.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isButtonDisabled}
      submitLabel={cardData.p03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p03.isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <List data={cardData.p03.data}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull gap={22}>
            <Box>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.TRUE}
                  isActive={value?.userAnswer === EChipButtonType.TRUE}
                  size={'48px'}
                  onClick={() => handleChangeValue(EChipButtonType.TRUE, index)}
                  readOnly={cardData.p03.isSubmitted}
                  ariaLabel={index + '번 보기 참 버튼'}
                  isError={
                    cardData.p03.isSubmitted && value?.userAnswer === EChipButtonType.TRUE
                      ? value?.userAnswer === cardData.p03.solution![index - 1]
                        ? false
                        : true
                      : false
                  }
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.FALSE}
                  isActive={value?.userAnswer === EChipButtonType.FALSE}
                  size={'48px'}
                  onClick={() => handleChangeValue(EChipButtonType.FALSE, index)}
                  readOnly={cardData.p03.isSubmitted}
                  ariaLabel={index + '번 보기 거짓 버튼'}
                  isError={
                    cardData.p03.isSubmitted && value?.userAnswer === EChipButtonType.FALSE
                      ? value?.userAnswer === cardData.p03.solution![index - 1]
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
            <Typography usePre useGap={false}>
              {cardData.p03.solution.map((data, index) => `${index + 1}) ${data === EChipButtonType.TRUE ? 'T' : 'F'}\n`)}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
