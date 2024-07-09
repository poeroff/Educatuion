import styled from '@emotion/styled';
import { useState } from 'react';
import { Box, BoxWrap, EImageType, IQuestionProps, Image, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const data = [
  {
    text: '예각',
    ariaLabel: '예각을 그리는 영역입니다.',
  },
  {
    text: '직각',
    ariaLabel: '직각을 그리는 영역입니다.',
  },
  {
    text: '둔각',
    ariaLabel: '둔각을 그리는 영역입니다.',
  },
];

const EM42101 = () => {
  const [selectedDot, setSelectedDot] = useState<number | null>(null);

  const handleDotClick = (index: number) => {
    setSelectedDot(index === selectedDot ? null : index);
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} />점 4개를 연결하여 예각 1개와 둔각 1개가 있는
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
      <Box vAlign='center'>
        <Label type='paint' value={'ㄷ'} marginRight={8} fontSize={22} color='var(--color-white)' background='#969590' />
        <Typography lineHeight='58px'>점 3개를 연결하여 예각, 직각, 둔각을 각각 그려 보세요.</Typography>
      </Box>
      <BoxWrap useFull position='relative' alignItems='flex-end' marginTop={24} padding='8px 40px 34px' boxGap={0}>
        {data.map((item, index) => (
          <>
            {index === 1 && <Box width={1} height={185} margin='7px 60px' backgroundColor='#70522E' />}
            <Box key={index} ariaLabel={item.ariaLabel} useFull vAlign='center' flexDirection='column'>
              <Label
                value={item.text}
                fontSize={22}
                lineHeight={33}
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                svgWidth={79}
                svgHeight={38}
              />
              <Box useFull vAlign='center' marginTop={10} background='var(--color-white)'>
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
                      return <Dot key={itemIdx} isClick={selectedDot === dotIndex} onClick={() => handleDotClick(dotIndex)} />;
                    })}
                  </Box>
                ))}
              </Box>
            </Box>
            {index === 1 && <Box width={1} height={185} margin='0 60px' backgroundColor='#70522E' />}
          </>
        ))}
        <BackgroundImage>
          <Image type={EImageType.IMG_BG} src={'/example/EM-421-01/background_green.png'} alt='' width='100%' height='290px' />
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
`;

export default EM42101;
