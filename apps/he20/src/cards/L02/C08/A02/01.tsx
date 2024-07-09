import { Box, TMainHeaderInfoTypes, Typography, Image } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import { useRef } from 'react';

const P01 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);
  const startRef3 = useRef<HTMLSpanElement>(null);
  const endRef3 = useRef<HTMLSpanElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' hAlign='center' gap='20px' useFull>
        <Box>
          <Image src={'/L02/C08/A02/HE2-L02-C08-A02-P01.jpg'} width={'910px'} alt='If you have, then you may have fallen prey to a dark pattern.' />
        </Box>
        <Box display='flex' flexDirection='column' gap='26px' padding='26px' width='900px' fontSize='28px'>
          <GrammarChecker startRef={startRef1} endRef={endRef1}>
            <span ref={startRef1}></span> I am late again. I{' '}
            <Typography color='var(--color-red-800)' title='빨간색 글자' useGap={false}>
              should have gotten
            </Typography>{' '}
            up early.
          </GrammarChecker>

          <GrammarChecker startRef={startRef2} endRef={endRef2}>
            <span ref={startRef2}></span> The roads are wet. It{' '}
            <Typography color='var(--color-red-800)' title='빨간색 글자' useGap={false}>
              must have rained
            </Typography>{' '}
            earlier today.
          </GrammarChecker>

          <GrammarChecker startRef={startRef3} endRef={endRef3}>
            <span ref={startRef3}></span> Jimmy is in Africa. You{' '}
            <Typography color='var(--color-red-800)' title='빨간색 글자' useGap={false}>
              cannot have seen
            </Typography>{' '}
            him in Korea.
          </GrammarChecker>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
