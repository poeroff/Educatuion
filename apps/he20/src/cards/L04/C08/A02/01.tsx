import { Box, TMainHeaderInfoTypes, Image, Typography } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import { useRef } from 'react';

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
              src={'/L04/C08/A02/HE2-L04-C08-A02-P01.jpg'}
              width={'811px'}
              height={'63px'}
              alt='Advances in neural
                    implants will make it
                    possible to install software
                    in our brains.'
            />
        </Box>

        <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <GrammarChecker startRef={startRef1} endRef={endRef1}>
            Our team members{' '}
            <Typography  color='var(--color-blue-800)' title='파란색 글자' useGap={false}>consider</Typography>{' '}
            <Typography  color='var(--color-red-800)' title='빨간색 글자' useGap={false}>it</Typography>{' '}
            important{' '}
            <Typography  color='var(--color-red-800)' title='빨간색 글자' useGap={false}>to arrive</Typography>{' '}
            on time for meetings.
          </GrammarChecker>

          <GrammarChecker startRef={startRef2} endRef={endRef2}>
            When I have to give presentations, I{' '}
            <Typography  color='var(--color-blue-800)' title='파란색 글자' useGap={false}>find</Typography>{' '}
            <Typography  color='var(--color-red-800)' title='빨간색 글자' useGap={false}>it</Typography>{' '}
            difficult{' '} 
            <Typography  color='var(--color-red-800)' title='빨간색 글자'useGap={false}>to manage</Typography>{' '}
            public speaking anxiety.
          </GrammarChecker>
        </Box>
      </Box>

      </Container>
  );
};

export default P01;