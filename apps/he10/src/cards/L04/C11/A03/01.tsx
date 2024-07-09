import usePageData from '@/hooks/usePageData';
import {
  Box,
  ChipButton,
  EChipButtonType,
  List,
  TMainHeaderInfoTypes,
  Scroll,
  Typography,
  BottomSheet,
  IQuestionProps,
  ETagLine,
  Tag,
  EStyleButtonTypes,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L04C11A03 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C11A03);
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
    text: '1. Arrange the sentences in the correct order.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  interface IOrderText {
    id: number;
    text: string;
  }

  const initialData: IOrderText[] = [
    { id: 1, text: `Hey, Jake! Are you throwing that broken glass into the recycling box?` },
    { id: 2, text: `Indeed. Broken glass can’t be recycled. It should go in the general waste.` },
    { id: 3, text: `Oh, hi, Dad. I accidentally dropped a cup, and it broke. Why? Is there a problem?` },
    { id: 4, text: `Broken glass can be dangerous. Why don’t you wrap it up in paper or an old cloth before putting it in the trash?` },
    { id: 5, text: `Oh, I had no idea. So, what should I do with it?` },
    { id: 6, text: `Good idea. I don’t want to hurt anyone.` },
    { id: 7, text: `Well, my band’s getting ready for the school festival, but Rory, the guitarist, is always late. I’m really stressed out.` },
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
        <Scroll tabIndex={1}>
          <List data={cardData.p01.answer!}>
            {({ index = 1 }) => (
              <Box useFull hAlign={'start'} key={index}>
                <Box hAlign={'center'} marginRight={'8px'}>
                  <ChipButton
                    width='38px'
                    height='38px'
                    status={EChipButtonType.UP}
                    disabled={index === 1}
                    ariaLabel={`순서 올리기, ${initialData.find(item => item.id === cardData.p01.answer?.[index - 1])?.text}`}
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
                    ariaLabel={`순서 내리기, ${initialData.find(item => item.id === cardData.p01.answer?.[index - 1])?.text}`}
                    onClick={() => {
                      !cardData.p01.isSubmitted && index !== initialData.length && exchangeOrder(index - 1, index);
                    }}
                  />
                </Box>
                <Box vAlign='baseline' marginLeft={12}>
                  <Typography useGap={false}>{initialData.find(item => item.id === cardData.p01.answer?.[index - 1])?.id}.</Typography>
                  <Typography>{initialData.find(item => item.id === cardData.p01.answer?.[index - 1])?.text}</Typography>
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
          <Box marginTop='12px'>{cardData.p01.solution?.join(' -> ')}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
