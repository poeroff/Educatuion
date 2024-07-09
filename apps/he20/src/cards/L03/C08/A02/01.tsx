import { Box, TMainHeaderInfoTypes, TextView, Image, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import { useRef } from 'react';
import styled from '@emotion/styled';

const P01 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);


  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };


  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' hAlign='center' gap='20px' useFull>
        <Box>

          <Image
            src={'/L03/C08/A02/HE2-L03-C08-A02-01.jpg'}
            width={'811px'}
            height={'63px'}
            alt='Although he became a free man, he still faced racial discrimination.

              빨간 색자 Although 가 이끄는 절이 하늘색 음영으로 강조되어 있다.
              '
          />
          <Image
            src={'/L03/C08/A02/HE2-L03-C08-A02-02.jpg'}
            width={'811px'}
            height={'63px'}
            alt='Despite challenges in their lives, the artists never gave up on their art.

              파란 색자 Despite 가 이끄는 구가 하늘색 음영으로 강조되어 있다.
             '
          />

        </Box>
        <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <GrammarChecker startRef={startRef1} endRef={endRef1}>
            <span style={{ position: 'relative' }} >
              <Typography color='var(--color-red-800)' title="빨간색글자" useGap={false}>Because
                <UnderSubText>
                  (= <Typography useGap={false} color='var(--color-blue-700)' title='파란색 글자' size={EStyleFontSizes.SMALL}>Because of/Due to</Typography>{' '}the bad weather, ~.)
                </UnderSubText>
              </Typography>
            </span>
            {' '}the weather was bad, they had to call off their family gathering.
            we encounter.
          </GrammarChecker>

          <GrammarChecker startRef={startRef2} endRef={endRef2}>
            <span style={{ position: 'relative' }} >
              <Typography color='var(--color-red-800)' style={{ position: 'relative' }} title='빨간색 글자' useGap={false}>
                While
                <UnderSubText>
                  <Typography size={EStyleFontSizes.SMALL} >
                    (=
                    <Typography color='var(--color-blue-700)' title='파란색 글자' size={EStyleFontSizes.SMALL} useGap={false}>
                      During
                    </Typography> our trip, ~.)
                  </Typography>
                </UnderSubText>
              </Typography>
            </span>{' '}we were on our trip, we visited beautiful palaces and other
            historical attractions.

          </GrammarChecker>


        </Box>
      </Box>
    </Container >
  );
};

export const UnderSubText = styled.span`
  position: absolute;
  top: 60%;
  left: 5%;
  font-size: 22px;
  font-weight: var(--font-weight-medium);
  color: #6a6d73;
  white-space: nowrap;
`


export default P01;
