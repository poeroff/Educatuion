import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import styled from '@emotion/styled';

const P01 = () => {
  const contentImage = '/L02/C10/A02/HE2-L02-C10-A02-P01.jpg';

  const imageText = '멕시코 여성의 초상화가 그려져 있는 500페소 멕시코 화폐 ';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Stories of the People on Our Money',
  };

  const questionInfo = {
    text: 'Learn about the people on bills from around the world.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='340px' height='180px' alt={imageText} />
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <Box useFull background='white' useRound>
            <Scroll height='280px' tabIndex={101}>
              <Box>
                <Typography>
                  <SpanColorWeight>Frida Kahlo (on the Mexican old 500-peso bill)</SpanColorWeight> was a famous artist who depicted her Mexican
                  heritage and identity. In her paintings, she often portrayed herself in traditional Mexican clothing. She also used the vivid colors
                  of the Mexican flag: red, white, and green.
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const SpanColorWeight = styled.span`
  font-weight: var(--font-weight-bold);
  color: var(--color-pink-600);
`;

export default P01;
