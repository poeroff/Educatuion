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
import { L01C11A03 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import styled from '@emotion/styled';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A03);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const initValue = [1, 2, 3, 4, 5, 6];

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
    text: '1. Arrange the sentences in the correct order.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  interface IOrderText {
    id: number;
    text: string;
  }

  const initialData: IOrderText[] = [
    { id: 1, text: `Jenny, you seem a bit down. What's wrong?` },
    { id: 2, text: `No. I'm worried it might harm our friendship.` },
    { id: 3, text: `I understand how you feel. Have you considered discussing your concerns with him openly?` },
    { id: 4, text: `You've argued with each other before, but you've always made up and gotten along. I think he'll understand.` },
    { id: 5, text: `Well, my band's getting ready for the school festival, but Rory, the guitarist, is always late. I'm really stressed out.` },
    { id: 6, text: `Okay, I'll try. Thanks, Dad.` },
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
              <Box useFull hAlign={'start'} vAlign={'start'} key={index}>
                <Box hAlign={'center'} marginRight={'8px'} marginTop={'6px'} width={'37px'}>
                  {index !== 1 && index !== initialData.length && (
                    <ChipButton
                      width='38px'
                      height='38px'
                      status={EChipButtonType.UP}
                      disabled={index === 2}
                      ariaLabel={`순서 올리기, ${initialData.find(item => item.id === cardData.p01.answer?.[index - 1])?.text}`}
                      onClick={() => {
                        !cardData.p01.isSubmitted && index !== 2 && exchangeOrder(index - 1, index - 2);
                      }}
                    />
                  )}
                </Box>

                <Box hAlign={'center'} marginRight={'8px'} marginTop={'6px'} width={'37px'}>
                  {index !== 1 && index !== initialData.length && (
                    <ChipButton
                      width='38px'
                      height='38px'
                      status={EChipButtonType.DOWN}
                      disabled={index === initialData.length - 1}
                      ariaLabel={`순서 내리기, ${initialData.find(item => item.id === cardData.p01.answer?.[index - 1])?.text}`}
                      onClick={() => {
                        !cardData.p01.isSubmitted && index !== initialData.length - 1 && exchangeOrder(index - 1, index);
                      }}
                    />
                  )}
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
          <Typography>
            {cardData.p01.solution?.map((item, index) => (
              <Typography useGap={false} key={index}>
                {index !== 0 && <ArrowStyle>&rarr; </ArrowStyle>}
                {item}
              </Typography>
            ))}
          </Typography>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const ArrowStyle = styled.span`
  margin-left: 6px;
  font-family: Arial, sans-serif;
`;
