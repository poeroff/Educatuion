import { Container } from '@maidt-cntn/ui/math';
import { Box, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import usePageData from '@/hooks/usePageData';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='baseline' fontSize={28} fontWeight={'var(--font-weight-medium)'}>
        <Box marginRight={20}>[4~7]</Box>
        글을 읽고 물음에 답하세요.
      </Box>
    ),
  };
  const { saveData } = usePageData();

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <Typography lineHeight='48px'>
        세계 자동차 전시회에서는 하루 입장객 800 명에게 기념품을 줍니다. 어느 날 오전에 389 명이 입장했고 그날 윤서가 받은 오후 입장 순서표에는 399
        라고 쓰여 있습니다. 물음에 답하세요.
      </Typography>
    </Container>
  );
};

export default P05;
