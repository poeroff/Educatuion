import styled from '@emotion/styled';
import { Box, EStyleFontSizes, Image, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const backgroundImg = '/A03/0001/01/수학_도비라_313_단원_리터치.png';
  const chapterImg = '/A03/0001/01/번호_3.png';

  return (
    <Container headerInfo={null} useExtend useScroll={false}>
      <Background>
        <Image src={backgroundImg} />
      </Background>
      <Box position='absolute' display='flex' alignItems='center' top={58} left={32}>
        <Image src={chapterImg} alt='3단원' />
        <Box marginLeft='10px'>
          <Typography color='var(--color-green-900)' fontWeight='var(--font-weight-bold)' size={EStyleFontSizes['X-LARGE']} useGap={false}>
            나눗셈
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

const Background = styled.div`
  position: absolute;
  left: -16px;
  top: -2px;

  overflow: hidden;
  border-radius: 20px;

  width: 1032px;
  height: 524px;
`;

export default P01;
