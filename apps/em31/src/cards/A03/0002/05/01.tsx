import { Box, Label, BottomSheet, Tag, ETagLine, IQuestionProps, TMainHeaderInfoTypes, Image, EStyleButtonTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import BadukStoneIcon from '@/assets/icon/MC31301.svg';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import A03_0002_05 from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [clickedStoneIndex, setClickedStoneIndex] = useState<number>(-1);

  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0002_05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'NUMBER_LIST',
          value: [],
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'NUMBER_LIST',
          value: [],
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈식으로 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        바둑돌 12개를 주머니 3개에 똑같이 나누어 넣으려고 합니다. 주머니에 바둑돌을 넣어 보세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const handelClickStone = (index: number) => {
    setClickedStoneIndex(index);
  };

  const handleClickPocket = (target: string) => {
    if (clickedStoneIndex !== -1) {
      // 바구니에 바둑돌 추가
      switch (target) {
        case 'answer1':
          {
            const newBucket = [...cardData.p01.answer1, clickedStoneIndex];
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: newBucket } }));
            changeData('P01', 1, 1, newBucket);
          }
          break;
        case 'answer2':
          {
            const newBucket = [...cardData.p01.answer2, clickedStoneIndex];
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: newBucket } }));
            changeData('P01', 1, 2, newBucket);
          }
          break;
        case 'answer3':
          {
            const newBucket = [...cardData.p01.answer3, clickedStoneIndex];
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: newBucket } }));
            changeData('P01', 1, 3, newBucket);
          }
          break;
      }
    } else {
      // 바구니에서 바둑돌 빼기
      switch (target) {
        case 'answer1':
          if (cardData.p01.answer1.length - 1 >= 0) {
            const newBucket = [...cardData.p01.answer1];
            newBucket.pop();
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: newBucket } }));
            changeData('P01', 1, 1, newBucket);
          }
          break;
        case 'answer2':
          if (cardData.p01.answer2.length - 1 >= 0) {
            const newBucket = [...cardData.p01.answer2];
            newBucket.pop();
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: newBucket } }));
            changeData('P01', 1, 2, newBucket);
          }
          break;
        case 'answer3':
          if (cardData.p01.answer3.length - 1 >= 0) {
            const newBucket = [...cardData.p01.answer3];
            newBucket.pop();
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: newBucket } }));
            changeData('P01', 1, 3, newBucket);
          }
          break;
      }
    }
    setClickedStoneIndex(-1);
  };

  const setSubmitBtnColor = () => {
    if (cardData.p01.answer1.length + cardData.p01.answer2.length + cardData.p01.answer3.length === 12) {
      if (isShow && cardData.p01.isSubmitted) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    } else {
      return EStyleButtonTypes.SECONDARY;
    }
  };

  const setSubmitDisabled = () => {
    if (cardData.p01.answer1.length + cardData.p01.answer2.length + cardData.p01.answer3.length === 12) return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect =
      cardData.p01.answer1.length === cardData.p01.solution1 &&
      cardData.p01.answer2.length === cardData.p01.solution2 &&
      cardData.p01.answer3.length === cardData.p01.solution3;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer1,
            isCorrect: isCorrect,
          },
          {
            subKey: 2,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer2,
            isCorrect: isCorrect,
          },
          {
            subKey: 3,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer3,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
      useRound
      vAlign='start'
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box hAlign='cneter'>
          <PocketButton
            type='button'
            onClick={() => handleClickPocket('answer1')}
            aria-label={cardData.p01.answer1.length === 0 ? '1번 주머니' : '1번 주머니, 바둑돌이 ' + cardData.p01.answer1.length + '개 들어있습니다'}
            disabled={cardData.p01.isSubmitted}
          >
            <Image src='/A03/0002/05/MC31301.png' width='178px' height='151px' />
            <StoneImageBox>
              {cardData.p01.answer1.length > 0
                ? cardData.p01.answer1.map((__, index) => <Image key={index} src='/A03/0002/05/MC31301-1.png' width='36px' height='36px' />)
                : ''}
            </StoneImageBox>
          </PocketButton>
          <PocketButton
            type='button'
            onClick={() => handleClickPocket('answer2')}
            aria-label={cardData.p01.answer2.length === 0 ? '2번 주머니' : '2번 주머니, 바둑돌이 ' + cardData.p01.answer2.length + '개 들어있습니다'}
            disabled={cardData.p01.isSubmitted}
          >
            <Image src='/A03/0002/05/MC31301.png' width='178px' height='151px' />
            <StoneImageBox>
              {cardData.p01.answer2.length > 0
                ? cardData.p01.answer2.map((__, index) => <Image key={index} src='/A03/0002/05/MC31301-1.png' width='36px' height='36px' />)
                : ''}
            </StoneImageBox>
          </PocketButton>
          <PocketButton
            type='button'
            onClick={() => handleClickPocket('answer3')}
            aria-label={cardData.p01.answer3.length === 0 ? '3번 주머니' : '3번 주머니, 바둑돌이 ' + cardData.p01.answer3.length + '개 들어있습니다'}
            disabled={cardData.p01.isSubmitted}
          >
            <Image src='/A03/0002/05/MC31301.png' width='178px' height='151px' />
            <StoneImageBox>
              {cardData.p01.answer3.length > 0
                ? cardData.p01.answer3.map((__, index) => <Image key={index} src='/A03/0002/05/MC31301-1.png' width='36px' height='36px' />)
                : ''}
            </StoneImageBox>
          </PocketButton>
        </Box>

        <Box hAlign='center' marginTop='24px'>
          {Array(12)
            .fill('')
            .map((__, index) => (
              <StoneButton
                type='button'
                aria-label={
                  `${index + 1}번째 바둑돌` +
                  (clickedStoneIndex === index
                    ? ', 선택됨'
                    : cardData.p01.answer2.includes(index) || cardData.p01.answer3.includes(index)
                    ? ', 선택 불가능'
                    : ', 선택 가능')
                }
                title='엔터키를 입력하고 원하는 주머니를 선택해주세요.'
                key={index}
                onClick={() => handelClickStone(index)}
                disabled={
                  cardData.p01.isSubmitted ||
                  cardData.p01.answer1.includes(index) ||
                  cardData.p01.answer2.includes(index) ||
                  cardData.p01.answer3.includes(index)
                }
                state={
                  cardData.p01.answer1.includes(index) || cardData.p01.answer2.includes(index) || cardData.p01.answer3.includes(index)
                    ? 'disabled'
                    : clickedStoneIndex === index
                    ? 'active'
                    : undefined
                }
              />
            ))}
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' marginTop={10} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>

            <Box display='flex' gap='8px' width={300} marginTop={10} title='주머니 1개에 바둑돌이 4개씩 있습니다.'>
              <PocketButton type='button' aria-label='주머니 1, 바둑돌이 4개 들어있습니다'>
                <Image src='/A03/0002/05/MC31301.png' width='178px' height='151px' />
                <StoneImageBox>
                  {Array(4)
                    .fill('')
                    .map((__, index) => (
                      <Image key={index} src='/A03/0002/05/MC31301-1.png' width='36px' height='36px' />
                    ))}
                </StoneImageBox>
              </PocketButton>
              <PocketButton type='button' aria-label='주머니 2, 바둑돌이 4개 들어있습니다'>
                <Image src='/A03/0002/05/MC31301.png' width='178px' height='151px' />
                <StoneImageBox>
                  {Array(4)
                    .fill('')
                    .map((__, index) => (
                      <Image key={index} src='/A03/0002/05/MC31301-1.png' width='36px' height='36px' />
                    ))}
                </StoneImageBox>
              </PocketButton>
              <PocketButton type='button' aria-label='주머니 3, 바둑돌이 4개 들어있습니다'>
                <Image src='/A03/0002/05/MC31301.png' width='178px' height='151px' />
                <StoneImageBox>
                  {Array(4)
                    .fill('')
                    .map((__, index) => (
                      <Image key={index} src='/A03/0002/05/MC31301-1.png' width='36px' height='36px' />
                    ))}
                </StoneImageBox>
              </PocketButton>
            </Box>
          </Box>
          <Box marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop={10}>
              <Typography>주머니 한 개에 바둑돌을 4개씩 그립니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const PocketButton = styled.button<{ isError?: boolean }>`
  position: relative;
  border-radius: 16px;

  width: 178px;
  height: 151px;

  ${({ isError }) =>
    isError &&
    css`
      background-color: #fff4f3;
      border: 2px solid #eb1807;
    `}
`;

const StoneImageBox = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);

  width: 76px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1px;
`;

const PocketStoneButton = styled.button`
  background: url(${BadukStoneIcon}) center center no-repeat;
  background-size: 36px;

  width: 36px;
  height: 36px;
`;

const StoneButton = styled(PocketStoneButton)<{ state?: 'active' | 'disabled' }>`
  width: 60px;
  height: 60px;
  padding: 12px;
  border-radius: 50%;

  ${({ state }) =>
    state === 'active' &&
    `
      border: 2px solid #1e6efa;
      background-color: #f4f8ff;
    `}

  ${({ state }) =>
    state === 'disabled' &&
    `
      opacity : 20%;
    `}
`;

export default P01;
