import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import styled from '@emotion/styled';

const P03 = () => {
  const contentImage = '/L02/C10/A02/HE2-L02-C10-A02-P03.jpg';

  const imageText = '한 여성의 초상화가 그려져 있는 10달러 캐나다 지폐 ';

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
            <Image src={contentImage} width='180px' height='250px' alt={imageText} />
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <Box useFull background='white' useRound>
            <Scroll height='280px' tabIndex={101}>
              <Box>
                <Typography>
                  <SpanColorWeight>Viola Desmond (on the Canadian 10-dollar bill)</SpanColorWeight> was a successful businesswoman and civil rights
                  activist. Desmond, an African Canadian, challenged racial discrimination. She stood against dividing a theater into sections
                  according to skin color. Her actions inspired people to recognize theimportance of racial equality.
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
  color: var(--color-blue-600);
`;

export default P03;
