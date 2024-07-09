import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const positionInfo = [
  { x: 90, y: 365, rotate: 0 },
  { x: 495, y: 375, rotate: 5 },
];

const EM42102 = () => {
  const [selectedDot, setSelectedDot] = useState<number | null>(null);

  const handleDotClick = (index: number) => {
    setSelectedDot(index === selectedDot ? null : index);
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} />점 4개를 연결하여 예각 1개와 둔각 1개가 있는 잠금
        <br />
        패턴을 만들어 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background='var(--color-white)'
      submitLabel='완료하기'
      onSubmit={() => {}}
      useRound
    >
      <Box vAlign='center'>
        <Label type='paint' value={'ㄹ'} marginRight={8} fontSize={22} color='var(--color-white)' background='#969590' />
        <Typography lineHeight='58px'>점 4개를 연결하여 문제를 해결해 보세요.</Typography>
      </Box>
      <BoxWrap useFull position='relative' alignItems='flex-end' marginTop={24} boxGap={0}>
        {positionInfo.map((item, index) => {
          return (
            <Box
              position='absolute'
              useFull
              useRound
              vAlign='center'
              background='var(--color-white)'
              border='2px solid #D7ECE6'
              marginTop={10}
              width={200}
              height={200}
              top={item.y}
              left={item.x}
              transform={`rotate(${item.rotate}deg)`}
            >
              {[...Array(3)].map((_, sideIdx) => (
                <Box
                  key={sideIdx}
                  useFull
                  hAlign='space-between'
                  alignItems={sideIdx === 0 ? 'flex-start' : sideIdx === 1 ? 'center' : 'flex-end'}
                  flexDirection='column'
                  padding={8}
                >
                  {[...Array(3)].map((_, itemIdx) => {
                    const dotIndex = index * 9 + sideIdx * 3 + itemIdx;
                    return <Dot type='button' key={itemIdx} isClick={selectedDot === dotIndex} onClick={() => handleDotClick(dotIndex)} />;
                  })}
                </Box>
              ))}
            </Box>
          );
        })}
        <BackgroundImage>
          <Image src={'/example/EM-421-02/MA41210_3-1.png'} size='100%' />
          <Box type='hidden'>
            <p>스마트폰 두개가 가로로 있습니다.</p>
            <p>
              첫번째 스마트폰 잠금화면이 있습니다. 잠금화면은 정사각형이며 점이 총 9개가 있습니다. 4개의 점은 각 정사각형의 변의 가운데, 4개의 점은 각
              꼭짓점, 1개는 정사각형의 정 가운데에 있습니다.
            </p>
            <p>
              두번째 스마트폰 잠금화면이 있습니다. 한 학생은 윗변의 가운데, 정사각형의 정 가운데, 왼쪽 아래 꼭짓점, 밑변의 가운데를 순서대로 이어 잠금
              패턴을 만들었습니다.
            </p>
          </Box>
        </BackgroundImage>
      </BoxWrap>
    </Container>
  );
};

const Dot = styled.button<{ isClick?: boolean }>`
  width: 8px;
  height: 8px;

  border-radius: 10px;
  background-color: #70522e;

  ${({ isClick }) =>
    isClick &&
    `
    outline: 2px solid var(--color-blue-200);
    background-color: var(--color-blue-1100);
  `}
`;

const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 682px;
`;

export default EM42102;
