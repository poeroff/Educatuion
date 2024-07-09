import { Container } from '@maidt-cntn/ui/math';
import { Box, EStyleFontSizes, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import LessonLogo from '@/assets/icon/unit-number.svg';

const P01 = () => {
  return (
    <Container headerInfo={null} useExtend useScroll={false}>
      <Background>
        <Image src={'/A05/0001/01/315_도비라_리터치 1.png'} alt='5. 길이와 시간' width='1237.12px' height='772px' />
      </Background>
      <Box position='absolute' display='flex' alignItems='center' top={58} left={32}>
        <Image src={'/A05/0001/01/단원 차시5.png'} size='50px' />
        <Box marginLeft='10px'>
          <Typography color='var(--color-green-900)' weight='800' size={EStyleFontSizes['X-LARGE']} useGap={false}>
            길이와 시간
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
