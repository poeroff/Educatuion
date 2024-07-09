import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Label, Tag, Typography, List, Radio } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';

const P12 = () => {
  const pageNumber = 'P12';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='12' type='icon' />
        설명하는 수를 바르게 나타낸 것은 어느 것인가요?
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType<number | undefined>[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData[pageNumber].answer === cardData[pageNumber].solution;

      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageNumber].answer,
              isAnswer: isCorrect,
            },
          ],
          isCorrect,
        },
      ];

      submitDataWithResult(pageNumber, userSubmission, isCorrect);
      setCardData(prev => ({
        ...prev,
        [pageNumber]: {
          ...prev[pageNumber],
          isSubmitted: true,
          isCorrect,
        },
      }));
    }
  };

  const handleOnClick = (index: number | undefined) => {
    if (index !== undefined) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: index } }));
      changeData(pageNumber, 1, 1, index);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const optionsWithMaxJax = [
    <JaxContainer>
      <Typography>1.3</Typography>
    </JaxContainer>,
    <JaxContainer>
      <Typography>0.4</Typography>
    </JaxContainer>,
    <JaxContainer>
      <Typography>1.4</Typography>
    </JaxContainer>,
    <JaxContainer>
      <Typography>14</Typography>
    </JaxContainer>,
  ];

  return (
    <Container
      bodyId={'targetContainer'}
      questionInfo={questionInfo}
      headerInfo={null}
      background={'var(--color-white)'}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageNumber].answer}
      submitBtnColor={
        cardData[pageNumber].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : cardData[pageNumber].answer >= 0
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
      useRound
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='24px 170px' type='line' useRound hAlign='center'>
          <Typography>0.1이 14개인 수</Typography>
        </Box>
        <Box marginTop={'50px'}>
          <List align='horizontal' data={optionsWithMaxJax}>
            {({ value, index }) => (
              <Radio
                name='radio-group'
                type='square'
                value={cardData[pageNumber].answer === index}
                key={`radio-group-${index}`}
                label={`${index}`}
                readOnly={cardData[pageNumber].isSubmitted}
                onClick={() => handleOnClick(index)}
              >
                <Box display='flex' alignItems='center'>
                  <Label value={index} />
                  <Box>
                    <Typography>{value}</Typography>
                  </Box>
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>3</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[pageNumber].commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
const JaxContainer = styled.div`
  margin-left: 20px;
`;
export default P12;
