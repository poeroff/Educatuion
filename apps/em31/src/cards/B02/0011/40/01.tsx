import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  Symbol,
  TMarkType,
  Tag,
  Typography,
  Image,
  EImageType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B02_0011_40 } from './store';

const P01 = () => {
  const pageKey = 'P01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B02_0011_40);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const handleChange = (value: number) => {
    const newAnswer = [...cardData[pageKey].answer];
    newAnswer[value] = !newAnswer[value];

    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: newAnswer,
      },
    }));

    changeData(
      pageKey,
      1,
      1,
      newAnswer.map((item, index) => (item ? index + 1 : null)).filter(n => n !== null),
    );
  };

  const defaultSubmission: userSubmissionType<number[] | undefined>[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [] as number[],
        },
      ],
    },
  ];
  const submitAnswer = () => {
    if (isSubmitted) {
      setShow(show => !show);
    }

    let isCorrect = true;
    if (cardData[pageKey].answer.length !== cardData[pageKey].solution.length) {
      isCorrect = false;
    } else {
      cardData[pageKey].answer.forEach((item, index) => {
        if (item !== cardData[pageKey].solution[index]) {
          isCorrect = false;
        }
      });
    }

    const answer = cardData[pageKey].answer.map((item, index) => (item ? index + 1 : null)).filter(n => n !== null);
    const userSubmission: userSubmissionType<(number | null)[] | undefined>[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: answer,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isCorrect,
      },
    }));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const answer = [...cardData[pageKey].answer];

        userSubmissionList[0].inputData.value?.forEach((value: number) => {
          answer[value - 1] = true;
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: answer,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const { isSubmitted } = cardData[pageKey];

  const markType: TMarkType = isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none';

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        <Box vAlign='center'>
          곧은 선을 모두 찾아&nbsp;
          <Symbol type='correct' />
          &nbsp;표 하세요.
        </Box>
      </>
    ),
    mark: markType,
  };
  const isValid = cardData[pageKey].answer.find(item => item) !== undefined;
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : isValid
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const images = [
    <Image type={EImageType.IMG} src={'/B02/0011/40/DKC312M01(1).png'} width='130px' alt='반듯한 선' />,
    <Image type={EImageType.IMG} src={'/B02/0011/40/DKC312M01(2).png'} width='150px' alt='구부러진 선' />,
    <Image type={EImageType.IMG} src={'/B02/0011/40/DKC312M01(3).png'} height='120px' alt='반듯한 선' />,
    <Image type={EImageType.IMG} src={'/B02/0011/40/DKC312M01(4).png'} width='150px' alt='물결 모양으로 구부러진 선' />,
  ];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitLabel}
      onSubmit={submitAnswer}
      submitBtnColor={submitButtonColor}
      submitDisabled={!isSubmitted && !isValid}
      useRound
      bodyId={'targetContainer'}
    >
      <Box useFull>
        <Box type='dashed' flexDirection='column' marginTop={'16px'} padding={'94px 48px'} vAlign='center' hAlign='start' borderRadius={8}>
          <Box hAlign='center' height={'100px'} marginTop={'10px'}>
            {images.map((item, index) => {
              const isSelected = cardData[pageKey].answer[index];
              const isCorrect = cardData[pageKey].solution[index];
              return (
                <ItemContainer onClick={() => handleChange(index)} disabled={isSubmitted} key={index}>
                  <Box
                    background={isSubmitted && isSelected && !isCorrect ? 'red' : ''}
                    useRound
                    height={'170px'}
                    width={'180px'}
                    opacity={0.4}
                    vAlign='center'
                    hAlign='center'
                  >
                    {item}
                  </Box>
                  <Box vAlign='center' marginTop={'20px'}>
                    <Typography>(</Typography>
                    <CircleCheck>{isSelected && <Symbol type='correct' />}</CircleCheck>
                    <Typography>)</Typography>
                  </Box>
                </ItemContainer>
              );
            })}
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId={'targetContainer'} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>(</Typography>
            <Symbol type={'correct'} />
            <Typography>)</Typography>
            <Typography>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</Typography>
            <Typography>(</Typography>
            <Symbol type={'correct'} />
            <Typography>)</Typography>
            <Typography>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop='12px'>
              <Typography>곧은 선은 구부러지거나 휘어지지 않고 반듯한 선입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.div`
  width: 80px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export default P01;
