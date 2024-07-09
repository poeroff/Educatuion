import usePageData from '@/hooks/usePageData';
import {
  BottomSheet,
  Box,
  BoxWrap,
  ChipButton,
  EChipButtonType,
  IAudioPlayerProps,
  List,
  Question,
  TMainHeaderInfoTypes,
  IQuestionProps,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L03C02A03 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03);
  const { userId } = useRecoilValue(studentAtom);

  const [ansShow, setAnsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Check T (true) or F (false) according to the dialogue.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE1-L03-C02-A03-02.mp3',
    captionSrc: '/L03/C02/A03/HE1-L03-C02-A03-02.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setAnsShow(!ansShow);
    } else {
      const isCorrect1 = cardData.p03.data[0].userAnswer === cardData.p03.solution[0];
      const isCorrect2 = cardData.p03.data[1].userAnswer === cardData.p03.solution[1];
      const isCorrect3 = cardData.p03.data[2].userAnswer === cardData.p03.solution[2];
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p03.data[0].userAnswer,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.p03.data[1].userAnswer,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.p03.data[2].userAnswer,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const handleChange = (newAnswer: boolean | undefined, index: number) => {
    if (index === 1) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          data: [
            {
              ...prev.p03.data[0],
              userAnswer: newAnswer,
            },
            ...prev.p03.data.slice(1),
          ],
        },
      }));
    } else if (index === 2) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          data: [
            ...prev.p03.data.slice(0, 1),
            {
              ...prev.p03.data[1],
              userAnswer: newAnswer,
            },
            ...prev.p03.data.slice(2),
          ],
        },
      }));
    } else if (index === 3) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          data: [
            ...prev.p03.data.slice(0, 2),
            {
              ...prev.p03.data[2],
              userAnswer: newAnswer,
            },
            ...prev.p03.data.slice(3),
          ],
        },
      }));
    }
    changeData('P03', 1, index, newAnswer);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            data: [
              {
                ...prev.p03.data[0],
                userAnswer:
                  userSubmissionList[0].inputData[0]?.value !== undefined
                    ? userSubmissionList[0].inputData[0]?.value
                    : cardData.p03.data[0].userAnswer,
              },
              {
                ...prev.p03.data[1],
                userAnswer:
                  userSubmissionList[0].inputData[1]?.value !== undefined
                    ? userSubmissionList[0].inputData[1]?.value
                    : cardData.p03.data[1].userAnswer,
              },
              {
                ...prev.p03.data[0],
                userAnswer:
                  userSubmissionList[0].inputData[2]?.value !== undefined
                    ? userSubmissionList[0].inputData[2]?.value
                    : cardData.p03.data[2].userAnswer,
              },
            ],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (ansShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p03.data?.some(val => val?.userAnswer === undefined) ? true : false}
      submitBtnColor={
        !(
          cardData.p03.data[0].userAnswer !== undefined &&
          cardData.p03.data[1].userAnswer !== undefined &&
          cardData.p03.data[2].userAnswer !== undefined
        )
          ? EStyleButtonTypes.SECONDARY
          : !ansShow
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.GRAY
      }
      onSubmit={onGrade}
    >
      <List data={cardData.p03.data}>
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
                  isActive={value?.userAnswer === true}
                  size={'48px'}
                  onClick={() => handleChange(true, index)}
                  readOnly={cardData.p03.isSubmitted}
                  isError={
                    cardData.p03.isSubmitted && value?.userAnswer === true
                      ? value?.userAnswer === cardData.p03.solution[index - 1]
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
                  isActive={value?.userAnswer === false}
                  size={'48px'}
                  onClick={() => handleChange(false, index)}
                  readOnly={cardData.p03.isSubmitted}
                  isError={
                    cardData.p03.isSubmitted && value?.userAnswer === false
                      ? value?.userAnswer === cardData.p03.solution[index - 1]
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

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={ansShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData.p03.solution.map((value, index) => `(${index + 1}) ${value ? 'T' : 'F'}\n`)}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
