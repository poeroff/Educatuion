import { Container } from '@maidt-cntn/ui/math';
import { Box, EImageType, EStyleFontSizes, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import LessonLogo from '@/assets/icon/unit-number.svg';

export interface IEM00101 {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  title: string;
}

const EM00101 = ({ src, alt = '', width = '1237.12px', height = '772px', title }: IEM00101) => {
  return (
    <Container headerInfo={null} useExtend useScroll={false}>
      <Background>
        <Image src={src} alt={alt} width={width} height={height} />
      </Background>
      <Box position='absolute' display='flex' alignItems='center' top={58} left={32}>
        <SvgIcon src={LessonLogo} size='50px' />
        <Box marginLeft='10px'>
          <Typography color='var(--color-green-900)' weight='800' size={EStyleFontSizes['X-LARGE']} useGap={false}>
            {title}
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

export default EM00101;
