import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  TMainHeaderInfoTypes,
  ChipButton,
  EChipButtonType,
  List,
  EStyleButtonTypes,
  IAudioPlayerProps,
  BottomSheet,
  Question,
  ETagLine,
  Tag,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C03A02 } from './store';

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A02);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Check T (true) or F (false) according to the dialogue.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-02.mp3',
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
      setShow(!isShow);
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
                ...prev.p03.data[2],
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
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onGrade}
      submitDisabled={
        !(
          cardData.p03.data[0].userAnswer !== undefined &&
          cardData.p03.data[1].userAnswer !== undefined &&
          cardData.p03.data[2].userAnswer !== undefined
        )
      }
      submitBtnColor={
        !(
          cardData.p03.data[0].userAnswer !== undefined &&
          cardData.p03.data[1].userAnswer !== undefined &&
          cardData.p03.data[2].userAnswer !== undefined
        )
          ? EStyleButtonTypes.GRAY
          : isShow
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <List data={cardData.p03.data} gap={20}>
        {({ value, index = 1 }) => (
          <Box hAlign='space-between' useFull>
            <Question size={EStyleSizes['SMALL']}>{value?.contents}</Question>
            <Box vAlign='center'>
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
            </Box>
          </Box>
        )}
      </List>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>(1) T (2) F (3) T</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
