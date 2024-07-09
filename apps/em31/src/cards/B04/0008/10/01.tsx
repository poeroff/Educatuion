import { Box, BoxWrap, Image, SvgIcon, Typography, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import e_fish_icon from '../../../../assets/icon/e_fish_icon.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='start' marginBottom='10px'>
        <Box marginTop='2px'>
          <SvgIcon src={e_fish_icon} width='48px' height='34px' />
        </Box>
        <Typography lineHeight='48px'>
          과학관에서 비행을 하며 다양한 모양을 만드는 드론, 설계도와 똑같이 모형을 만드는 입체 프린터, 인공지능 로봇 등을 보았습니다. 문제를 읽고
          물음에 답하세요.
        </Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <BoxWrap flexDirection='column' alignItems='center' boxGap={0} marginBottom={10}>
        <Box>
          <Image src={'/B04/0008/10/MA31407.png'} width={'650px'} height='340px' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
