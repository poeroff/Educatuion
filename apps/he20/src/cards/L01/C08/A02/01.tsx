import { Box, TMainHeaderInfoTypes, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import CustomWrap from './CustomWrap';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' hAlign='center' gap='20px' useFull>
        <Box>
          <Image
            src={'/L01/C08/A02/HE2-L01-C08-A02-P01.jpg'}
            width={'811px'}
            height={'63px'}
            tabIndex={101}
            alt='Molly seems to be adapting well, and I expect her to get better soon. 빨간 색자로 expect가 , 초록색 자로 her, 파란 색자로 to get 이 강조되어 있다.'
          />
        </Box>
        <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <CustomWrap>
            <FontWeight>
              <span>His friends </span>
              <RedText title='빨간색 글자'>encouraged </RedText>
              <GreenText title='초록색 글자'>him </GreenText>
              <BlueText title='파란색 글자'>to attend </BlueText>
              the music festival.
            </FontWeight>
          </CustomWrap>
          <CustomWrap>
            <FontWeight>
              <span>Our teacher </span>
              <RedText title='빨간색 글자'>advised </RedText>
              <GreenText title='초록색 글자'>us </GreenText>
              <BlueText title='파란색 글자'>not to compare </BlueText>
              ourselves with others.
            </FontWeight>
          </CustomWrap>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;

const FontWeight = styled.span`
  weight: var(--font-weight-bold);
  color: var(--color-grey-800);
`;
const RedText = styled.span`
  color: var(--color-red-800);
`;

const BlueText = styled.span`
  color: var(--color-blue-800);
`;

const GreenText = styled.span`
  color: var(--color-green-800);
`;
