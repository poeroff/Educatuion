import { useState, useRef } from 'react';
import { Box, TMainHeaderInfoTypes, Typography, Image } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

const P01 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point1',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Box gap={10} tabIndex={101}>
          <Image
            src={'/L02/C08/A02/HE1-L02-C08-A02-P01.jpg'}
            width={'920px'}
            height='71px'
            alt='I was shocked to see how thin Nani Tama was. 빨간 색자 how가 이끄는 절이 뒤의 파란 칸을 수식하는 모습을 나타낸다.'
          />
        </Box>
        <Box marginTop='20px' display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <Box hAlign={'flex-start'} tabIndex={102}>
            <GrammarChecker startRef={startRef1} endRef={endRef1}>
              <StyledTypography>
                The travelers didn’t know{' '}
                <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                  how
                </HighlightedWord>{' '}
                <HighlightedWord color='var(--color-blue-900)' title='파란색 글자'>
                  far
                </HighlightedWord>{' '}
                <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                  the mountain shelter was
                </HighlightedWord>
                , but they kept walking.
              </StyledTypography>
            </GrammarChecker>
          </Box>
        </Box>
        <Box marginTop='20px' display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <Box hAlign={'flex-start'} tabIndex={103}>
            <GrammarChecker startRef={startRef2} endRef={endRef2}>
              <StyledTypography>
                People were amazed at{' '}
                <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                  how
                </HighlightedWord>{' '}
                <HighlightedWord color='var(--color-green-900)' title='초록색 글자'>
                  skillfully
                </HighlightedWord>{' '}
                <HighlightedWord color='var(--color-red-800)' title='빨간색 글자'>
                  the young girl could do
                </HighlightedWord>{' '}
                taekwondo.
              </StyledTypography>
            </GrammarChecker>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;

const StyledTypography = styled(Typography)`
  display: block;
  max-width: 100%;
  color: var(--color-gray-800) !important;
`;

const HighlightedWord = styled.span<{ color: string }>`
  font-weight: var(--font-weight-bold);
  color: ${({ color }) => color};
  display: inline-block;
  position: relative;
`;
