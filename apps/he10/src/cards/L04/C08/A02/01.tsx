import { useState } from 'react';
import { Box, TMainHeaderInfoTypes, Dialog, Typography, Image } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { useRef } from 'react';

const P01 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point1',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Box gap='10px'>
          <Image
            src={'/L04/C08/A02/HE1-L04-C08-A02-P01.jpg'}
            width={'920px'}
            height='71px'
            alt='The sentiment is shared by many, with coffee shops springing up on every street corner.
'
            tabIndex={101}
          />
        </Box>
        <Box marginTop='20px' display='flex' flexDirection='column'>
          <Box hAlign={'flex-start'} tabIndex={102}>
            <GrammarChecker startRef={startRef1} endRef={endRef1}>
              <StyledTypography>
                On Sports Day, I ran as fast as I could,{' '}
                <HighlightedWord title='빨간색 글자' color='var(--color-red-800)'>
                  with
                </HighlightedWord>{' '}
                all my classmates{' '}
                <HighlightedWord title='파란색 글자' color='var(--color-blue-900)'>
                  encouraging
                </HighlightedWord>{' '}
                me.
              </StyledTypography>
            </GrammarChecker>
          </Box>
          <Box hAlign={'flex-start'} tabIndex={103}>
            <GrammarChecker startRef={startRef2} endRef={endRef2}>
              <StyledTypography>
                Judy walked out of the library{' '}
                <HighlightedWord title='빨간색 글자' color='var(--color-red-800)'>
                  with
                </HighlightedWord>{' '}
                all my classmates{' '}
                <HighlightedWord title='초록색 글자' color='var(--color-green-900)'>
                  filled
                </HighlightedWord>{' '}
                with books.
              </StyledTypography>
            </GrammarChecker>
          </Box>
        </Box>
      </Box>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
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
