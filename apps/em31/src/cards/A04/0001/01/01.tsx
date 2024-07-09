import { Container } from '@maidt-cntn/ui/math';
import { Box, EStyleFontSizes, Image, Typography } from '@maidt-cntn/ui';
import styled from '@emotion/styled';

const P01 = () => {
  return (
    <Container headerInfo={null} useExtend useScroll={false}>
      <Background>
        <Image src={'/A04/0001/01/MA314.png'} alt={'4.곱셈'} width={'1237.12px'} height={'772px'} />
      </Background>
      <Box position='absolute' display='flex' alignItems='center' top={58} left={32}>
        <Image src={'/A04/0001/01/번호.png'} size='50px' />
        <Box marginLeft='10px'>
          <Typography color='var(--color-green-900)' weight='800' size={EStyleFontSizes['X-LARGE']} useGap={false}>
            {'곱셈'}
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

  > img {
    position: absolute;
    top: -199px;
    left: -14px;
  }
`;

export default P01;
