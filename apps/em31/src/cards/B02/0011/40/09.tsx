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

const P09 = () => {
  const pageKey = 'P09';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B02_0011_40);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const handleChange = (value: number) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: value,
      },
    }));

    changeData(pageKey, 1, 1, value);
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
    if (isSubmitted) {
      setShow(show => !show);
    }

    const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
    const userSubmission: userSubmissionType<number | undefined>[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answer,
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
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData.value,
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
        <Label value='9' type='icon' />
        <Box vAlign='center'>
          직사각형을 찾아&nbsp;
          <Symbol type='correct' />
          &nbsp;표 하세요.
        </Box>
      </>
    ),
    mark: markType,
  };
  const isValid = cardData[pageKey].answer !== -1;
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : isValid
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const images = [
    <Image type={EImageType.IMG} src={'/B02/0011/40/DKC312M07_01.png'} width='180px' alt='네 각이 모두 직각인 사각형이 그려진 그림' />,
    <Image
      type={EImageType.IMG}
      src={'/B02/0011/40/DKC312M07_02.png'}
      width='180px'
      alt='위쪽의 두 각의 크기는 직각보다 크고 아래쪽의 두 각의 크기는 직각보다 작은 사각형이 그려진 그림'
    />,
    <Image
      type={EImageType.IMG}
      src={'/B02/0011/40/DKC312M07_03.png'}
      width='180px'
      alt='마주보는 두 쌍의 각 중 한 쌍은 직각보다 크기가 크고 다른 한 쌍은 직각보다 크기가 작은 사각형이 그려진 그림'
    />,
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
          <Box useFull hAlign='center' height={'100px'} marginTop={'10px'}>
            {images.map((item, index) => {
              const isSelected = cardData[pageKey].answer === index + 1;
              const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
              return (
                <ItemContainer onClick={() => handleChange(index + 1)} disabled={isSubmitted} key={index}>
                  <Box
                    background={isSubmitted && isSelected && !isCorrect ? 'red' : ''}
                    useRound
                    height={'190px'}
                    width={'210px'}
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
            <Typography>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop='12px'>
              <Typography>직사각형은 네 각이 모두 직각인 사각형입니다.</Typography>
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

export default P09;
