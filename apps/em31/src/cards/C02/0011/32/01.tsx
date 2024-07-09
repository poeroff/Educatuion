import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, IQuestionProps, SvgIcon, Typography, Symbol, BoxWrap, Image, EStyleButtonTypes, BottomSheet, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C02_0011_32 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const shapes = [
  { src: '/C02/0011/32/DEC312M03_03.png', alt: '네 각이 모두 직각인 사각형' },
  { src: '/C02/0011/32/DEC312M03_01.png', alt: '원 모양 종이를 반듯하게 두 번 접은 모양의 도형' },
  { src: '/C02/0011/32/DEC312M03_04.png', alt: '모든 각의 크기가 직각보다 작은 삼각형' },
  { src: '/C02/0011/32/DEC312M03_02.png', alt: '5개의 각 중 세 각의 크기가 직각이고 두 각의 크기가 직각보다 큰 도형' },
];

const solvedShapes = [
  { src: '/C02/0011/32/DEC312M03(sol)_01.png', alt: '네 각에 모두 직각 표시가 있는 사각형' },
  { src: '/C02/0011/32/DEC312M03(sol)_04.png', alt: '한 각에 직각 표시가 있는 원 모양 종이를 반듯하게 두 번 접은 모양의 도형' },
  { src: '/C02/0011/32/DEC312M03(sol)_03.png', alt: '직각 표시가 없는 모든 각의 크기가 직각보다 작은 삼각형' },
  { src: '/C02/0011/32/DEC312M03(sol)_02.png', alt: '5개의 각 중 세 각에 직각 표시가 되어 있는 도형' },
];

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C02_0011_32);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const [radio, setRadio] = useState<number>();
  const pageNumber = 'P01';

  const handleClick = (index: number) => {
    setRadio(index);
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: String(index + 2),
      },
    }));
    changeData(pageNumber, 1, 1, index + 2);
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box vAlign='center'>
          직각이 없는 도형에&nbsp;
          <Symbol type='correct' />
          &nbsp;표 하세요.
        </Box>
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: {
            value: '',
            isCorrect: false,
          },
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: data[0].value.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      const isCorrect = cardData[pageNumber].answer === cardData[pageNumber].solution;
      setCardData(prev => ({
        ...prev,
        [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].answer,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const isBtnDisabled = () => {
    return isNotEmptyString(cardData[pageNumber].answer) || cardData[pageNumber].isSubmitted;
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitDisabled={!isBtnDisabled()}
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      useRound
    >
      <Box display='flex' justifyContent='center'>
        {shapes.map((item, index) => (
          <Box display='flex' flexDirection='column' key={item.src}>
            <BoxWrap flexDirection='column' alignItems='center' marginBottom={10}>
              <Image src={item.src} alt={item.alt} width='150px' height='150px' />
            </BoxWrap>
            <Box vAlign='center'>
              <Typography>(</Typography>
              <CircleCheck type='button' onClick={() => handleClick(index - 1)} disabled={cardData[pageNumber].isSubmitted}>
                {index - 1 === radio && <Symbol type='correct' />}
              </CircleCheck>
              <Typography>)</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <BottomSheet
        bottomSheetTargetId={'targetContainer'}
        height='50%'
        show={isShowBottom}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>
                (&nbsp;&nbsp;&nbsp;)(&nbsp;&nbsp;&nbsp;)(
                <Symbol type='correct' size={25} />
                )(&nbsp;&nbsp;&nbsp;)
              </Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>삼각자의 직각 부분과 일치하는 각을 찾습니다.</Typography>
              <BoxWrap display='flex' alignItems='center' marginBottom={10} marginTop={20}>
                {solvedShapes.map(item => (
                  <Box marginRight={50}>
                    <Image src={item.src} alt={item.alt} width='120px' height='120px' />
                  </Box>
                ))}
              </BoxWrap>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default P01;
