import styled from '@emotion/styled';
import { Box, EStyleFontSizes, IQuestionProps, Image, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM42103 = () => {
  const [selectedDot, setSelectedDot] = useState<number | null>(null);

  const handleDotClick = (index: number) => {
    setSelectedDot(index === selectedDot ? null : index);
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={2} />점 5개를 연결하여 예각, 직각, 둔각이 모두 있는 나만의
        <br />
        잠금 패턴을 만들어 보세요.
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
      <Box useFull position='relative' boxGap={0}>
        <Box position='absolute' hAlign='center' flexDirection='column' top={0} right={200}>
          <Typography fontSize='26px'>나만의 잠금 패턴</Typography>
          <Box vAlign='center' background='var(--color-white)' width={200} height={200} marginTop={8}>
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
                  const dotIndex = 0 * 9 + sideIdx * 3 + itemIdx;
                  return <Dot type='button' key={itemIdx} isClick={selectedDot === dotIndex} onClick={() => handleDotClick(dotIndex)} />;
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <BackgroundImage>
        <Image src={'/example/EM-421-03/MA41210_3.png'} width='582px' height='374px' />
        <Box type='hidden'>
          핸드폰 위에 보안과 관련된 아이콘들이 떠다니고 잠금 패턴을 입력하는 칸이 보입니다. 정사각형 칸이 있고, 정사각형 안에는 9개의 점이 있습니다.
          4개의 점은 각 정사각형의 변의 가운데, 4개의 점은 각 꼭짓점, 1개는 정사각형의 정 가운데에 있습니다.
        </Box>
      </BackgroundImage>
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
  left: 50%;
  top: 0;
  transform: translateX(-50%);
`;

export default EM42103;
