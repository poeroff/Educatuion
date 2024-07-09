import {
  Box,
  ChipButton,
  EChipButtonType,
  List,
  TMainHeaderInfoTypes,
  Scroll,
  Typography,
  BottomSheet,
  EStyleFontSizes,
  IQuestionProps,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C11A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C11A03);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const initValue = [1, 2, 3, 4, 5, 6, 7];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: initValue,
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B. Speaking',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '1.',
    text: 'Arrange the sentences in the correct order.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect!),
  };

  interface IOrderText {
    id: number;
    text: string;
  }

  const initialData: IOrderText[] = [
    { id: 1, text: `Jane, I heard you went to the music festival last weekend. How was it?` },
    { id: 2, text: `That sounds awesome! How many singers performed?` },
    { id: 3, text: `Oh, I love him, too! How was his performance? Was it as good as always?` },
    { id: 4, text: `There were five performers, and my favorite, MC Tiger, was there, too!` },
    { id: 5, text: `It was amazing. The energy was incredible, and everyone enjoyed singing along.` },
    { id: 6, text: `Absolutely! As soon as he started performing, the entire audience was speechless.` },
    { id: 7, text: `Oh, I wish I could have been there. We have to go together next time.` },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer?.every((val, index) => val === cardData.p01.solution?.[index]);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect!);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const exchangeOrder = (sourceIndex: number, targetIndex: number) => {
    const newData = [...cardData.p01.answer!];
    const sourceItem = newData[sourceIndex];
    newData.splice(sourceIndex, 1, newData[targetIndex]);
    newData.splice(targetIndex, 1, sourceItem);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
    changeData('P01', 1, 1, newData);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const answerText = [
    {
      label: 'B',
      answer: 'Jane, I heard you went to the music festival last weekend. How was it?',
    },
    {
      label: 'G',
      answer: 'It was amazing. The energy was incredible, and everyone enjoyed singing along.',
    },
    {
      label: 'B',
      answer: 'That sounds awesome! How many singers performed?',
    },
    {
      label: 'G',
      answer: 'There were five performers, and my favorite, MC Tiger, was there, too!',
    },
    {
      label: 'B',
      answer: 'Oh, I love him, too! How was his performance? Was it as good as always?',
    },
    {
      label: 'G',
      answer: 'Absolutely! As soon as he started performing, the entire audience was speechless.',
    },
    {
      label: 'B',
      answer: 'Oh, I wish I could have been there. We have to go together next time.',
    },
  ];

  const getDataText = (index: number) => {
    return initialData.find(item => item.id === cardData.p01.answer?.[index - 1])?.text;
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'start'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p01.answer?.toString() !== initValue.toString()
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!cardData.p01.isSubmitted && cardData.p01.answer?.toString() === initValue.toString()}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Scroll tabIndex={0}>
          <List data={cardData.p01.answer!}>
            {({ index = 1 }) => (
              <Box useFull hAlign={'start'} key={index}>
                <Box hAlign={'center'} marginRight={'8px'}>
                  <ChipButton
                    width='38px'
                    height='38px'
                    status={EChipButtonType.UP}
                    disabled={index === 1}
                    ariaLabel={'순서 올리기, ' + getDataText(index)}
                    onClick={() => {
                      !cardData.p01.isSubmitted && index !== 1 && exchangeOrder(index - 1, index - 2);
                    }}
                  />
                </Box>
                <Box hAlign={'center'} marginRight={'8px'}>
                  <ChipButton
                    width='38px'
                    height='38px'
                    status={EChipButtonType.DOWN}
                    disabled={index === initialData.length}
                    ariaLabel={'순서 내리기, ' + getDataText(index)}
                    onClick={() => {
                      !cardData.p01.isSubmitted && index !== initialData.length && exchangeOrder(index - 1, index);
                    }}
                  />
                </Box>
                <Box vAlign='baseline' marginLeft={12}>
                  <Typography>{getDataText(index)}</Typography>
                </Box>
              </Box>
            )}
          </List>
        </Scroll>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <List
              data={answerText}
              row={({ value }) => (
                <Typography size={EStyleFontSizes.SMALL}>
                  {value?.label} : {value?.answer}
                </Typography>
              )}
            />
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
